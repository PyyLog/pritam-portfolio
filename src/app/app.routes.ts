import { Routes } from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { AboutMePageComponent } from '../components/about-me-page/about-me-page.component';
import { ChronologyPageComponent } from '../components/chronology-page/chronology-page.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'about-me', component: AboutMePageComponent },
  { path: 'chronology', component: ChronologyPageComponent },
  { path: '**', redirectTo: '' },
];
