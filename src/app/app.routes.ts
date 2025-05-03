import { Routes } from '@angular/router';
import { HomepageComponent } from '../pages/homepage/homepage.component';
import { AboutMeComponent } from '../pages/about-me/about-me.component';
import { TimelineComponent } from '../pages/timeline/timeline.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: '**', redirectTo: '' },
];
