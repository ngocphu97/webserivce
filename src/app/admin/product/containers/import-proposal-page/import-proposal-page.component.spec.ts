import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProposalPageComponent } from './import-proposal-page.component';

describe('ImportProposalPageComponent', () => {
  let component: ImportProposalPageComponent;
  let fixture: ComponentFixture<ImportProposalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportProposalPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProposalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
