import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AUTH_CONFIGURATION, AuthConfiguration, authFeatureKey } from './auth.config';
import { AuthGuard, IsApproveGuard } from './guards';
import { AuthService } from './services';
import { AuthInterceptor } from './interceptors';
import { authReducer } from './reducers';
import { AuthEffects } from './effects';

import { AuthRoutingModule } from './auth-routing.module';
import { COMPONENTS, ENTRY_COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    FlexLayoutModule,

    AuthRoutingModule
  ],
  declarations: [
    CONTAINERS,
    COMPONENTS
  ],
  entryComponents: [
    ENTRY_COMPONENTS
  ]
})
export class AuthModule {
  static forRoot(config?: AuthConfiguration): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AUTH_CONFIGURATION,
          useValue: config
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        AuthService,
        AuthGuard,
        IsApproveGuard
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import only in AppModule!');
    }
  }

}
