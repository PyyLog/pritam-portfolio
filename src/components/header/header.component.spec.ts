import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { DebugElement, Type } from '@angular/core';
import { provideRouter, Route } from '@angular/router';

interface Viewport {
  width: number;
  height: number;
  name: string;
}

const VIEWPORTS: Record<string, Viewport> = {
  mobile: { width: 320, height: 568, name: 'Mobile' }, // iPhone 5/SE
  tablet: { width: 768, height: 1024, name: 'Tablet' }, // iPad
  laptop: { width: 1920, height: 1080, name: 'Laptop' }, // 15" MacBook Pro
  desktop: { width: 2560, height: 1440, name: 'Desktop' }, // 27" iMac
};

describe('HeaderComponent tests', (): void => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let originalWindowWidth: number;
  let originalWindowHeight: number;

  // Helper functions to resize the viewport for testing
  function resizeViewport(viewport: Viewport | { width: number; height: number }): void {
    if (!originalWindowWidth) originalWindowWidth = window.innerWidth;
    if (!originalWindowHeight) originalWindowHeight = window.innerHeight;

    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: viewport['width'] });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: viewport['height'] });

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
  }

  function resetViewport(): void {
    if (originalWindowWidth && originalWindowHeight) {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: originalWindowWidth });
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: originalWindowHeight });
      window.dispatchEvent(new Event('resize'));
    }
  }

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([
          { path: 'home', component: {} as Route as Type<Route> },
          { path: 'about-me', component: {} as Route as Type<Route> },
          { path: 'projects', component: {} as Route as Type<Route> },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach((): void => {
    resetViewport();
  });

  // Verify that the component is created successfully
  it('Should create', (): void => {
    expect(component).toBeTruthy();
  });

  // Verify that the component has the title
  it('Should have title', (): void => {
    const titleElement: DebugElement = fixture.debugElement.query(By.css('.name-text'));
    const title: string = titleElement.nativeElement.textContent;
    expect(title).toEqual('PyyLog');
  });

  // Verify that the component has social network buttons
  it('Should have social networks button', (): void => {
    const linkedinLogoElement: DebugElement = fixture.debugElement.query(By.css('.linkedin-logo'));
    const gitHubLogoElement: DebugElement = fixture.debugElement.query(By.css('.github-logo'));
    expect(linkedinLogoElement).toBeTruthy();
    expect(gitHubLogoElement).toBeTruthy();
  });

  // Verify if the social network buttons are working
  it('Should have social networks button working', (): void => {
    const snContainerElement: DebugElement = fixture.debugElement.query(By.css('.sn-container'));
    const anchors: HTMLElement[] = snContainerElement.nativeElement.querySelectorAll('a');
    expect(anchors.length).toBeGreaterThan(0);

    // Check that LinkedIn anchor has correct href
    const linkedinAnchor: DebugElement = fixture.debugElement.query(By.css('.linkedin-logo-container a'));
    expect(linkedinAnchor.attributes['href']).toBe(component.links.linkedin);
    expect(linkedinAnchor.attributes['target']).toBe('_blank');

    // Check GitHub anchor has correct href
    const githubAnchor: DebugElement = fixture.debugElement.query(By.css('.github-logo-container a'));
    expect(githubAnchor.attributes['href']).toBe(component.links.github);
    expect(githubAnchor.attributes['target']).toBe('_blank');
  });

  // Verify that the component has a navigation bar
  it('Should have a navigation menu', (): void => {
    const navElement: DebugElement = fixture.debugElement.query(By.css('.menu-list'));
    expect(navElement).toBeTruthy();
  });

  // Verify that the navigation bar has different links
  it('Should display menu links', (): void => {
    const navLinks: DebugElement[] = fixture.debugElement.queryAll(By.css('.menu-list li a'));
    expect(navLinks.length).toBe(3); // Should have exactly 3 nav links based on HTML

    // Verify specific link text
    const linkTexts = navLinks.map(link => link.nativeElement.textContent.trim());
    expect(linkTexts).toContain('About Me');
    expect(linkTexts).toContain('Timeline');
    expect(linkTexts).toContain('Projects');
  });

  // Verify that the navigation links have proper routes
  it('Should have correct routes for navigation links', (): void => {
    const aboutMeNavLink: DebugElement = fixture.debugElement.query(By.css('[routerLink="/about-me"]'));
    const timelineNavLink: DebugElement = fixture.debugElement.query(By.css('[routerLink="/timeline"]'));

    expect(aboutMeNavLink.attributes['routerLink']).toBe('/about-me');
    expect(timelineNavLink.attributes['routerLink']).toBe('/timeline');

    const viewportSequence: string[] = ['laptop', 'desktop'];

    viewportSequence.forEach(viewport => {
      resizeViewport(VIEWPORTS[viewport]);
      fixture.detectChanges();

      const menuButton: DebugElement = fixture.debugElement.query(By.css('.menu-button'));
      const homePageNavLink: DebugElement = fixture.debugElement.query(By.css('[routerLink=""]'));
      expect(menuButton).toBeTruthy();
      expect(component.isMobileOrTablet).toBeFalse();
      expect(homePageNavLink.attributes['routerLink']).toBe('');
    });
  });

  // Verify header elements alignment during resize
  it('Should maintain header elements alignment during resize', fakeAsync((): void => {
    // Test multiple resize scenarios
    const viewportSequence: string[] = ['mobile', 'tablet', 'laptop', 'desktop'];

    viewportSequence.forEach(viewport => {
      resizeViewport(VIEWPORTS[viewport]);
      tick(100);
      fixture.detectChanges();

      // Verify name container is still visible and properly sized
      const nameContainer: DebugElement = fixture.debugElement.query(By.css('.name-container'));
      expect(nameContainer.nativeElement.offsetHeight).toBeGreaterThan(0);
      expect(nameContainer.nativeElement.offsetWidth).toBeGreaterThan(0);

      // Verify social icons container is still visible
      const socialContainer: DebugElement = fixture.debugElement.query(By.css('.sn-container'));
      expect(socialContainer.nativeElement.offsetHeight).toBeGreaterThan(0);
      expect(socialContainer.nativeElement.offsetWidth).toBeGreaterThan(0);
    });
  }));
});
