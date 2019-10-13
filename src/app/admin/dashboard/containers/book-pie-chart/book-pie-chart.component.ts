import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-book-pie-chart',
  templateUrl: './book-pie-chart.component.html',
  styleUrls: ['./book-pie-chart.component.css']
})
export class BookPieChartComponent implements OnInit, OnDestroy {

  chart: am4charts.PieChart;

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.chart = this.buildChart('piechart');
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  buildChart(containerId: string) {
    let chart = am4core.create(containerId, am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0;

    chart.paddingRight = 20;
    chart.data = [
      {
        "bookName": "Lithuania",
        "searchTime": 1000
      },
      {
        "bookName": "Lithuania",
        "searchTime": 1000
      },
      {
        "bookName": "Lithuania",
        "searchTime": 1000
      },
      {
        "bookName": "Lithuania",
        "searchTime": 1000
      },
      {
        "bookName": "Lithuania",
        "searchTime": 1000
      }
    ];

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "searchTime";
    pieSeries.dataFields.category = "bookName";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    return chart;
  }
}
