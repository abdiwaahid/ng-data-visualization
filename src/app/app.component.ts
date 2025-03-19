import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StaticDataService } from './services/static-data.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataFrame } from 'danfojs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'app';
  data!: DataFrame;
  constructor(private staticService: StaticDataService) {

  }

  ngOnInit() {
    // this.staticService.getData('afghanistan').then((data) => {
    //   this.getChartConfig(data, "Province", "Strike ID");
    // });
  }

  getChartConfig(df: DataFrame, xAxis: string, yAxis: string) {
    const new_df = df.groupby([xAxis]).col([yAxis]).count();
    new_df.plot("plot_div").bar({
      config: {
        x: xAxis,
        y: yAxis + "_count"
      }
    });
  }

}
