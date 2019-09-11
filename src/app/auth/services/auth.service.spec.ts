import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpMethod } from '@app/core/http';
import { AuthService } from './auth.service';
import { AUTH_CONFIGURATION, AuthConfiguration } from '../auth.config';

describe('AuthService', () => {

  beforeEach(() => {
    const authConfiguration: AuthConfiguration = {
      loginURL: 'login',
      loginApiURL: 'api/auth/login'
    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        { provide: AUTH_CONFIGURATION, useValue: authConfiguration }
      ]
    });
  });

  function setup() {
    const service: AuthService = TestBed.get(AuthService);
    const backend: HttpTestingController = TestBed.get(HttpTestingController);

    return { service, backend };
  }

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it('should be able login with credential', () => {
    const { service, backend } = setup();
    const credential = { username: 'username', password: 'password' };

    service.login(credential).subscribe();

    const call = backend.expectOne(`api/auth/login`);
    expect(call.request.method).toEqual(HttpMethod.Post);
    call.flush({});
    backend.verify();
  });

});
