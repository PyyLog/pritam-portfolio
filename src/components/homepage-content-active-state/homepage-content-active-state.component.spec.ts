import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageContentActiveStateComponent } from './homepage-content-active-state.component';

describe('HomepageContentActiveStateComponent', () => {
  let component: HomepageContentActiveStateComponent;
  let fixture: ComponentFixture<HomepageContentActiveStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageContentActiveStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageContentActiveStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
