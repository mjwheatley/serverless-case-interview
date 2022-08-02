/* eslint-disable @typescript-eslint/naming-convention */
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { SessionService } from './services';
import { Subscription } from 'rxjs';
import { AppComponentUtils, Constants } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public formFields = {
    signIn: {
      username: {
        labelHidden: false,
        placeholder: 'Enter your email address',
        isRequired: true,
        label: 'Email'
      },
      password: {
        labelHidden: false,
        placeholder: 'Enter your password',
        isRequired: true,
        label: 'Password'
      }
    },
    signUp: {
      email: {
        order: 1,
        labelHidden: false,
        placeholder: 'Enter your email address',
        isRequired: true,
        label: 'Email'
      },
      given_name: {
        order: 2,
        labelHidden: false,
        placeholder: 'Enter your given name',
        isRequired: true,
        label: 'First Name'
      },
      family_name: {
        order: 3,
        labelHidden: false,
        placeholder: 'Enter your family name',
        isRequired: true,
        label: 'Last Name'
      },
      password: {
        order: 5,
        labelHidden: false,
        placeholder: 'Create your password',
        isRequired: true,
        label: 'Password'
      },
      confirm_password: {
        order: 6,
        labelHidden: false,
        placeholder: 'Confirm your password',
        isRequired: true,
        label: 'Confirm Password'
      }
    }
  };

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Warehouses', url: '/warehouses', icon: 'business' },
    { title: 'Products', url: '/products', icon: 'shapes' },
    { title: 'Inventory', url: '/inventory', icon: 'podium' }
  ];
  public user: any = {};
  public isDarkMode: boolean;
  private userSub: Subscription;
  private darkModeSessionSub: Subscription | undefined;

  constructor(
    private session: SessionService,
    private zone: NgZone
  ) {
    Hub.listen('auth', async (data) => {
      console.log(`Amplify Auth Hub event`, data.payload.event);
      switch (data.payload.event) {
        case 'signIn':
          console.log('user signed in');
          this.user = data.payload.data.attributes;
          await this.session.updateUser(this.user);
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          console.log('user signed out');
          this.user = {};
          await this.session.updateUser(this.user);
          break;
        case 'signIn_failure':
          console.log('user sign in failed');
          break;
        case 'configured':
          console.log('the Auth module is configured');
      }
    });
  }

  async ngOnInit() {
    await this.subscribeToUser();
    const darkModePref = AppComponentUtils.listenForDarkModePref();
    this.subscribeToDarkModeSession(darkModePref);
    this.subscribeToDarkModeSession(true);
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.darkModeSessionSub) {
      this.darkModeSessionSub.unsubscribe();
    }
  }

  async signOut() {
    await Auth.signOut();
  }

  public async onChangeDarkMode() {
    await AppComponentUtils.toggleDarkTheme({
      isDarkMode: this.isDarkMode
    });
    await this.session.setPersistent(Constants.SESSION.IS_DARK_MODE, this.isDarkMode);
  }

  private async subscribeToUser() {
    this.user = this.session.getUser();
    if (this.user.sub) {

    }
    this.userSub = this.session.getUserAsObservable().subscribe(async (user: any) => {
      await this.zone.run(async () => {
        this.user = user;
        console.log(`HomePage.subscribeToUser() user`, this.user);
      });
    });
  }

  private subscribeToDarkModeSession(darkModePref?: boolean) {
    this.isDarkMode = this.session.get(Constants.SESSION.IS_DARK_MODE);
    this.darkModeSessionSub = this.session.getSessionAsObservable().subscribe(async (session) => {
      await this.zone.run(async () => {
        this.isDarkMode = session[Constants.SESSION.IS_DARK_MODE];
        if (this.isDarkMode === undefined) {
          this.isDarkMode = darkModePref;
          await this.session.setPersistent(Constants.SESSION.IS_DARK_MODE, this.isDarkMode);
        }
        AppComponentUtils.toggleDarkTheme({
          isDarkMode: this.isDarkMode
        });
      });
    });
  }
}
