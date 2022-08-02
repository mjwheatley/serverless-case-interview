/* eslint-disable @typescript-eslint/naming-convention */
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { SessionService } from './services';
import { Subscription } from 'rxjs';

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
    { title: 'Home', url: '/home', icon: 'home' }
  ];
  public user: any = {};
  private userSub: Subscription;

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
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  async signOut() {
    await Auth.signOut();
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
}
