import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent]
    })
      .compileComponents();
  }));

  function setup() {
    const fixture: ComponentFixture<LoginPageComponent> = TestBed.createComponent(LoginPageComponent);
    const component: LoginPageComponent = fixture.componentInstance;
    fixture.detectChanges();

    return { fixture, component };
  }

  it('should create the login page component', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

});
