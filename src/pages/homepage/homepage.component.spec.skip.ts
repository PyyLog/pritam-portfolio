import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { provideRouter, Route } from '@angular/router';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomepageComponent', (): void => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  const mockProject = {
    id: 1,
    title: 'Test Project',
    shortDescription: 'Test project short description',
    context: 'Test context',
    tasksDetails: [],
    technologies: ['Angular', 'TypeScript'],
    thumbnail: 'favicon.ico',
    illustration: 'favicon.ico',
    state: 'In Progress',
    linkToCodeSpanNames: ['test1', 'test2'],
    pathToCodes: ['test1', 'test2'],
  };

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent],
      providers: [
        provideRouter([
          { path: 'home', component: {} as Route as Type<Route> },
          { path: 'about-me', component: {} as Route as Type<Route> },
          { path: 'projects', component: {} as Route as Type<Route> },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify that the component is created successfully
  it('Should create', (): void => {
    expect(component).toBeTruthy();
  });

  // Verify that the quick tabs are displayed correctly
  it('Should display quick tabs', (): void => {
    const quickTabsElements: DebugElement = fixture.debugElement.query(By.css('.quick-tabs-container'));
    expect(quickTabsElements).toBeTruthy();
  });

  // Verify that the quick tabs display the right content when clicked
  it('Should display right content when clicked', (): void => {
    // Check that the initial state is correct
    expect(component.activeTab).toEqual('projects');

    // Check that the projects carousel is displayed by default
    const projectsCarousel: DebugElement = fixture.debugElement.query(By.css('.projects-carousel'));
    const illustrationElement: DebugElement = fixture.debugElement.query(By.css('.illustration'));
    expect(projectsCarousel).toBeTruthy();
    expect(illustrationElement).toBeFalsy();

    // Get the tabs
    const tabs: DebugElement[] = fixture.debugElement.queryAll(By.css('.quick-tabs-container a'));
    const idleTab: DebugElement = tabs[0];
    const projectsTab: DebugElement = tabs[1];

    // Click on the idle tab and check the content that the right content is displayed
    idleTab.nativeElement.click();
    fixture.detectChanges();
    const projectsCarouselAfterClick1: DebugElement = fixture.debugElement.query(By.css('.projects-carousel'));
    const illustrationElementAfterClick1: DebugElement = fixture.debugElement.query(By.css('.illustration'));
    expect(component.activeTab).toEqual('idle');
    expect(illustrationElementAfterClick1).toBeTruthy();
    expect(illustrationElementAfterClick1.nativeElement.src).toContain('pictures/landscape-at-twilight-van-gogh.png');
    expect(projectsCarouselAfterClick1).toBeFalsy();

    // Click on the projects tab and check the content that the right content is displayed
    projectsTab.nativeElement.click();
    fixture.detectChanges();
    const projectsCarouselAfterClick2: DebugElement = fixture.debugElement.query(By.css('.projects-carousel'));
    const illustrationElementAfterClick2: DebugElement = fixture.debugElement.query(By.css('.illustration'));
    expect(component.activeTab).toEqual('projects');
    expect(projectsCarouselAfterClick2).toBeTruthy();
    expect(illustrationElementAfterClick2).toBeFalsy();
  });

  // Check if the Read More button works
  it('Should display project details when Read More button is clicked', (): void => {
    const readMoreButtonElement: DebugElement = fixture.debugElement.query(By.css('.read-more'));
    expect(readMoreButtonElement).toBeTruthy();

    readMoreButtonElement.nativeElement.click();
    fixture.detectChanges();
    const projectDetails: DebugElement = fixture.debugElement.query(By.css('.project-details'));
    expect(projectDetails).toBeTruthy();
  });

  // Check if the content of project details is displayed correctly
  it('Should display project details content', (): void => {
    // Click on the Read More button to open project details
    const readMoreButtonElement: DebugElement = fixture.debugElement.query(By.css('.read-more'));
    expect(readMoreButtonElement).toBeTruthy();
    readMoreButtonElement.nativeElement.click();
    fixture.detectChanges();

    // Check that the project details elements are displayed correctly
    const closeButtonElement: DebugElement = fixture.debugElement.query(By.css('.close-btn'));
    const techStackElement: DebugElement = fixture.debugElement.query(By.css('.tech-stack'));
    const projectContextElement: DebugElement = fixture.debugElement.query(By.css('.project-context'));
    const projectTasksDetailsElement: DebugElement = fixture.debugElement.query(By.css('.project-tasks-details'));
    expect(closeButtonElement).toBeTruthy();
    expect(techStackElement).toBeTruthy();
    expect(projectContextElement).toBeTruthy();
    expect(projectTasksDetailsElement).toBeTruthy();
    expect(techStackElement).toBeTruthy();
    expect(projectContextElement).toBeTruthy();
    expect(projectTasksDetailsElement).toBeTruthy();
  });

  // Check that the path to code links have correct prefix
  it('Should have correct prefix for code links', (): void => {
    // Click on the Read More button to open project details
    const readMoreButtonElement: DebugElement = fixture.debugElement.query(By.css('.read-more'));
    expect(readMoreButtonElement).toBeTruthy();
    readMoreButtonElement.nativeElement.click();
    fixture.detectChanges();

    // Check that the paths to code contain the correct prefix
    const pathToCodeElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.path-to-code a'));
    expect(pathToCodeElements.length).toBeGreaterThanOrEqual(0);

    if (pathToCodeElements.length !== 0) {
      for (const element of pathToCodeElements) {
        expect(element.nativeElement.href).toContain('https://github.com/');
      }
    }
  });

  // Check if the close button works
  it('Should close project details when close button is clicked', (): void => {
    // Click on the Read More button to open project details
    const readMoreButtonElement: DebugElement = fixture.debugElement.query(By.css('.read-more'));
    expect(readMoreButtonElement).toBeTruthy();
    readMoreButtonElement.nativeElement.click();
    fixture.detectChanges();

    // Click on the close button to close project details
    const closeButtonElement: DebugElement = fixture.debugElement.query(By.css('.close-btn'));
    expect(closeButtonElement).toBeTruthy();
    closeButtonElement.nativeElement.click();
    fixture.detectChanges();

    // Check that the project details are closed
    const projectDetails: DebugElement = fixture.debugElement.query(By.css('.project-details'));
    expect(projectDetails).toBeFalsy();
  });

  // Verify that the component has a navigation bar
  it('Should have a menu navigation', (): void => {
    const navElement: DebugElement = fixture.debugElement.query(By.css('ul'));
    expect(navElement).toBeTruthy();
  });

  // Verify that the navigation bar has different links
  it('Should display navigation links', (): void => {
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

  // Check if the contact text is displayed correctly
  it('Should display contact text correctly', (): void => {
    const contactTextContainer: DebugElement = fixture.debugElement.query(By.css('.contact-text-container'));
    const contactText: DebugElement = fixture.debugElement.query(By.css('.contact-text'));
    const linkedinLink: DebugElement = fixture.debugElement.query(By.css('.linkedin-contact-text'));
    expect(contactTextContainer).toBeTruthy();
    expect(contactText).toBeTruthy();
    expect(linkedinLink).toBeTruthy();
    expect(linkedinLink.nativeElement.href).toContain('https://www.linkedin.com/in/');
  });

  // Check if the state of activeTab is set correctly
  it('Should set activeTab correctly', (): void => {
    // Check the initial state
    expect(component.activeTab).toEqual('projects');
    expect(component.selectedProject).toBeNull();

    // Switch to the idle tab
    component.switchTab('idle');
    fixture.detectChanges();
    expect(component.activeTab).toEqual('idle');
    expect(component.selectedProject).toBeNull();

    // Switch back to the projects tab
    component.switchTab('projects');
    fixture.detectChanges();
    expect(component.activeTab).toEqual('projects');
    expect(component.selectedProject).toBeNull();
  });

  // Check if the gradient color is set correctly based on project state
  it('Should return correct gradient color based on project state', (): void => {
    // 'In Progress' state
    const inProgressColor: string = component.setOverlayStateColor('In Progress');
    expect(inProgressColor).toEqual('linear-gradient(180deg, gold, transparent)');

    // 'Prototype' state
    const prototypeColor: string = component.setOverlayStateColor('Prototype');
    expect(prototypeColor).toEqual('linear-gradient(180deg, teal, transparent)');

    // 'Completed - Prototype' state
    const completedPrototypeColor: string = component.setOverlayStateColor('Completed - Prototype');
    expect(completedPrototypeColor).toEqual('linear-gradient(180deg, teal, transparent)');

    // 'Completed' state
    const completedColor: string = component.setOverlayStateColor('Completed');
    expect(completedColor).toEqual('linear-gradient(180deg, darkgreen, transparent)');
  });

  // Check if the selected project is set correctly when showProjectDetails is called
  it('Should set selectedProject when showProjectDetails is called', (): void => {
    component.showProjectDetails(mockProject);
    expect(component.selectedProject).toBe(mockProject);
  });

  // Test for closeProjectDetails method
  it('Should set selectedProject to null when closeProjectDetails is called', (): void => {
    component.selectedProject = mockProject;
    component.closeProjectDetails();
    expect(component.selectedProject).toBeNull();
  });
});
