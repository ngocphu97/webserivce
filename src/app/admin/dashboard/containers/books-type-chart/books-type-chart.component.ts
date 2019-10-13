import { Component, NgZone, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { selectCategoriesList } from '../../store/categories.selector';
import { getCategoriesList } from '../../store/categories.actions';
import { Categories } from '../../models/categories.model';
import { getBookList } from '../../../product/store/actions';
import { selectBookList } from '../../../product/store/selector/book.selector';
import { Book } from 'src/app/admin/product/models';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-books-type-chart',
  templateUrl: './books-type-chart.component.html',
  styleUrls: ['./books-type-chart.component.scss']
})
export class BooksTypeChartComponent implements OnDestroy {

  categories$: Observable<Array<Categories>>;
  books$: Observable<Array<Book>>;
  books: any;

  chart: am4charts.XYChart;
  series: am4charts.ColumnSeries;
  selected: boolean;
  chossingCategory: string;
  choogingValue: number;
  selectedColor: string;

  dataSource = [];
  displayedColumns = ['name', 'inventory', 'amounts', 'cost', 'star'];

  constructor(
    private zone: NgZone,
    private cdRef: ChangeDetectorRef,
    private store: Store<any>
  ) {
    this.store.dispatch(getCategoriesList());
    this.categories$ = this.store.pipe(select(selectCategoriesList));

    this.store.dispatch(getBookList());
    this.books$ = this.store.pipe(select(selectBookList));
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      let chart = am4core.create('chartdiv', am4charts.XYChart);
      let bookData = [];

      chart.hiddenState.properties.opacity = 0;
      chart.paddingRight = 20;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.strictMinMax = true;
      valueAxis.renderer.minGridDistance = 30;

      this.books$.pipe().subscribe((books: any) => {
        bookData = books.map((book: any) => {
          return {
            category_id: book.category_id,
            amount: book.amount
          }
        })
      });

      this.initChartData().subscribe((categories: any) => {
        if (categories && categories.length > 0) {
          chart.data = categories.map((cat: any) => {
            let sum = 0;
            bookData
              .filter(book => book.category_id === cat.id)
              .forEach(book => {
                sum = sum + book.amount
              });

            return {
              ...cat,
              amounts: sum
            }
          });

          valueAxis.max = Math.max(...chart.data.map(x => x.amounts)) + 50;
        }
      });

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = "type";
      categoryAxis.renderer.minGridDistance = 40;
      categoryAxis.fontSize = 13;

      let axisBreak = valueAxis.axisBreaks.create();
      axisBreak.startValue = 2100;
      axisBreak.endValue = 22900;
      axisBreak.breakSize = 0.005;

      let hoverState = axisBreak.states.create("hover");
      hoverState.properties.breakSize = 1;
      hoverState.properties.opacity = 0.1;
      hoverState.transitionDuration = 1500;

      axisBreak.defaultState.transitionDuration = 1000;

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryX = "type";
      series.dataFields.valueY = "amounts";
      series.columns.template.tooltipText = "{valueY.value}";
      series.columns.template.tooltipY = 0;
      series.columns.template.strokeOpacity = 0;

      series.columns.template.events.on('hit', this.onChartSelect, this);

      series.columns.template.adapter.add("fill", (fill, target) => {
        return chart.colors.getIndex(target.dataItem.index);
      });

      this.chart = chart;
      this.series = series;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  initChartData(): Observable<any> {
    return new Observable((observer) => {
      this.categories$.pipe().subscribe((categories: any) => {
        categories = categories.map(category => {
          return {
            type: category.name,
            amounts: category.id,
            id: category.id
          }
        })
        observer.next(categories);
      });
    })
  }

  onChartSelect(ev) {
    const targetData = ev.target.dataItem.dataContext;
    this.selected = true;
    this.selectedColor = ev.target.realFill.rgba;
    this.chossingCategory = targetData.type;
    this.choogingValue = targetData.amounts;
    this.getBookByCategoryId(targetData.id);
    this.cdRef.detectChanges();
  }

  getBookByCategoryId(id) {
    this.books$.pipe().subscribe((books: any) => {
      if (books) {
        this.dataSource = books
          .filter(book => book.category_id === id)
          .map(book => {
            return {
              inventory: book.inventory,
              name: book.name,
              amounts: book.amount,
              cost: book.cost
            }
          });
      }
    })
  }

  close() {
    this.selected = false;
  }
}
