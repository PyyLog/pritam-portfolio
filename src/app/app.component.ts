import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { PagesBackgroundComponent } from '../components/pages-background/pages-background.component';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { AboutMePageComponent } from '../components/about-me-page/about-me-page.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PagesBackgroundComponent, HomepageComponent, AboutMePageComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
}
