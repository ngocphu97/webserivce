import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Book } from '../../models';

@Component({
  selector: 'app-import-proposal-form',
  templateUrl: './import-proposal-form.component.html',
  styleUrls: ['./import-proposal-form.component.css']
})
export class ImportProposalFormComponent implements OnInit {

  @Input() books: Array<Book>;
  
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      name: 'Yêu cầu nhập sách - ' + new Date().toDateString(),
      code: 'Code - ' + new Date().getTime(),
      bookId: null,
      amount: 1,
      status: false,
      date: new Date()
    });

    this.form.valueChanges.subscribe(value => console.log(value));
  }

  ngOnInit() {
  }

  onSubmit() {
    const proposalImport = this.form.value;
    alert('Thêm yêu cầu ' + proposalImport.name + ' với số lượng: ' + proposalImport.amount);
  }
}
