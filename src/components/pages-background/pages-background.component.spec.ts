import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesBackgroundComponent } from './pages-background.component';

describe('PagesBackgroundComponent', () => {
  let component: PagesBackgroundComponent;
  let fixture: ComponentFixture<PagesBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesBackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
