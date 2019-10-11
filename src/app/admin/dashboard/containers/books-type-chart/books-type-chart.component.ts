import { Component, OnInit, NgZone, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import { selectCategoriesList } from '../../store/categories.selector';
import { getCategoriesList } from '../../store/categories.actions';
import { Categories } from '../../models/categories.model';
import { getBookByCategoryId, getBookList } from '../../../product/store/actions';
import { selectBookList } from '../../../product/store/selector/book.selector';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-books-type-chart',
  templateUrl: './books-type-chart.component.html',
  styleUrls: ['./books-type-chart.component.scss']
})
export class BooksTypeChartComponent implements OnInit, OnDestroy {

  categories$: Observable<Array<Categories>>;

  chart: am4charts.XYChart;
  series: am4charts.ColumnSeries;
  selected: boolean;
  chossingCategory: string;
  choogingValue: number;
  selectedColor: string;

  dataSource = [
    { inventory: 100, name: 'Hydrogen', amounts: 10079, cost: 9000 },
    { inventory: 222, name: 'Helium', amounts: 40026, cost: 9000 },
    { inventory: 30, name: 'Lithium', amounts: 6941, cost: 9000 },
    { inventory: 40, name: 'Beryllium', amounts: 90122, cost: 9000 },
    { inventory: 59, name: 'Boron', amounts: 10811, cost: 9000 },
    { inventory: 61, name: 'Carbon', amounts: 120107, cost: 9000 },
    { inventory: 78, name: 'Nitrogen', amounts: 140067, cost: 9000 },
    { inventory: 89, name: 'Oxygen', amounts: 159994, cost: 9000 },
    { inventory: 19, name: 'Fluorine', amounts: 189984, cost: 9000 },
    { inventory: 10, name: 'Neon', amounts: 201797, cost: 9000 },
  ];

  displayedColumns = ['name', 'inventory', 'amounts', 'cost', 'star'];

  constructor(
    private zone: NgZone,
    private cdRef: ChangeDetectorRef,
    private store: Store<any>
  ) {
    this.store.dispatch(getCategoriesList());
    this.categories$ = this.store.pipe(select(selectCategoriesList));

    this.store.dispatch(getBookList());
    this.store.pipe(select(selectBookList)).pipe().subscribe(x => console.log(x));
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.hiddenState.properties.opacity = 0;

      chart.paddingRight = 20;
      this.initChartData().subscribe((data: any) => {
        if (data && data.length > 0) {
          chart.data = data;
        }
      });

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = "type";
      categoryAxis.renderer.minGridDistance = 40;
      categoryAxis.fontSize = 11;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.max = 24000;
      valueAxis.strictMinMax = true;
      valueAxis.renderer.minGridDistance = 30;
      // axis break
      let axisBreak = valueAxis.axisBreaks.create();
      axisBreak.startValue = 2100;
      axisBreak.endValue = 22900;
      axisBreak.breakSize = 0.005;

      // make break expand on hover
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
    const categoryId = targetData.id;

    this.store.dispatch(getBookByCategoryId({ categoryId: categoryId }));

    this.cdRef.detectChanges();
  }

  close() {
    this.selected = false;
  }

}
