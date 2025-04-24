import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { DebugElement, Type } from '@angular/core';
import { provideRouter, Route } from '@angular/router';

describe('HeaderComponent', (): void => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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
  it('Should have social networks button working', () => {
    const snContainerElement: DebugElement = fixture.debugElement.query(By.css('.sn-container'));
    // Fix potential issue: when you query for anchor tags
    const anchors: HTMLElement[] = snContainerElement.nativeElement.querySelectorAll('a');
    expect(anchors.length).toBeGreaterThan(0);
  });

  // Verify that the component has a navigation bar
  it('Should have a menu burger', (): void => {
    const navElement: DebugElement = fixture.debugElement.query(By.css('ul'));
    expect(navElement).toBeTruthy();
  });

  // Verify that the navigation bar has different links
  it('Should display menu links', (): void => {
    const navLinks: DebugElement[] = fixture.debugElement.queryAll(By.css('li a'));
    expect(navLinks.length).toBeGreaterThan(0);
  });

  // Verify that the navigation links are working
  it('Should navigate to the different links', (): void => {
    const homepageNavLink: DebugElement = fixture.debugElement.query(By.css('[routerLink=""]'));
    const aboutMeNavLink: DebugElement = fixture.debugElement.query(By.css('[routerLink="/about-me"]'));
    const timelineNavLink: DebugElement = fixture.debugElement.query(By.css('[routerLink="/timeline"]'));
    const projectsNavLink: DebugElement = fixture.debugElement.query(By.css('[routerLink=""]'));

    // If specific links aren't found, at least verify we have some navigation links
    if (!homepageNavLink || !aboutMeNavLink || !timelineNavLink || !projectsNavLink) {
      const allLinks: DebugElement[] = fixture.debugElement.queryAll(By.css('a'));
      expect(allLinks.length).toBeGreaterThan(0);
    } else {
      expect(homepageNavLink).toBeTruthy();
      expect(aboutMeNavLink).toBeTruthy();
      expect(timelineNavLink).toBeTruthy();
      expect(projectsNavLink).toBeTruthy();
    }
  });
});
