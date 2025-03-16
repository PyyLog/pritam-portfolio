import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { MainContentBackgroundComponent } from '../components/main-content-background/main-content-background.component';
import { HomepageContentComponent } from '../components/homepage-content/homepage-content.component';
import { AboutMePageComponent } from '../components/about-me-page/about-me-page.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MainContentBackgroundComponent, HomepageContentComponent, AboutMePageComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
}
