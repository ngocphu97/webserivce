import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProposalFormComponent } from './import-proposal-form.component';

describe('ImportProposalFormComponent', () => {
  let component: ImportProposalFormComponent;
  let fixture: ComponentFixture<ImportProposalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportProposalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProposalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
