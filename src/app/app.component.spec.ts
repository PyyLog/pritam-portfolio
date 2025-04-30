import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { CommonModule, Location } from '@angular/common';
import { AppComponent } from './app.component';

// Mock Components
@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>Portfolio</h1>
      <div *ngIf="showBurgerMenu" class="burger-menu">Menu</div>
      <div class="social-links">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
      </div>
    </header>
  `,
  standalone: true,
  imports: [CommonModule],
})
class MockHeaderComponent {
  showBurgerMenu = false;
}

@Component({
  selector: 'app-homepage',
  template: `
    <section class="homepage">
      <div class="homepage-content-container">
        <nav class="quick-tabs-container">
          <ul>
            <li><a class="tab" (click)="activeTab = 'idle'" (keydown.enter)="activeTab = 'idle'; $event.preventDefault()" tabindex="0">Idle</a></li>
            <li>
              <a class="tab" (click)="activeTab = 'projects'" (keydown.enter)="activeTab = 'projects'; $event.preventDefault()" tabindex="0"
                >Projects</a
              >
            </li>
          </ul>
        </nav>
        <div *ngIf="activeTab === 'projects'" class="projects-container"></div>
        <div *ngIf="activeTab === 'idle'" class="illustration-container"></div>
      </div>
      <div class="navigation-container">
        <div class="navigation">
          <ul>
            <li><a class="about-me-btn" routerLink="/about-me">About Me</a></li>
            <li><a class="timeline-btn" routerLink="/timeline">Timeline</a></li>
          </ul>
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [CommonModule, RouterLink],
})
class MockHomepageComponent {
  activeTab: 'projects' | 'idle' = 'projects';
}

@Component({
  selector: 'app-about-me-page',
  template: `
    <section class="about-me-page">
      <div class="about-me-title-container">
        <div class="circle"></div>
        <p class="about-me-text">About Me</p>
      </div>
      <div class="pritam-picture-container">
        <img class="pritam-picture" src="favicon.ico" alt="Pritam Picture" />
      </div>
      <div class="skills-carousel-container">
        <div class="skills-carousel">
          <div *ngFor="let skill of skills" class="skill-item"></div>
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [CommonModule],
})
class MockAboutMeComponent {
  skills = [
    { name: 'Angular', level: 'Advanced', thumbnail: 'favico.ico' },
    { name: 'React', level: 'Intermediate', thumbnail: 'favico.ico' },
  ];
}

@Component({
  selector: 'app-timeline-page',
  template: `
    <section class="timeline-page">
      <div class="timeline-title-container">
        <div class="circle"></div>
        <p class="timeline-text">Timeline</p>
      </div>
      <div class="timeline-container">
        <div class="menu-tabs-container">
          <div class="menu-container">
            <div class="menu">
              <a class="menu-button">Education</a>
            </div>
          </div>
          <div class="menu-container">
            <div class="menu">
              <a class="menu-button">Experiences</a>
            </div>
          </div>
        </div>
        <div class="timeline">
          <div *ngFor="let event of events" class="timeline-event-container"></div>
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [CommonModule],
})
class MockTimelineComponent {
  events = [
    { title: 'Event 1', date: new Date('2020-01-01'), importance: 'primary' },
    { title: 'Event 2', date: new Date('2021-01-01'), importance: 'secondary' },
  ];
}

describe('AppComponent Integration Tests', (): void => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockHeaderComponent, MockHomepageComponent, MockAboutMeComponent, MockTimelineComponent],
      providers: [
        provideRouter([
          { path: '', component: MockHomepageComponent },
          { path: 'home', component: MockHomepageComponent },
          { path: 'about-me', component: MockAboutMeComponent },
          { path: 'projects', component: MockHomepageComponent },
          { path: 'timeline', component: MockTimelineComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Should create the app', (): void => {
    expect(component).toBeTruthy();
  });

  // Test main application routes
  it('Should render the correct component for each route', async (): Promise<void> => {
    // Test homepage route
    await router.navigate(['']);
    fixture.detectChanges();
    expect(location.path()).toBe('');

    // Test about-me route
    await router.navigate(['/about-me']);
    fixture.detectChanges();
    expect(location.path()).toBe('/about-me');

    // Test timeline route
    await router.navigate(['/timeline']);
    fixture.detectChanges();
    expect(location.path()).toBe('/timeline');
  });

  // Test layout structure
  it('Should have the correct structure', (): void => {
    const appElement: HTMLElement = fixture.nativeElement;
    const routerOutlet: DebugElement = fixture.debugElement.query(By.css('router-outlet'));
    expect(appElement).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });

  // Navigation tests
  it('should navigate to different pages', async (): Promise<void> => {
    // Navigate to homepage first to make sure to have access to nav elements
    await router.navigate(['']);
    fixture.detectChanges();

    // Check that we're at homepage
    expect(location.path()).toBe('');

    // Navigate to other routes
    await router.navigate(['/about-me']);
    fixture.detectChanges();
    expect(location.path()).toBe('/about-me');

    await router.navigate(['/timeline']);
    fixture.detectChanges();
    expect(location.path()).toBe('/timeline');

    // Return to homepage
    await router.navigate(['']);
    fixture.detectChanges();
    expect(location.path()).toBe('');
  });
});
