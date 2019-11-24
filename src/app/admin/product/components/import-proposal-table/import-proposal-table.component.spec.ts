import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProposalTableComponent } from './import-proposal-table.component';

describe('ImportProposalTableComponent', () => {
  let component: ImportProposalTableComponent;
  let fixture: ComponentFixture<ImportProposalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportProposalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportProposalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
