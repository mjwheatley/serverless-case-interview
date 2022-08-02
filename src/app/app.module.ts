import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Storage } from '@ionic/storage';
import { SessionService } from './services';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AmplifyAuthenticatorModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    Storage,
    SessionService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
