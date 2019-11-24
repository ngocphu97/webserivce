import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core';
import { AuthModule, AuthConfiguration } from './auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const authConfig: AuthConfiguration = {
  loginURL: 'login',
  loginApiURL: 'http://localhost:3000/users/login',
  headerName: 'Authorization',
  skipWhenExpired: true,
  whitelistedDomains: [],
  blacklistedRoutes: []
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    CoreModule,
    AuthModule.forRoot(authConfig),
    
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
