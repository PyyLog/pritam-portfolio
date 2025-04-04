import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { SKILLS } from '../../data/skills';
import { Skills } from '../../models/about-me-page.model';
import gsap from 'gsap';

@Component({
  selector: 'app-about-me-page',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements AfterViewInit {
  pritamPicture = 'pictures/pritam-picture.png';
  skills: Skills[] = SKILLS;

  @ViewChild('titleCircle') titleCircle!: ElementRef;
  @ViewChild('titleText') titleText!: ElementRef;
  @ViewChild('pictureContainer') pictureContainer!: ElementRef;
  @ViewChild('introducingTextContainer') introducingTextContainer!: ElementRef;

  ngAfterViewInit() {
    gsap.from(this.titleCircle.nativeElement, {
      opacity: 0,
      x: -50,
      duration: 0.75,
      ease: 'power2.inOut.out',
    });

    gsap.from(this.titleText.nativeElement, {
      opacity: 0,
      x: -65,
      duration: 0.75,
      delay: 0.5,
      ease: 'power2.inOut.out',
    });

    gsap.from(this.pictureContainer.nativeElement, {
      opacity: 0,
      x: 35,
      duration: 0.75,
      delay: 0.65,
      ease: 'power2.inOut.out',
    });

    gsap.from(this.introducingTextContainer.nativeElement, {
      opacity: 0,
      x: 35,
      duration: 0.75,
      delay: 0.65,
      ease: 'power2.inOut.out',
    });
  }
}
