import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { MainContentBackgroundComponent } from '../components/main-content-background/main-content-background.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MainContentBackgroundComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
}
