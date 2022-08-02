import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  public idToken: string;
  public accessToken: string;
  public user: any = {};
  private userSub: Subscription;

  constructor(
    private zone: NgZone,
    private session: SessionService
  ) {
  }

  async ngOnInit() {
    await this.subscribeToUser();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
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
