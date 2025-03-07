import { Component } from '@angular/core';
import { LINKS } from '../../links/links';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  linkedinLogo = 'icons/linkedin-logo.png';
  githubLogo = 'icons/github-logo.png';
  links = LINKS;
}
