import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViewComponent } from './pages/view/view.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'view/:slug',
        component: ViewComponent
    }
];
