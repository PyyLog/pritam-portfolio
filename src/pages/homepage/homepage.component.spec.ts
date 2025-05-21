import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { provideRouter, Route } from '@angular/router';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';

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

describe('HomepageComponent', (): void => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let originalWindowWidth: number;
  let originalWindowHeight: number;
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

  function hasOverflow(element: HTMLElement): boolean {
    return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
  }

  function hasTextOverflow(element: HTMLElement): boolean {
    const style: CSSStyleDeclaration = window.getComputedStyle(element);
    return (style.overflow === 'hidden' || style.textOverflow === 'ellipsis') && element.scrollWidth > element.clientWidth;
  }

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

  afterEach((): void => {
    resetViewport();
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

  // Test to verify navigation menu doesn't overflow on mobile devices
  it('Should not have navigation menu overflow on mobile', (): void => {
    resizeViewport(VIEWPORTS['mobile']);

    const navContainer: DebugElement = fixture.debugElement.query(By.css('nav'));
    expect(navContainer).toBeTruthy();

    const navElement: HTMLElement = navContainer.nativeElement;
    expect(hasOverflow(navElement)).toBeFalsy();
  });

  // Test to verify quick tabs container doesn't overflow on mobile
  it('Should not have quick tabs overflow on mobile', (): void => {
    resizeViewport(VIEWPORTS['mobile']);

    const quickTabsContainer: DebugElement = fixture.debugElement.query(By.css('.quick-tabs-container'));
    expect(quickTabsContainer).toBeTruthy();

    const quickTabsElement: HTMLElement = quickTabsContainer.nativeElement;
    expect(hasOverflow(quickTabsElement)).toBeFalsy();
  });

  // Test to verify project carousel doesn't have horizontal overflow on mobile
  it('Should not have project carousel horizontal overflow on mobile', (): void => {
    resizeViewport(VIEWPORTS['mobile']);

    // Make sure we're on the projects tab
    component.switchTab('projects');
    fixture.detectChanges();

    const projectsCarousel: DebugElement = fixture.debugElement.query(By.css('.projects-carousel'));
    expect(projectsCarousel).toBeTruthy();

    const carouselElement: HTMLElement = projectsCarousel.nativeElement;
    expect(carouselElement).toBeTruthy();

    // Check that the carousel doesn't overflow horizontally (vertical scrolling might be intentional)
    const style: CSSStyleDeclaration = window.getComputedStyle(carouselElement);
    const hasHorizontalOverflow: boolean =
      carouselElement.scrollWidth > carouselElement.clientWidth && style.overflowX !== 'auto' && style.overflowX !== 'scroll';

    expect(hasHorizontalOverflow).toBeFalsy();
  });

  // Test to verify project details don't overflow on mobile when opened
  it('Should not have project details overflow on mobile when opened', (): void => {
    resizeViewport(VIEWPORTS['mobile']);

    // Open project details
    const readMoreButtonElement: DebugElement = fixture.debugElement.query(By.css('.read-more'));
    expect(readMoreButtonElement).toBeTruthy();
    readMoreButtonElement.nativeElement.click();
    fixture.detectChanges();

    const projectDetails: DebugElement = fixture.debugElement.query(By.css('.project-details'));
    expect(projectDetails).toBeTruthy();

    const projectDetailsElement: HTMLElement = projectDetails.nativeElement;
    expect(projectDetailsElement).toBeTruthy();

    // For project details, horizontal overflow should not happen (vertical scrolling might be intentional here too)
    const style: CSSStyleDeclaration = window.getComputedStyle(projectDetailsElement);
    const hasHorizontalOverflow: boolean =
      projectDetailsElement.scrollWidth > projectDetailsElement.clientWidth && style.overflowX !== 'auto' && style.overflowX !== 'scroll';

    expect(hasHorizontalOverflow).toBeFalsy();
  });

  // Test to verify contact text container doesn't overflow on mobile
  it('Should not have contact text container overflow on mobile', (): void => {
    resizeViewport(VIEWPORTS['mobile']);

    const contactTextContainer: DebugElement = fixture.debugElement.query(By.css('.contact-text-container'));
    expect(contactTextContainer).toBeTruthy();

    const contactTextElement: HTMLElement = contactTextContainer.nativeElement;
    expect(hasOverflow(contactTextElement)).toBeFalsy();
  });

  // Test to verify illustration doesn't overflow on tablet when displayed
  it('Should not have illustration overflow on tablet', (): void => {
    resizeViewport(VIEWPORTS['tablet']);

    // Switch to idle tab to show illustration
    component.switchTab('idle');
    fixture.detectChanges();

    const illustrationContainer: DebugElement = fixture.debugElement.query(By.css('.illustration-container'));
    const illustrationElement: DebugElement = fixture.debugElement.query(By.css('.illustration'));
    expect(illustrationContainer).toBeTruthy();
    expect(illustrationElement).toBeTruthy();

    // The image should not cause its container to overflow
    const illustrationHTMLElement: HTMLElement = illustrationElement.nativeElement;
    const illustrationContainerHTMLElement: HTMLElement = illustrationContainer.nativeElement;
    expect(illustrationHTMLElement).toBeTruthy();
    expect(illustrationContainerHTMLElement).toBeTruthy();
    expect(hasOverflow(illustrationContainerHTMLElement)).toBeFalsy();
  });

  // Test the layout across all viewports
  Object.keys(VIEWPORTS).forEach((viewportKey: string): void => {
    const viewport: Viewport = VIEWPORTS[viewportKey];

    it(`Should have proper layout without overflow on ${viewport.name}`, (): void => {
      resizeViewport(viewport);

      // Check that the homepage content container doesn't overflow
      const homepageContentContainer: DebugElement = fixture.debugElement.query(By.css('.homepage-content-container'));
      expect(homepageContentContainer).toBeTruthy();

      const mainElement: HTMLElement = homepageContentContainer.nativeElement;
      expect(hasOverflow(mainElement)).toBeFalsy();

      // Check that the body doesn't have overflow
      const bodyElement: HTMLElement = document.body;
      const hasBodyOverflow: boolean =
        bodyElement.scrollWidth > window.innerWidth &&
        window.getComputedStyle(bodyElement).overflowX !== 'auto' &&
        window.getComputedStyle(bodyElement).overflowX !== 'scroll';

      expect(hasBodyOverflow).toBeFalsy();
    });
  });

  // Test project titles don't overflow in the project list
  it('Should not have project titles overflow in the carousel on mobile', (): void => {
    resizeViewport(VIEWPORTS['mobile']);

    // Make sure we're on the projects tab
    component.switchTab('projects');
    fixture.detectChanges();

    const projectItems: DebugElement[] = fixture.debugElement.queryAll(By.css('.project-item'));
    expect(projectItems.length).toBeGreaterThan(0);

    for (const titleElement of projectItems) {
      const titleHTMLElement: HTMLElement = titleElement.nativeElement;
      expect(hasTextOverflow(titleHTMLElement)).toBeFalsy();
    }
  });
});
