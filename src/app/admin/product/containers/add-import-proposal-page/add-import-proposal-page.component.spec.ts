import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImportProposalPageComponent } from './add-import-proposal-page.component';

describe('AddImportProposalPageComponent', () => {
  let component: AddImportProposalPageComponent;
  let fixture: ComponentFixture<AddImportProposalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImportProposalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImportProposalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
