import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Output() keyword = new EventEmitter<string>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      keyword: [undefined]
    })
  }

  onSubmit() {
    this.keyword.emit(this.form.controls['keyword'].value);
  }

}
