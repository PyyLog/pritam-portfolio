import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AboutMeComponent } from './about-me.component';
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

describe('AboutMeComponent', (): void => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;
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

  function hasOverflow(element: HTMLElement): boolean {
    return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
  }

  function hasTextOverflow(element: HTMLElement): boolean {
    const style: CSSStyleDeclaration = window.getComputedStyle(element);
    return (style.overflow === 'hidden' || style.textOverflow === 'ellipsis') && element.scrollWidth > element.clientWidth;
  }

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AboutMeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
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

    const aboutMeTitleContainer: DebugElement = fixture.debugElement.query(By.css('.about-me-title-container'));
    const titleCircleElement: DebugElement = fixture.debugElement.query(By.css('.circle'));
    const aboutMeTitleElement: DebugElement = fixture.debugElement.query(By.css('.about-me-text'));
    const aboutMeTitle: string = aboutMeTitleElement.nativeElement.textContent;
    expect(aboutMeTitleElement).toBeTruthy();
    expect(titleCircleElement).toBeTruthy();
    expect(aboutMeTitleContainer).toBeTruthy();
    expect(aboutMeTitle).toContain('About Me');
  }));

  // Check if the picture is displayed correctly
  it('Should have picture', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const pictureContainer: DebugElement = fixture.debugElement.query(By.css('.pritam-picture-container'));
    const pictureElement: DebugElement = fixture.debugElement.query(By.css('.pritam-picture'));
    const picture: string = pictureElement.nativeElement.src;
    expect(pictureContainer).toBeTruthy();
    expect(pictureElement).toBeTruthy();
    expect(picture).toContain('pritam-picture.png');
  }));

  // Check if the introducing part is displayed correctly
  it('Should have introducing part', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const introducingTextContainer: DebugElement = fixture.debugElement.query(By.css('.introducing-text-container'));
    expect(introducingTextContainer).toBeTruthy();
  }));

  // Check if the introducing text is displayed correctly
  it('Should have introducing part', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const introducingTextElement: DebugElement = fixture.debugElement.query(By.css('.introducing-text'));
    expect(introducingTextElement).toBeTruthy();
  }));

  // Check if the skills are displayed correctly
  it('Should have skills', fakeAsync((): void => {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const skillsContainer: DebugElement = fixture.debugElement.query(By.css('.skills-carousel-container'));
    const skillsElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.skill-item'));
    expect(skillsContainer).toBeTruthy();
    expect(skillsElements.length).toBe(component.skills.length);
  }));

  // Check if the title and circle don't overflow
  it('Should not overflow - title and circle', fakeAsync((): void => {
    Object.values(VIEWPORTS).forEach((viewport: Viewport): void => {
      resizeViewport(viewport);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const titleCircleElement: DebugElement = fixture.debugElement.query(By.css('.circle'));
      const aboutMeTitleElement: DebugElement = fixture.debugElement.query(By.css('.about-me-text'));
      expect(titleCircleElement).toBeTruthy();
      expect(aboutMeTitleElement).toBeTruthy();

      expect(hasOverflow(titleCircleElement.nativeElement)).toBeFalsy();
      expect(hasTextOverflow(aboutMeTitleElement.nativeElement)).toBeFalsy();
    });
  }));

  // Check if the picture doesn't overflow
  it('Should not overflow - picture', fakeAsync((): void => {
    Object.values(VIEWPORTS).forEach((viewport: Viewport): void => {
      resizeViewport(viewport);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const pictureElement: DebugElement = fixture.debugElement.query(By.css('.pritam-picture'));
      expect(pictureElement).toBeTruthy();

      expect(hasOverflow(pictureElement.nativeElement)).toBeFalsy();
    });
  }));

  // Check if the introduction text doesn't overflow
  it('Should not overflow - introduction text', fakeAsync((): void => {
    Object.values(VIEWPORTS).forEach((viewport: Viewport): void => {
      resizeViewport(viewport);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const introductionTextTitleElement: DebugElement = fixture.debugElement.query(By.css('.introducing-text-title'));
      const introductionTextElement: DebugElement = fixture.debugElement.query(By.css('.introducing-text'));
      expect(introductionTextTitleElement).toBeTruthy();
      expect(introductionTextElement).toBeTruthy();

      expect(hasTextOverflow(introductionTextTitleElement.nativeElement)).toBeFalsy();
      expect(hasTextOverflow(introductionTextElement.nativeElement)).toBeFalsy();
    });
  }));

  // Check if the skills carousel elements doesn't overflow
  it('Should not overflow - carousel', fakeAsync((): void => {
    Object.values(VIEWPORTS).forEach((viewport: Viewport): void => {
      resizeViewport(viewport);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const skillsCarouselTitleElement: DebugElement = fixture.debugElement.query(By.css('.skills-carousel-title'));
      const skillsCarouselItemImageElement: DebugElement = fixture.debugElement.query(By.css('.skill-item img'));
      const skillsCarouselItemOverlayTitleElement: DebugElement = fixture.debugElement.query(By.css('.skill-overlay h3'));
      const skillsCarouselItemOverlayTextElement: DebugElement = fixture.debugElement.query(By.css('.skill-overlay p'));
      expect(skillsCarouselTitleElement).toBeTruthy();
      expect(skillsCarouselItemImageElement).toBeTruthy();
      expect(skillsCarouselItemOverlayTitleElement).toBeTruthy();
      expect(skillsCarouselItemOverlayTextElement).toBeTruthy();

      expect(hasTextOverflow(skillsCarouselTitleElement.nativeElement)).toBeFalsy();
      expect(hasOverflow(skillsCarouselItemImageElement.nativeElement)).toBeFalsy();
      expect(hasTextOverflow(skillsCarouselItemOverlayTitleElement.nativeElement)).toBeFalsy();
      expect(hasTextOverflow(skillsCarouselItemOverlayTextElement.nativeElement)).toBeFalsy();
    });
  }));
});
