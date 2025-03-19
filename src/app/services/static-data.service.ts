import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API } from '../utils/constants';
import { readCSV, DataFrame } from "danfojs"

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  info:any = {
    afghanistan: {
      title: "US Airstrikes in Afghanistan",
      description: `The dataset on US airstrikes in Afghanistan, sourced from Kaggle, provides a detailed record of individual strike events. Each entry represents a single strike and includes information such as the strike ID, date, location (village, district, province), type of attack, reported target, and casualty figures. This dataset is static because it represents a historical record of events that have already occurred and will not change. While the data was collected over a period of time, the final dataset represents a fixed collection of events.`
    },
    pakistan: {
      title: "US Airstrikes in Pakistan",
      description: `Similar to the Afghanistan dataset, the US airstrikes in Pakistan dataset contains information on individual strike events. It includes details such as the date, location, type of attack, reported target, and casualty figures. This dataset is also static because it represents a completed historical record of strikes conducted in Pakistan. The data is a snapshot of events that have already happened, and the information is not subject to change.`
    },
    yemen: {
      title: "US Airstrikes in Yemen",
      description: `The US airstrikes in Yemen dataset follows the same structure as the Afghanistan and Pakistan datasets, providing a record of individual strike events with details on the date, location, target, and casualties. Like the other two datasets, this dataset is static, representing a historical record of completed airstrikes. The data represents a fixed set of events that have occurred in the past.`
    },
  }

  constructor(private http: HttpClient) { }
  getInfo(slug: string): Observable<any> {
    return of(this.info[slug])
  }

  getData(slug: string): Promise<DataFrame> {
    return readCSV(`assets/static/${slug}.csv`);
  }

  getSummary(slug: string): Observable<any> {
    return this.http.get(`${API}static/${slug}/summary`);
  }

  getVisuals(slug: string): Observable<any> {
    return this.http.get(`${API}static/${slug}/visuals`);
  }

}
