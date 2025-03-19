import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API } from '../utils/constants';
import { readCSV, DataFrame } from "danfojs/dist/danfojs-browser/src"

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  info: any = {
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
    trk_exchange_rates: {
      title: "Turkish Lira (TRY) Exchange Rates",
      description: `
      This dataset tracks the daily exchange rates of the Turkish Lira (TRY) against various currencies. It provides a historical record of the Lira's value, which is crucial for understanding the economic stability and international trade of Turkey. Exchange rates are inherently time-series, as they fluctuate constantly due to market forces, economic policies, and geopolitical events. Analyzing this dataset allows for the identification of trends, volatility, and potential correlations with other economic indicators.
This data consists of these features: Date: The date of the exchange rate recording, USD_TRY: The exchange rate of USD to TRY, EUR_TRY: The exchange rate of EUR to TRY, GBP_TRY: The exchange rate of GBP to TRY, etc.
      `
    },
    import_export_trade_data_EU: {
      title: "Import/Export Trade Data in Bosnia and Herzegovina",
      description: `This dataset tracks the import and export trade data of Bosnia and Herzegovina over time. It provides detailed information on individual trade transactions, including product descriptions, quantities, values, and involved parties. It offers insights into the country's trade balance, economic activity, and international trade relationships.
      Features: DATE: The date of the trade transaction, IMPORTER NAME: The name of the importing company, EXPORT COUNTRY: The country from which the goods were exported, HS CODE: The Harmonized System code, PRODUCT DESCRIPTION: A description of the traded product, QUANTITY: The quantity of the traded product, TOTAL VALUE USD: The total value in US Dollars (USD), etc.
      `
    },
    bnb: {
      title: "BNB (Binance Coin) Price History",
      description: `
      This dataset records the historical price of Binance Coin (BNB), a cryptocurrency, over time. It includes daily open, high, low, close, and adjusted close prices, as well as trading volume. This data is essential for analyzing the volatility and trends of BNB and understanding the cryptocurrency market.
      Columns: Date: The date of the price recording, Open: The opening price, High: The highest price, Low: The lowest price, Close: The closing price, Volume: The trading volume, etc.
`
    }
  }

  constructor(private http: HttpClient) { }
  getInfo(slug: string): Observable<any> {
    return of(this.info[slug])
  }

  getData(slug: string): Promise<DataFrame> {
    return readCSV(`assets/${slug}.csv`);
  }

  getSummary(slug: string): Observable<any> {
    return this.http.get(`${API}static/${slug}/summary`);
  }

  getVisuals(slug: string): Observable<any> {
    return this.http.get(`${API}static/${slug}/visuals`);
  }

}
