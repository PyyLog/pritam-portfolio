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
      <h1 (mouseover)="showTitle = true" (mouseout)="showTitle = false" (focus)="showTitle = true" (blur)="showTitle = false">Portfolio</h1>
      <p class="title-text" [style.opacity]="showTitle ? 1 : 0">Hover text</p>
      <div
        class="social-links"
        (mouseover)="showSocialText1 = true"
        (mouseout)="showSocialText1 = false"
        (focus)="showSocialText1 = true"
        (blur)="showSocialText1 = false">
        <a href="#">Link 1</a>
        <p class="social-links-text" [style.opacity]="showSocialText1 ? 1 : 0">Hover text</p>
      </div>
      <div
        class="social-links"
        (mouseover)="showSocialText2 = true"
        (mouseout)="showSocialText2 = false"
        (focus)="showSocialText2 = true"
        (blur)="showSocialText2 = false">
        <a href="#">Link 2</a>
        <p class="social-links-text" [style.opacity]="showSocialText2 ? 1 : 0">Hover text</p>
      </div>
      <div class="menu-tabs-container">
        <div class="menu-container">
          <div class="menu">
            <a
              class="menu-button"
              (mouseover)="showBurgerMenu = true"
              (mouseout)="showBurgerMenu = false"
              (focus)="showBurgerMenu = true"
              (blur)="showBurgerMenu = false"
              >Homepage</a
            >
            <ul class="menu-list" [style.display]="showBurgerMenu ? 'block' : 'none'">
              <li>About Me</li>
              <li>Timeline</li>
              <li>Projects</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  `,
  standalone: true,
  imports: [CommonModule],
})
class MockHeaderComponent {
  showBurgerMenu = false;
  showTitle = false;
  showSocialText1 = false;
  showSocialText2 = false;
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
        <div class="projects-container" *ngIf="activeTab === 'projects'">
          <div class="projects-carousel">
            <div
              class="project-item"
              *ngFor="let project of projects"
              (mouseover)="showProjectOverlay = true"
              (mouseout)="showProjectOverlay = false"
              (focus)="showProjectOverlay = true"
              (blur)="showProjectOverlay = false">
              <img [src]="project.thumbnail" alt="thumbnail" />
              <div class="project-overlay" [style.opacity]="showProjectOverlay ? 1 : 0">
                <h3>{{ project.title }}</h3>
                <p>{{ project.shortDescription }}</p>
                <div class="technologies">
                  <span *ngFor="let tech of project.technologies" class="techno-span">{{ tech }}</span>
                </div>
                <button class="read-more">Read More</button>
              </div>
            </div>
          </div>
        </div>
        <div class="illustration-container" *ngIf="activeTab === 'idle'">
          <img
            class="illustration"
            src="favicon.ico"
            alt="illustration"
            (mouseover)="showCredits = true"
            (mouseout)="showCredits = false"
            (focus)="showCredits = true"
            (blur)="showCredits = false" />
          <p class="illustration-credits" [style.opacity]="showCredits ? 1 : 0">credits</p>
        </div>
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
  showProjectOverlay = false;
  showCredits = false;
  projects = [
    { title: 'Project 1', thumbnail: 'favicon.ico', shortDescription: 'Short description 1', technologies: ['Angular'] },
    { title: 'Project 2', thumbnail: 'favicon.ico', shortDescription: 'Short description 2', technologies: ['React'] },
  ];
}

@Component({
  selector: 'app-about-me-page',
  template: `
    <section class="about-me-page">
      <div class="about-me-title-container">
        <div class="circle"></div>
        <p class="about-me-text">About Me</p>
      </div>
      <div class="picture-container">
        <img class="picture" src="favicon.ico" alt="picture" />
      </div>
      <div class="skills-carousel-container">
        <div class="skills-carousel">
          <div
            *ngFor="let skill of skills"
            class="skill-item"
            (mouseover)="showSkillOverlay = true"
            (mouseout)="showSkillOverlay = false"
            (focus)="showSkillOverlay = true"
            (blur)="showSkillOverlay = false">
            <div class="skill-overlay" [style.opacity]="showSkillOverlay ? 1 : 0">
              <p>{{ skill.name }}</p>
              <p>{{ skill.level }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [CommonModule],
})
class MockAboutMeComponent {
  showSkillOverlay = false;
  skills = [
    { name: 'Angular', level: 'Advanced', thumbnail: 'favicon.ico' },
    { name: 'React', level: 'Intermediate', thumbnail: 'favicon.ico' },
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
              <a
                class="menu-button"
                (mouseover)="showEducationMenu = true"
                (mouseout)="showEducationMenu = false"
                (focus)="showEducationMenu = true"
                (blur)="showEducationMenu = false"
                >Education</a
              >
              <ul class="education-menu-list" [style.display]="showEducationMenu ? 'block' : 'none'">
                <li>Event 1</li>
              </ul>
            </div>
          </div>
          <div class="menu-container">
            <div class="menu">
              <a
                class="menu-button"
                (mouseover)="showExperiencesMenu = true"
                (mouseout)="showExperiencesMenu = false"
                (focus)="showExperiencesMenu = true"
                (blur)="showExperiencesMenu = false"
                >Experiences</a
              >
              <ul class="experiences-menu-list" [style.display]="showExperiencesMenu ? 'block' : 'none'">
                <li>Event 1</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="timeline">
          <div class="timeline-event-container" *ngFor="let event of events">
            <div class="event-point-container">
              <div class="event-date-text"></div>
              <div
                class="event-circle"
                (click)="showEventDetails = true"
                (keydown.enter)="showEventDetails = true; $event.preventDefault()"
                tabindex="0"
                (mouseover)="showEventThumbnail = true"
                (mouseout)="showEventThumbnail = false"
                (focus)="showEventThumbnail = true"
                (blur)="showEventThumbnail = false">
                <img class="event-thumbnail" [src]="event.thumbnailPath" alt="" [style.opacity]="showEventThumbnail ? 1 : 0" />
              </div>
              <div class="event-title-text">{{ event.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  standalone: true,
  imports: [CommonModule],
})
class MockTimelineComponent {
  showEducationMenu = false;
  showExperiencesMenu = false;
  showEventDetails = false;
  showEventThumbnail = false;
  events = [
    { title: 'Event 1', date: new Date('2020-01-01'), description: '', thumbnailPath: 'favicon.ico' },
    { title: 'Event 2', date: new Date('2021-01-01'), description: 'test description', thumbnailPath: 'favicon.ico' },
  ];
}

describe('AppComponent Integration Tests', (): void => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;
  let router: Router;

  let headerComponent: MockHeaderComponent;
  let headerFixture: ComponentFixture<MockHeaderComponent>;
  let homepageComponent: MockHomepageComponent;
  let homepageFixture: ComponentFixture<MockHomepageComponent>;
  let aboutMeComponent: MockAboutMeComponent;
  let aboutMeFixture: ComponentFixture<MockAboutMeComponent>;
  let timelineComponent: MockTimelineComponent;
  let timelineFixture: ComponentFixture<MockTimelineComponent>;

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

    // Initialize separate fixtures for each component
    headerFixture = TestBed.createComponent(MockHeaderComponent);
    headerComponent = headerFixture.componentInstance;
    headerFixture.detectChanges();
    homepageFixture = TestBed.createComponent(MockHomepageComponent);
    homepageComponent = homepageFixture.componentInstance;
    homepageFixture.detectChanges();
    aboutMeFixture = TestBed.createComponent(MockAboutMeComponent);
    aboutMeComponent = aboutMeFixture.componentInstance;
    aboutMeFixture.detectChanges();
    timelineFixture = TestBed.createComponent(MockTimelineComponent);
    timelineComponent = timelineFixture.componentInstance;
    timelineFixture.detectChanges();

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

  // Test hover effect on the header title
  it('Should display text when hovering over the title', (): void => {
    const titleElement: DebugElement = headerFixture.debugElement.query(By.css('h1'));
    const titleTextElement: DebugElement = headerFixture.debugElement.query(By.css('.title-text'));
    expect(titleElement).toBeTruthy();
    expect(titleTextElement).toBeTruthy();

    // Check initial state
    expect(headerComponent.showTitle).toBeFalse();
    expect(titleTextElement.nativeElement.style.opacity).toEqual('0');

    // Trigger hover event
    titleElement.triggerEventHandler('mouseover', null);
    headerFixture.detectChanges();
    expect(headerComponent.showTitle).toBeTrue();
    expect(titleTextElement.nativeElement.style.opacity).toEqual('1');

    // Trigger mouseout event
    titleElement.triggerEventHandler('mouseout', null);
    headerFixture.detectChanges();
    expect(headerComponent.showTitle).toBeFalse();
    expect(titleTextElement.nativeElement.style.opacity).toEqual('0');
  });

  // Test hover effect on the social links
  it('Should display text when hovering over social links', (): void => {
    const socialLinks: DebugElement[] = headerFixture.debugElement.queryAll(By.css('.social-links'));
    const socialTexts: DebugElement[] = headerFixture.debugElement.queryAll(By.css('.social-links-text'));
    expect(socialLinks.length).toBeGreaterThan(0);
    expect(socialTexts.length).toBeGreaterThan(0);

    // Test first social link
    expect(headerComponent.showSocialText1).toBeFalse();
    expect(socialTexts[0].nativeElement.style.opacity).toEqual('0');

    // Trigger hover on first social link
    socialLinks[0].triggerEventHandler('mouseover', null);
    headerFixture.detectChanges();
    expect(headerComponent.showSocialText1).toBeTrue();
    expect(socialTexts[0].nativeElement.style.opacity).toEqual('1');

    // Trigger mouseout
    socialLinks[0].triggerEventHandler('mouseout', null);
    headerFixture.detectChanges();
    expect(headerComponent.showSocialText1).toBeFalse();
    expect(socialTexts[0].nativeElement.style.opacity).toEqual('0');

    // Test second social link
    expect(headerComponent.showSocialText2).toBeFalse();
    expect(socialTexts[1].nativeElement.style.opacity).toEqual('0');

    // Trigger hover on second social link
    socialLinks[1].triggerEventHandler('mouseover', null);
    headerFixture.detectChanges();
    expect(headerComponent.showSocialText2).toBeTrue();
    expect(socialTexts[1].nativeElement.style.opacity).toEqual('1');

    // Trigger mouseout
    socialLinks[1].triggerEventHandler('mouseout', null);
    headerFixture.detectChanges();
    expect(headerComponent.showSocialText2).toBeFalse();
    expect(socialTexts[1].nativeElement.style.opacity).toEqual('0');
  });

  // Test the hover effect on the homepage menu button
  it('Should show menu dropdown on hovering the homepage button', (): void => {
    // Test menu
    const button: DebugElement = headerFixture.debugElement.query(By.css('.menu-button'));
    const menu: DebugElement = headerFixture.debugElement.query(By.css('.menu-list'));
    expect(button).toBeTruthy();
    expect(menu).toBeTruthy();

    // Check initial state
    expect(headerComponent.showBurgerMenu).toBeFalse();
    expect(menu.nativeElement.style.display).toBe('none');

    // Trigger mouseover event on Education button
    button.triggerEventHandler('mouseover', null);
    headerFixture.detectChanges();
    expect(headerComponent.showBurgerMenu).toBeTrue();
    expect(menu.nativeElement.style.display).toBe('block');

    // Trigger mouseout event
    button.triggerEventHandler('mouseout', null);
    headerFixture.detectChanges();
    expect(headerComponent.showBurgerMenu).toBeFalse();
    expect(menu.nativeElement.style.display).toBe('none');
  });

  // Test the hover effect on the idle part illustration
  it('Should show illustration credits', (): void => {
    // Click on the idle tab to show the illustration
    const idleTab: DebugElement = homepageFixture.debugElement.query(By.css('.tab'));
    idleTab.triggerEventHandler('click', null);
    homepageFixture.detectChanges();

    const illustrationElement: DebugElement = homepageFixture.debugElement.query(By.css('.illustration'));
    const creditsText: DebugElement = homepageFixture.debugElement.query(By.css('.illustration-credits'));
    expect(illustrationElement).toBeTruthy();
    expect(creditsText).toBeTruthy();

    // Check initial state
    expect(homepageComponent.showCredits).toBeFalse();
    expect(creditsText.nativeElement.style.opacity).toEqual('0');

    // Trigger mouseover event on Education button
    illustrationElement.triggerEventHandler('mouseover', null);
    homepageFixture.detectChanges();
    expect(homepageComponent.showCredits).toBeTrue();
    expect(creditsText.nativeElement.style.opacity).toEqual('1');

    // Trigger mouseout event
    illustrationElement.triggerEventHandler('mouseout', null);
    homepageFixture.detectChanges();
    expect(homepageComponent.showCredits).toBeFalse();
    expect(creditsText.nativeElement.style.opacity).toEqual('0');
  });

  // Test the hover effect on the projects carousel
  it('Should display project overlay on hover', (): void => {
    const projectCarouselElement: DebugElement = homepageFixture.debugElement.query(By.css('.projects-carousel'));
    const projectItems: DebugElement[] = homepageFixture.debugElement.queryAll(By.css('.project-item'));
    const projectOverlayElement: DebugElement = homepageFixture.debugElement.query(By.css('.project-overlay'));
    expect(projectCarouselElement).toBeTruthy();
    expect(projectItems.length).toBeGreaterThan(0);
    expect(projectOverlayElement).toBeTruthy();

    projectItems.forEach(projectItem => {
      // Check initial state
      expect(homepageComponent.showProjectOverlay).toBeFalse();
      expect(projectOverlayElement.nativeElement.style.opacity).toEqual('0');

      // Trigger hover event
      projectItem.triggerEventHandler('mouseover', null);
      homepageFixture.detectChanges();
      expect(homepageComponent.showProjectOverlay).toBeTrue();
      expect(projectOverlayElement.nativeElement.style.opacity).toEqual('1');

      // Trigger mouseout event
      projectItem.triggerEventHandler('mouseout', null);
      homepageFixture.detectChanges();
      expect(homepageComponent.showProjectOverlay).toBeFalse();
      expect(projectOverlayElement.nativeElement.style.opacity).toEqual('0');
    });
  });

  // Test the hover effect on the skills carousel
  it('Should display skills overlay on hover', (): void => {
    const skillsCarouselElement: DebugElement = aboutMeFixture.debugElement.query(By.css('.skills-carousel'));
    const skillItems: DebugElement[] = aboutMeFixture.debugElement.queryAll(By.css('.skill-item'));
    const skillOverlayElement: DebugElement = aboutMeFixture.debugElement.query(By.css('.skill-overlay'));
    expect(skillsCarouselElement).toBeTruthy();
    expect(skillItems.length).toBeGreaterThan(0);
    expect(skillOverlayElement).toBeTruthy();

    skillItems.forEach(skillItem => {
      // Check initial state
      expect(aboutMeComponent.showSkillOverlay).toBeFalse();
      expect(skillOverlayElement.nativeElement.style.opacity).toEqual('0');

      // Trigger hover event
      skillItem.triggerEventHandler('mouseover', null);
      aboutMeFixture.detectChanges();
      expect(aboutMeComponent.showSkillOverlay).toBeTrue();
      expect(skillOverlayElement.nativeElement.style.opacity).toEqual('1');

      // Trigger mouseout event
      skillItem.triggerEventHandler('mouseout', null);
      aboutMeFixture.detectChanges();
      expect(aboutMeComponent.showSkillOverlay).toBeFalse();
      expect(skillOverlayElement.nativeElement.style.opacity).toEqual('0');
    });
  });

  // Test the hover effect on the timeline events
  it('Should display event thumbnail on hover', (): void => {
    const eventCircles: DebugElement[] = timelineFixture.debugElement.queryAll(By.css('.event-circle'));
    expect(eventCircles.length).toBeGreaterThan(0);

    eventCircles.forEach(eventCircle => {
      const thumbnail: DebugElement = eventCircle.query(By.css('.event-thumbnail'));
      expect(thumbnail).toBeTruthy();

      // Check initial state
      expect(thumbnail.nativeElement.style.opacity).toEqual('0');

      // Trigger mouseover event
      eventCircle.triggerEventHandler('mouseover', null);
      timelineFixture.detectChanges();
      expect(timelineComponent.showEventThumbnail).toBeTrue();
      expect(thumbnail.nativeElement.style.opacity).toEqual('1');

      // Trigger mouseout event
      eventCircle.triggerEventHandler('mouseout', null);
      timelineFixture.detectChanges();
      expect(timelineComponent.showEventThumbnail).toBeFalse();
      expect(thumbnail.nativeElement.style.opacity).toEqual('0');
    });
  });

  // Test the hover effect on the timeline menu buttons
  it('Should show menu dropdowns on hovering menu buttons', (): void => {
    // Get all menu buttons
    const menuButtons: DebugElement[] = timelineFixture.debugElement.queryAll(By.css('.menu-button'));
    expect(menuButtons.length).toBe(2);

    // Test Education menu
    const educationButton: DebugElement = menuButtons[0];
    const educationMenu: DebugElement = timelineFixture.debugElement.query(By.css('.education-menu-list'));
    expect(educationButton).toBeTruthy();
    expect(educationMenu).toBeTruthy();

    // Check initial state
    expect(timelineComponent.showEducationMenu).toBeFalse();
    expect(educationMenu.nativeElement.style.display).toBe('none');

    // Trigger mouseover event on Education button
    educationButton.triggerEventHandler('mouseover', null);
    timelineFixture.detectChanges();
    expect(timelineComponent.showEducationMenu).toBeTrue();
    expect(educationMenu.nativeElement.style.display).toBe('block');

    // Trigger mouseout event
    educationButton.triggerEventHandler('mouseout', null);
    timelineFixture.detectChanges();
    expect(timelineComponent.showEducationMenu).toBeFalse();
    expect(educationMenu.nativeElement.style.display).toBe('none');

    // Test Experiences menu
    const experiencesButton: DebugElement = menuButtons[1];
    const experiencesMenu: DebugElement = timelineFixture.debugElement.query(By.css('.experiences-menu-list'));
    expect(experiencesButton).toBeTruthy();
    expect(experiencesMenu).toBeTruthy();

    // Check initial state
    expect(timelineComponent.showExperiencesMenu).toBeFalse();
    expect(experiencesMenu.nativeElement.style.display).toBe('none');

    // Trigger mouseover event on Experiences button
    experiencesButton.triggerEventHandler('mouseover', null);
    timelineFixture.detectChanges();
    expect(timelineComponent.showExperiencesMenu).toBeTrue();
    expect(experiencesMenu.nativeElement.style.display).toBe('block');

    // Trigger mouseout event
    experiencesButton.triggerEventHandler('mouseout', null);
    timelineFixture.detectChanges();
    expect(timelineComponent.showExperiencesMenu).toBeFalse();
    expect(experiencesMenu.nativeElement.style.display).toBe('none');
  });
});
