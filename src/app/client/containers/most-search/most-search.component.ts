import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-most-search',
  templateUrl: './most-search.component.html',
  styleUrls: ['./most-search.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class MostSearchComponent implements OnInit {

  @Input() book: any;

  constructor() {
  }

  ngOnInit() {
  }

}
