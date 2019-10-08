import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CONTAINER_COMPONENTS } from './containers';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    CONTAINER_COMPONENTS
  ]
})
export class DashboardModule {
  constructor() {
  }
}
