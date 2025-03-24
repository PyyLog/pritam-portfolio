import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-chronology-page',
  standalone: true,
  imports: [],
  templateUrl: './chronology-page.component.html',
  styleUrl: './chronology-page.component.scss',
})
export class ChronologyPageComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.generateChronology(10);
  }

  generateChronology(events: number) {
    const chronologyContainer: ElementRef = this.el.nativeElement.querySelector('.chronology');
    if (!chronologyContainer) {
      console.error('Chronology container not found');
      return;
    }
    for (let i = 0; i < events; i++) {
      const chronologySegment: Renderer2 = this.renderer.createElement('div');
      this.renderer.addClass(chronologySegment, 'chronology-segment');
      this.renderer.setStyle(chronologySegment, 'flex-direction', 'row');
      const chronologyLine: Renderer2 = this.renderer.createElement('div');
      this.renderer.addClass(chronologyLine, 'chronology-line');
      this.renderer.setStyle(chronologyLine, 'width', '10rem');
      const chronologyCircle: Renderer2 = this.renderer.createElement('div');
      this.renderer.addClass(chronologyCircle, 'chronology-circle');
      this.renderer.setStyle(chronologyCircle, 'width', '3rem');
      this.renderer.setStyle(chronologyCircle, 'height', '3rem');
      this.renderer.appendChild(chronologySegment, chronologyLine);
      this.renderer.appendChild(chronologySegment, chronologyCircle);
      this.renderer.appendChild(chronologyContainer, chronologySegment);
    }
  }
}
