import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Book } from '../../models';
import { Proposal } from '../../models/proposal.model';

@Component({
  selector: 'app-import-proposal-form',
  templateUrl: './import-proposal-form.component.html',
  styleUrls: ['./import-proposal-form.component.css']
})
export class ImportProposalFormComponent implements OnInit {

  @Input() books: Array<Book>;
  @Output() proposal = new EventEmitter <Proposal>();
  
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      bookId: null,
      amount: 1,
      status: false,
      date: new Date().toDateString()
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    this.proposal.emit(this.form.value);
  }
}
