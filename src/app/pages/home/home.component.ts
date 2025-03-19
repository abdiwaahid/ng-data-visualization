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
}
