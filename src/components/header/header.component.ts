import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { LINKS } from '../../data/links';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly linkedinLogo = 'icons/linkedin-logo.png';
  readonly githubLogo = 'icons/github-logo.png';
  readonly links = LINKS;
  showMenu = false;
  menuOpen = false;
  isMobileOrTablet = false;
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd): void => {
      this.showMenu = event.url === '/about-me' || event.url === '/timeline';
    });

    this.checkDeviceType();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkDeviceType();
  }

  private checkDeviceType(): void {
    this.isMobileOrTablet = window.innerWidth < 1280;
  }

  handleMenuButtonClick(event: Event): void {
    if (this.isMobileOrTablet) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleMenu();
    } else {
      this.menuOpen = false;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Close menu when clicking outside
  @HostListener('document:click', ['$event'])
  closeMenuOnClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.menuOpen && !target.closest('.menu')) {
      this.menuOpen = false;
    }
  }
}
