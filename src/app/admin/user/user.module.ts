import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CONTAINER_COMPONENTS } from './containers';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    CONTAINER_COMPONENTS
  ],
})
export class UserModule {
}
