import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-website-background',
  standalone: true,
  imports: [],
  templateUrl: './website-background.component.html',
  styleUrl: './website-background.component.scss',
})
export class WebsiteBackgroundComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.generateBackgroundShootingStars(10, 10);
  }

  generateBackgroundShootingStars(row: number, col: number) {
    const backgroundContainer: ElementRef = this.el.nativeElement.querySelector('.background-container');
    const colors: string[] = ['blue', 'red', 'purple', 'orange', 'cyan'];

    if (!backgroundContainer) {
      console.error('Background container not found');
      return;
    }

    for (let i = 0; i < row; i++) {
      const shootingStarsRow: Renderer2 = this.renderer.createElement('div');
      this.renderer.addClass(shootingStarsRow, 'shooting-stars-row');

      for (let j = 0; j < col; j++) {
        const shootingStarContainer: Renderer2 = this.renderer.createElement('div');
        const shootingStar: Renderer2 = this.renderer.createElement('div');
        const randomColor: string = colors[Math.floor(Math.random() * colors.length)];
        this.renderer.addClass(shootingStarContainer, 'shooting-star-container');
        this.renderer.addClass(shootingStar, 'shooting-star');
        this.renderer.setStyle(shootingStar, 'background', `linear-gradient(90deg, ${randomColor}, transparent)`);
        this.renderer.appendChild(shootingStarContainer, shootingStar);
        this.renderer.appendChild(shootingStarsRow, shootingStarContainer);
      }

      this.renderer.appendChild(backgroundContainer, shootingStarsRow);
    }
  }
}
