import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologyPageComponent } from './chronology-page.component';

describe('ChronologyPageComponent', () => {
  let component: ChronologyPageComponent;
  let fixture: ComponentFixture<ChronologyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChronologyPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChronologyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
