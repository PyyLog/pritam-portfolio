import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentBackgroundComponent } from './main-content-background.component';

describe('MainContentBackgroundComponent', () => {
  let component: MainContentBackgroundComponent;
  let fixture: ComponentFixture<MainContentBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContentBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
