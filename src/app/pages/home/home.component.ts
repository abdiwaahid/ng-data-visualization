import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    static = [
      {
        title: "US Airstrikes in Afghanistan",
        slug: "afghanistan",
      },
      {
        title: "US Airstrikes in Pakistan",
        slug: "pakistan",
      },
      {
        title: "US Airstrikes in Yemen",
        slug: "yemen",
      },

    ]

    timeseries = [
      {
        title: "3.1 Turkish Lira (TRY) Exchange Rates",
        slug: "trk_exchange_rates",
      },
      {
        title: "Import/Export Trade Data in Bosnia and Herzegovina",
        slug: "import_export_trade_data_EU",
      },
      {
        title: "BNB (Binance Coin) Price History",
        slug: "bnb",
      },

    ]
}
