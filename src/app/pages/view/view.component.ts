import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataFrame } from 'danfojs';
import { Observable } from 'rxjs';
import { StaticDataService } from 'src/app/services/static-data.service';

@Component({
  selector: 'app-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  info$!: Observable<any>
  summary!: Promise<any>
  visuals$!: Observable<any>

  charts: {
    [key: string]: {
      id: string,
      type: string,
      title: string,
      xLabel: string,
      yLabel?: string,
      xaxis: string,
      yaxis: string,
      action: string
    }[]
  } = {
      afghanistan: [
        {
          id: "chart1",
          type: "bar",
          title: "Strikes Per Province",
          xLabel: "Province",
          yLabel: "Number ofStrikes",
          xaxis: "Province",
          yaxis: "Strike ID",
          action: 'count'
        },
        {
          id: "chart2",
          type: "bar",
          title: "Strikes Per District",
          xLabel: "District",
          yLabel: "Number ofStrikes",
          xaxis: "District",
          yaxis: "Strike ID",
          action: 'count'
        },
        {
          id: "chart3",
          type: "pie",
          title: "Type of attack",
          xLabel: "Type of attack",
          yLabel: "Number ofStrikes",
          xaxis: "Type of attack",
          yaxis: "Strike ID",
          action: 'count'
        },
        {
          id: "chart4",
          type: "pie",
          title: "Time of attack",
          xLabel: "Time of attack",
          yLabel: "Number of Strikes",
          xaxis: "Time",
          yaxis: "Strike ID",
          action: 'count'
        },
        {
          id: "chart5",
          type: "hist",
          title: "Maximum Strikes",
          xLabel: "Maximum strikes",
          yLabel: "Maximum strikes",
          xaxis: "Maximum strikes",
          yaxis: "Maximum strikes",
          action: 'count'
        },
        {
          id: "chart6",
          type: "hist",
          title: "Maximum total people killed",
          xLabel: "Maximum total people killed",
          yLabel: "Maximum total people killed",
          xaxis: "Maximum total people killed",
          yaxis: "Maximum total people killed",
          action: 'count'
        },
        {
          id: "chart7",
          type: "hist",
          title: "Maximum civilians reported killed",
          xLabel: "Maximum civilians reported killed",
          yLabel: "Maximum civilians reported killed",
          xaxis: "Maximum civilians reported killed",
          yaxis: "Maximum civilians reported killed",
          action: 'count'
        },
        {
          id: "chart8",
          type: "hist",
          title: "Maximum children reported killed",
          xLabel: "Maximum children reported killed",
          yLabel: "Maximum children reported killed",
          xaxis: "Maximum children reported killed",
          yaxis: "Maximum children reported killed",
          action: 'count'
        },
      ],
      pakistan: [
        {
          id: "chart1",
          type: "bar",
          title: "Strikes Per Area",
          xLabel: "Area",
          yLabel: "Number of Strikes",
          xaxis: "Area",
          yaxis: "Strike ID",
          action: 'count'
        },
        {
          id: "chart2",
          type: "bar",
          title: "Strikes Per Location",
          xLabel: "Location",
          yLabel: "Number of Strikes",
          xaxis: "Location",
          yaxis: "Strike ID",
          action: 'count'
        },
        {
          id: "chart5",
          type: "hist",
          title: "Maximum total people killed",
          xLabel: "Maximum total people killed",
          yLabel: "Maximum total people killed",
          xaxis: "Maximum total people killed",
          yaxis: "Maximum total people killed",
          action: 'count'
        },
        {
          id: "chart6",
          type: "hist",
          title: "Maximum civilians reported killed",
          xLabel: "Maximum civilians reported killed",
          yLabel: "Maximum civilians reported killed",
          xaxis: "Maximum civilians reported killed",
          yaxis: "Maximum civilians reported killed",
          action: 'count'
        },
        {
          id: "chart8",
          type: "hist",
          title: "Maximum children reported killed",
          xLabel: "Maximum children reported killed",
          yLabel: "Maximum children reported killed",
          xaxis: "Maximum children reported killed",
          yaxis: "Maximum children reported killed",
          action: 'count'
        },
      ],
      yemen: [
        {
          id: "chart1",
          type: "bar",
          title: "Strikes Per Province",
          xLabel: "Province",
          yLabel: "Number ofStrikes",
          xaxis: "Province",
          yaxis: "Strike ID",
          action: 'count'
        },
        {
          id: "chart2",
          type: "pie",
          title: "Type of attack",
          xLabel: "Type of attack",
          yLabel: "Number ofStrikes",
          xaxis: "Type of attack",
          yaxis: "Strike ID",
          action: 'count'
        },
        {
          id: "chart4",
          type: "hist",
          title: "Maximum number of strikes",
          xLabel: "Maximum number of strikes",
          yLabel: "Maximum number of strikes",
          xaxis: "Maximum number of strikes",
          yaxis: "Maximum number of strikes",
          action: 'count'
        },
        {
          id: "chart3",
          type: "pie",
          title: "Confirmed/possible US attack?",
          xLabel: "",
          yLabel: "",
          xaxis: "Confirmed/possible US attack?",
          yaxis: "Strike ID",
          action: 'count'
        },
        {
          id: "chart5",
          type: "hist",
          title: "Maximum people killed",
          xLabel: "Maximum people killed",
          yLabel: "Maximum people killed",
          xaxis: "Maximum people killed",
          yaxis: "Maximum people killed",
          action: 'count'
        },
        {
          id: "chart6",
          type: "hist",
          title: "Maximum civilians reported killed",
          xLabel: "Maximum civilians reported killed",
          yLabel: "Maximum civilians reported killed",
          xaxis: "Maximum civilians reported killed",
          yaxis: "Maximum civilians reported killed",
          action: 'count'
        },
        {
          id: "chart7",
          type: "hist",
          title: "Maximum children reported killed",
          xLabel: "Maximum children reported killed",
          yLabel: "Maximum children reported killed",
          xaxis: "Maximum children reported killed",
          yaxis: "Maximum children reported killed",
          action: 'count'
        },
      ],
    }
  slug: any;

  constructor(private route: ActivatedRoute, private staticService: StaticDataService) {
    this.slug = this.route.snapshot.params['slug'];

    this.info$ = this.staticService.getInfo(this.route.snapshot.params['slug']);
    this.summary = this.getSummary();
    // this.visuals$ = this.staticService.getVisuals(this.route.snapshot.params['slug']);
    this.staticService.getData(this.route.snapshot.params['slug']).then((df) => this.visuals(df));
  }

  async getSummary() {
    let data = await this.staticService.getData(this.route.snapshot.params['slug']);
    const columns = data.columns    
    let summary = [];
    for (let i = 0; i < columns.length; i++) {
      let column = columns[i];
      if (data.column(column).dtype.includes('int')) {
        summary.push({
          title: columns[i],
          sum: data.column(column).sum()
        })
      }
    }
    return summary
  }

  visuals(df: DataFrame) {
    this.charts[this.route.snapshot.params['slug']].forEach((chart) => {
      const new_df = df.groupby([chart.xaxis]).col([chart.yaxis]).count();
      console.log(new_df.columns);
      
      const options = {
        layout: {
          title: chart.title,
          height: 500,
          width:"100%",
          xaxis: {
            title: chart.xLabel
          },
          yaxis: {
            title: chart.yLabel
          }
        },
        config: {
          x: chart.xaxis,
          y: chart.yaxis + "_count"
        }
      }
      switch (chart.type) {
        case "bar":
          new_df.plot(chart.id).bar(options);
          break;
        case "line":
          new_df.plot(chart.id).line(options);
          break;
        case "pie":
          new_df.plot(chart.id).pie({
            layout:options.layout,
            config: {
              labels: chart.xaxis,
              values: chart.yaxis + "_count",
              columns: [chart.xaxis, chart.yaxis + "_count"]

            }
          });
          break
        case "hist":
          new_df.plot(chart.id).hist(options);
          break
        default:
          new_df.plot(chart.id).bar(options);
          break;
      }

    })
  }

}
