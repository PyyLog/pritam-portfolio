import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LINKS } from '../../data/links';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  linkedinLogo = 'icons/linkedin-logo.png';
  githubLogo = 'icons/github-logo.png';
  links = LINKS;
}
