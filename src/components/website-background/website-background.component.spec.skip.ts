import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteBackgroundComponent } from './website-background.component';

describe('WebsiteBackgroundComponent', () => {
  let component: WebsiteBackgroundComponent;
  let fixture: ComponentFixture<WebsiteBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WebsiteBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
