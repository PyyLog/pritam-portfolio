import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify that the component is created successfully
  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify that the footer text is displayed correctly
  it('Should have the footer text', () => {
    const footerTextElement: DebugElement = fixture.debugElement.query(By.css('.copyright-text'));
    const footerText: string = footerTextElement.nativeElement.textContent;

    expect(footerText).toEqual('© Pritam Kantane 2025 - All rights reserved');
  });
});
