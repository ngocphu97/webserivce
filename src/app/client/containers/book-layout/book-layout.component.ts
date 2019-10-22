import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBookList } from 'src/app/admin/product/store/actions';
import { getCategoriesList } from 'src/app/admin/dashboard/store/category/category.actions';

@Component({
  selector: 'app-book-layout',
  templateUrl: './book-layout.component.html',
  styleUrls: ['./book-layout.component.scss']
})
export class BookLayoutComponent implements OnInit {

  constructor(private store: Store<any>) {
    this.store.dispatch(getBookList());
    this.store.dispatch(getCategoriesList());
  }

  ngOnInit() {
  }

}
