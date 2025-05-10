import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AboutMeComponent } from './about-me.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AboutMeComponent', (): void => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [AboutMeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
