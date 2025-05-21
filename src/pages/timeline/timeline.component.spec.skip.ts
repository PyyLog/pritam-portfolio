import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';
import { DebugElement } from '@angular/core';
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

describe('TimelineComponent', (): void => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;
  let originalWindowWidth: number;
  let originalWindowHeight: number;
  const mockEvent = {
    id: 1,
    date: new Date(2000, 0, 1),
    title: 'Test Event',
    menuTitle: 'Test Event',
    importance: 'primary',
    type: 'experience',
    dateRange: '01 Jan - 02 Jan',
    location: 'Test Location',
    description: 'Test Description',
    eventDetails: [],
    thumbnailPath: 'favicon.ico',
    illustrationPath: 'favicon.ico',
    illustrationType: 1,
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
      imports: [TimelineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
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

  // Check if the title is displayed correctly
  it('Should have title', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const timelineTitleContainer: DebugElement = fixture.debugElement.query(By.css('.timeline-title-container'));
    const titleCircleElement: DebugElement = fixture.debugElement.query(By.css('.circle'));
    const timelineTitleElement: DebugElement = fixture.debugElement.query(By.css('.timeline-text'));
    const timelineTitle: string = timelineTitleElement.nativeElement.textContent;
    expect(timelineTitleElement).toBeTruthy();
    expect(titleCircleElement).toBeTruthy();
    expect(timelineTitleContainer).toBeTruthy();
    expect(timelineTitle).toContain('Timeline');
  }));

  // Check if the timeline container is displayed correctly
  it('Should have timeline container', (): void => {
    const timelineContainer: DebugElement = fixture.debugElement.query(By.css('.timeline-container'));
    const timelineElement: DebugElement = fixture.debugElement.query(By.css('.timeline'));
    expect(timelineContainer).toBeTruthy();
    expect(timelineElement).toBeTruthy();
  });

  // Check if the timeline events are displayed correctly
  it('Should have timeline events', (): void => {
    const timelineEvents: DebugElement[] = fixture.debugElement.queryAll(By.css('.event-point-container'));
    expect(timelineEvents.length).toBe(component.events.length);
  });

  // Check if the timeline displays primary and secondary events correctly
  it('Should display primary and secondary events with correct elements', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const timelineEvents: DebugElement[] = fixture.debugElement.queryAll(By.css('.timeline-event-container'));
    expect(timelineEvents.length).toBeGreaterThan(0);

    timelineEvents.forEach((event: DebugElement, index: number): void => {
      // Common elements that should be present in all events
      const eventCircle: DebugElement = event.query(By.css('.event-circle'));
      const isLastEvent: boolean = index === timelineEvents.length - 1;
      const line: DebugElement = event.query(By.css('.timeline-line'));
      expect(eventCircle).toBeTruthy();

      if (!isLastEvent) {
        expect(line).toBeTruthy();
      }

      const isPrimary: boolean = event.nativeElement.classList.contains('primary-event');

      if (isPrimary) {
        // Primary events should have date and title
        const date: DebugElement = event.query(By.css('.event-date'));
        const title: DebugElement = event.query(By.css('.event-title'));
        expect(date).toBeTruthy();
        expect(title).toBeTruthy();
        expect(date.nativeElement.textContent.trim()).toBeTruthy();
        expect(title.nativeElement.textContent.trim()).toBeTruthy();
      } else {
        // Secondary events should not have date and title
        const date: DebugElement = event.query(By.css('.event-date'));
        const title: DebugElement = event.query(By.css('.event-title'));
        expect(date).toBeFalsy();
        expect(title).toBeFalsy();
      }
    });
  }));

  // Check if the menu tabs is correctly displayed
  it('Should have menu tabs', fakeAsync((): void => {
    const menuTabsContainer: DebugElement = fixture.debugElement.query(By.css('.menu-tabs-container'));
    const menuContainer: DebugElement = fixture.debugElement.query(By.css('.menu-container'));
    expect(menuTabsContainer).toBeTruthy();
    expect(menuContainer).toBeTruthy();
  }));

  // Check if the event details are displayed correctly after clicking on an event circle
  it('Should display event details on click', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const eventCircles: DebugElement[] = fixture.debugElement.queryAll(By.css('.event-circle'));
    expect(eventCircles.length).toBeGreaterThan(0);

    eventCircles[1].nativeElement.click();
    fixture.detectChanges();

    const eventDetailsContainer: DebugElement = fixture.debugElement.query(By.css('.event-details'));
    expect(eventDetailsContainer).toBeTruthy();
  }));

  // Check if the event details are displayed correctly
  it('Should display event details', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const eventCircles: DebugElement[] = fixture.debugElement.queryAll(By.css('.event-circle'));
    expect(eventCircles.length).toBeGreaterThan(0);

    eventCircles[1].nativeElement.click();
    fixture.detectChanges();

    const eventDetailsContainer: DebugElement = fixture.debugElement.query(By.css('.event-details'));
    expect(eventDetailsContainer).toBeTruthy();

    const closeButtonElement: DebugElement = fixture.debugElement.query(By.css('.close-btn'));
    const eventTitleElement: DebugElement = fixture.debugElement.query(By.css('.event-title'));
    const illustrationContainer: DebugElement = fixture.debugElement.query(By.css('.illustration-container'));
    const locationElement: DebugElement = fixture.debugElement.query(By.css('.location'));
    const dateRangeElement: DebugElement = fixture.debugElement.query(By.css('.date-range'));
    const eventDescriptionElement: DebugElement = fixture.debugElement.query(By.css('.event-description'));
    const descriptionTitleElement: DebugElement = fixture.debugElement.query(By.css('.description-title-text'));
    const eventTasksDetailsElement: DebugElement = fixture.debugElement.query(By.css('.event-tasks-details'));
    const detailsTitleElement: DebugElement = fixture.debugElement.query(By.css('.details-title-text'));
    expect(closeButtonElement).toBeTruthy();
    expect(eventTitleElement).toBeTruthy();
    expect(illustrationContainer).toBeTruthy();
    expect(locationElement).toBeTruthy();
    expect(dateRangeElement).toBeTruthy();
    expect(eventDescriptionElement).toBeTruthy();
    expect(descriptionTitleElement).toBeTruthy();
    expect(eventTasksDetailsElement).toBeTruthy();
    expect(detailsTitleElement).toBeTruthy();
  }));

  // Check if the close button works
  it('Should close event details when close button is clicked', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const eventCircles: DebugElement[] = fixture.debugElement.queryAll(By.css('.event-circle'));
    expect(eventCircles.length).toBeGreaterThan(0);

    eventCircles[1].nativeElement.click();
    fixture.detectChanges();

    const eventDetailsContainer: DebugElement = fixture.debugElement.query(By.css('.event-details'));
    expect(eventDetailsContainer).toBeTruthy();

    // Click on the close button to close event details
    const closeButtonElement: DebugElement = fixture.debugElement.query(By.css('.close-btn'));
    expect(closeButtonElement).toBeTruthy();
    closeButtonElement.nativeElement.click();
    fixture.detectChanges();

    // Check that the event details are closed
    const projectDetails: DebugElement = fixture.debugElement.query(By.css('.event-details'));
    expect(projectDetails).toBeFalsy();
  }));

  // Check if the timeline element are created when calling the setTimelineElementStyles method
  it('Should set correct color and size for circle elements', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    component.setTimelineElementsStyles();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    // Get all timeline event containers
    const timelineEventContainers: DebugElement[] = fixture.debugElement.queryAll(By.css('.timeline-event-container'));
    expect(timelineEventContainers.length).toBeGreaterThan(0);

    // Check each container for properly styled circles
    timelineEventContainers.forEach((container: DebugElement, index: number): void => {
      const event = component.events[index];
      const isPrimary: boolean = event.importance === 'primary';

      if (isPrimary) {
        const primaryCircle: DebugElement = container.query(By.css('.primary-circle'));
        expect(primaryCircle).toBeTruthy();

        // Check size
        expect(primaryCircle.nativeElement.style.width).toBe(`${component.primaryCircleSize}rem`);
        expect(primaryCircle.nativeElement.style.height).toBe(`${component.primaryCircleSize}rem`);

        // Check border color
        const expectedColor: string = component.colorTemplateByType[event.type] || component.colorTemplateByType['base'];
        expect(primaryCircle.nativeElement.style.border).toContain(expectedColor);

        // Check cursor style for clickable events
        if (event.description !== '') {
          expect(primaryCircle.nativeElement.style.cursor).toBe('pointer');
        }
      } else {
        const secondaryCircle: DebugElement = container.query(By.css('.secondary-circle'));
        expect(secondaryCircle).toBeTruthy();

        // Check size
        expect(secondaryCircle.nativeElement.style.width).toBe(`${component.secondaryCircleSize}rem`);
        expect(secondaryCircle.nativeElement.style.height).toBe(`${component.secondaryCircleSize}rem`);

        // Check background
        expect(secondaryCircle.nativeElement.style.background).toBe('white');
      }
    });
  }));

  // Check if the alternative text for the illustration is correctly set
  it('Should have correct alternative text for illustration', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const altText: string = component.getAltTextEventIllustration(mockEvent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(altText).toContain('favicon');
  }));

  // Check if the state showEventDetails method is set correctly
  it('Set the event details correctly', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    component.showEventDetails(mockEvent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.selectedEvent).toEqual(mockEvent);
  }));

  // Test for closeEventDetails method
  it('Should set selectedEvent to null when closeEventDetails is called', fakeAsync((): void => {
    // Set the selectedEvent to a mock event
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    component.showEventDetails(mockEvent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.selectedEvent).toEqual(mockEvent);

    // Call the closeEventDetails method
    component.closeEventDetails();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(component.selectedEvent).toBeNull();
  }));

  // Test to verify if the title and circle don't overflow
  it('Should not overflow - title and circle', fakeAsync((): void => {
    Object.values(VIEWPORTS).forEach((viewport: Viewport): void => {
      resizeViewport(viewport);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const titleCircleElement: DebugElement = fixture.debugElement.query(By.css('.circle'));
      const timelineTitleElement: DebugElement = fixture.debugElement.query(By.css('.timeline-text'));
      expect(titleCircleElement).toBeTruthy();
      expect(timelineTitleElement).toBeTruthy();

      expect(hasOverflow(titleCircleElement.nativeElement)).toBeFalsy();
      expect(hasOverflow(titleCircleElement.nativeElement)).toBeFalsy();
    });
  }));

  // Test to verify if the timeline elements don't overflow
  it('Should not overflow - timeline elements', fakeAsync((): void => {
    Object.values(VIEWPORTS).forEach((viewport: Viewport): void => {
      resizeViewport(viewport);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const eventDateTexts: DebugElement[] = fixture.debugElement.queryAll(By.css('.event-date-text'));
      const eventTitleTexts: DebugElement[] = fixture.debugElement.queryAll(By.css('.event-title-text'));
      expect(eventDateTexts.length).toBeGreaterThan(0);
      expect(eventTitleTexts.length).toBeGreaterThan(0);

      eventDateTexts.forEach((event: DebugElement): void => {
        expect(hasTextOverflow(event.nativeElement)).toBeFalsy();
      });

      eventTitleTexts.forEach((event: DebugElement): void => {
        expect(hasTextOverflow(event.nativeElement)).toBeFalsy();
      });
    });
  }));

  // Test to verify if the menu tabs don't overflow
  it('Should not overflow - menu tabs', fakeAsync((): void => {
    Object.values(VIEWPORTS).forEach((viewport: Viewport): void => {
      resizeViewport(viewport);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const menuTabsContainer: DebugElement = fixture.debugElement.query(By.css('.menu-tabs-container'));
      const menuContainer: DebugElement = fixture.debugElement.query(By.css('.menu-container'));
      expect(menuTabsContainer).toBeTruthy();
      expect(menuContainer).toBeTruthy();
      expect(hasOverflow(menuTabsContainer.nativeElement)).toBeFalsy();
      expect(hasOverflow(menuContainer.nativeElement)).toBeFalsy();
    });
  }));

  // Test to verify if the event details elements don't overflow
  it('Should not overflow - event details', fakeAsync((): void => {
    Object.values(VIEWPORTS).forEach((viewport: Viewport): void => {
      resizeViewport(viewport);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Click on the event circle to show event details
      const eventCircles: DebugElement[] = fixture.debugElement.queryAll(By.css('.event-circle'));
      expect(eventCircles.length).toBeGreaterThan(0);
      eventCircles[1].nativeElement.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const closeButtonElement: DebugElement = fixture.debugElement.query(By.css('.close-btn'));
      const eventTitleElement: DebugElement = fixture.debugElement.query(By.css('.event-title'));
      const illustrationContainer: DebugElement = fixture.debugElement.query(By.css('.illustration-container'));
      const locationElement: DebugElement = fixture.debugElement.query(By.css('.location'));
      const dateRangeElement: DebugElement = fixture.debugElement.query(By.css('.date-range'));
      const eventDescriptionElement: DebugElement = fixture.debugElement.query(By.css('.event-description'));
      const descriptionTitleElement: DebugElement = fixture.debugElement.query(By.css('.description-title-text'));
      const eventTasksDetailsElement: DebugElement = fixture.debugElement.query(By.css('.event-tasks-details'));
      const detailsTitleElement: DebugElement = fixture.debugElement.query(By.css('.details-title-text'));
      expect(closeButtonElement).toBeTruthy();
      expect(eventTitleElement).toBeTruthy();
      expect(illustrationContainer).toBeTruthy();
      expect(locationElement).toBeTruthy();
      expect(dateRangeElement).toBeTruthy();
      expect(eventDescriptionElement).toBeTruthy();
      expect(descriptionTitleElement).toBeTruthy();
      expect(eventTasksDetailsElement).toBeTruthy();
      expect(detailsTitleElement).toBeTruthy();

      expect(hasOverflow(closeButtonElement.nativeElement)).toBeFalsy();
      expect(hasOverflow(eventTitleElement.nativeElement)).toBeFalsy();
      expect(hasOverflow(illustrationContainer.nativeElement)).toBeFalsy();
      expect(hasOverflow(locationElement.nativeElement)).toBeFalsy();
      expect(hasOverflow(dateRangeElement.nativeElement)).toBeFalsy();
      expect(hasOverflow(eventDescriptionElement.nativeElement)).toBeFalsy();
      expect(hasOverflow(descriptionTitleElement.nativeElement)).toBeFalsy();
      expect(hasOverflow(eventTasksDetailsElement.nativeElement)).toBeFalsy();
      expect(hasOverflow(detailsTitleElement.nativeElement)).toBeFalsy();
    });
  }));
});
