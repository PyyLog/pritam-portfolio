import { Component, Renderer2, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd, Event } from '@angular/router';
import { LINKS } from '../../data/links';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  linkedinLogo = 'icons/linkedin-logo.png';
  githubLogo = 'icons/github-logo.png';
  links = LINKS;

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const menuContainer = document.querySelector('.menu-container');
        if (event.url === '/about-me' || event.url === '/chronology') {
          this.renderer.setStyle(menuContainer, 'visibility', 'visible');
          this.renderer.setStyle(menuContainer, 'opacity', '1');
        } else {
          this.renderer.setStyle(menuContainer, 'visibility', 'hidden');
          this.renderer.setStyle(menuContainer, 'opacity', '0');
        }
      }
    });
  }
}
