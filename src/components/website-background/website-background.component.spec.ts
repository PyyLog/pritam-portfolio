import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WebsiteBackgroundComponent } from './website-background.component';
import { DebugElement } from '@angular/core';

describe('WebsiteBackgroundComponent', (): void => {
  let component: WebsiteBackgroundComponent;
  let fixture: ComponentFixture<WebsiteBackgroundComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [WebsiteBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebsiteBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test that the component is created successfully
  it('Should create', (): void => {
    expect(component).toBeTruthy();
  });

  // Test if shooting stars rows are created correctly
  it('Should create correct number of shooting star rows', (): void => {
    const numRows = 10;
    const rows: DebugElement[] = fixture.debugElement.queryAll(By.css('.shooting-stars-row'));
    expect(rows.length).toBe(numRows);
  });

  // Verify if shooting stars are created correctly in each row
  it('Should create correct number of shooting stars in each row', (): void => {
    const numCols = 10;
    const rows: DebugElement[] = fixture.debugElement.queryAll(By.css('.shooting-stars-row'));
    rows.forEach(row => {
      const stars: DebugElement[] = row.queryAll(By.css('.shooting-star'));
      expect(stars.length).toBe(numCols);
    });
  });

  // Test if shooting stars have the correct styles
  it('Should apply random color to shooting stars', (): void => {
    const stars: DebugElement[] = fixture.debugElement.queryAll(By.css('.shooting-star'));
    stars.forEach(star => {
      const style: string = star.nativeElement.style.background;
      expect(style).toMatch(/linear-gradient\(90deg, (blue|red|purple|orange|cyan), transparent\)/);
    });
  });

  // Test error handling when background container is not found
  it('Should handle missing background container', (): void => {
    const errorSpy = spyOn(console, 'error');

    // Remove the background container before calling the function
    const el: HTMLElement = fixture.debugElement.nativeElement;
    const container: HTMLElement | null = el.querySelector('.background-container');
    if (!container) return;
    container.parentNode?.removeChild(container);

    component.generateBackgroundShootingStars(2, 2);
    expect(errorSpy).toHaveBeenCalledWith('Background container not found');
  });
});
