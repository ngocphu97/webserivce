import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CONTAINER_COMPONENTS } from './containers';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    CONTAINER_COMPONENTS
  ]
})
export class DashboardModule {
  constructor() {
  }
}
