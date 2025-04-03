import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-pages-background',
  standalone: true,
  imports: [],
  templateUrl: './pages-background.component.html',
  styleUrl: './pages-background.component.scss',
})
export class PagesBackgroundComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit() {
    this.generateBackgroundShootingStars(6, 4);
  }

  generateBackgroundShootingStars(row: number, col: number) {
    const backgroundContainer: ElementRef = this.el.nativeElement.querySelector('.background-container');
    if (!backgroundContainer) {
      console.error('Background container not found');
      return;
    }
    const colors = ['blue', 'red', 'purple', 'orange', 'cyan'];
    for (let i = 0; i < row; i++) {
      const shootingStarsRow: Renderer2 = this.renderer.createElement('div');
      this.renderer.addClass(shootingStarsRow, 'shooting-stars-row');
      for (let j = 0; j < col; j++) {
        const shootingStar: Renderer2 = this.renderer.createElement('div');
        const randomColor: string = colors[Math.floor(Math.random() * colors.length)];
        this.renderer.addClass(shootingStar, 'shooting-star');
        this.renderer.setStyle(shootingStar, 'background', `linear-gradient(90deg, ${randomColor}, transparent)`);
        this.renderer.appendChild(shootingStarsRow, shootingStar);
      }
      this.renderer.appendChild(backgroundContainer, shootingStarsRow);
    }
  }
}
