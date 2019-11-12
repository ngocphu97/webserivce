import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatOption } from '@angular/material';
import { Book } from 'src/app/admin/product/models';

export interface StateGroup {
  letter: string;
  books: string[];
}

export const _filter = (opt: any, value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnChanges {

  @Input() books: Array<Book> = [];

  stateForm: FormGroup = this.formBuilder.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [];

  stateGroupOptions: Observable<StateGroup[]>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.books) {
      const booksFilter = this.books.map((book: any) => {
        return {
          sku: book.sku,
          name: book.name,
          category_id: book.category_id,
          firtChar: book.name.charAt(0)
        }
      })

      const groupBy = keys => array => array.reduce((objectsByKeyValue, obj) => {
        const value = keys.map(key => obj[key]).join('-');
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});

      const groupByFirstChar = groupBy(['firtChar']);

      this.stateGroups = Object.keys(groupByFirstChar(booksFilter)).map(i => {
        return {
          letter: i,
          books: groupByFirstChar(booksFilter)[i]
        }
      });

      this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterGroup(value))
        );
    }
  }

  groupBy() {
    key => array => array.reduce((objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }), {});
  }

  onSelectBook(event) {
    if (event.key === 'Enter') {
      const keyword = event.target.value;
      this.router.navigate(
        ['/client/books/search'],
        { queryParams: { key: keyword } }
      );
    } else if (event.option && (event.option as MatOption).value) {
      const sku = (event.option as MatOption).value;
      this.router.navigate([`/client/books/detail/${sku}`]);
    }
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({
          letter: group.letter,
          books: _filter(group.books, value)
        }))
        .filter(group => group.books.length > 0);
    }

    return this.stateGroups;
  }

}
