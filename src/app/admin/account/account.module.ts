import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule {
  constructor() {

  }
}
