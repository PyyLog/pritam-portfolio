import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { NgForOf } from '@angular/common';
import { SKILLS } from '../../data/skills';
import { Skills } from '../../models/about-me.model';
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
  isMobileOrTablet = false;
  activeSkillIndex: number | null = null;

  @ViewChild('titleCircle') titleCircle!: ElementRef;
  @ViewChild('titleText') titleText!: ElementRef;
  @ViewChild('pictureContainer') pictureContainer!: ElementRef;
  @ViewChild('introducingTextContainer') introducingTextContainer!: ElementRef;
  @ViewChild('skillsCarouselContainer') skillsCarouselContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.checkDeviceType();
    this.setEntryAnimations();
  }

  setEntryAnimations(): void {
    const windowWidth: number = window.innerWidth;
    const windowHeight: number = window.innerHeight;

    if (((windowWidth >= 320 && windowWidth < 768) || (windowWidth >= 768 && windowWidth < 1280)) && windowWidth < windowHeight) {
      gsap.from(this.titleCircle.nativeElement, {
        opacity: 0,
        y: -50,
        duration: 0.75,
        ease: 'power2.inOut.out',
      });

      gsap.from(this.titleText.nativeElement, {
        opacity: 0,
        y: -35,
        duration: 0.75,
        delay: 0.5,
        ease: 'power2.inOut.out',
      });

      gsap.from(this.pictureContainer.nativeElement, {
        opacity: 0,
        y: 35,
        duration: 0.75,
        delay: 0.65,
        ease: 'power2.inOut.out',
      });

      gsap.from(this.introducingTextContainer.nativeElement, {
        opacity: 0,
        y: 35,
        duration: 0.75,
        delay: 0.65,
        ease: 'power2.inOut.out',
      });

      gsap.from(this.skillsCarouselContainer.nativeElement, {
        opacity: 0,
        y: 35,
        duration: 0.75,
        delay: 0.65,
        ease: 'power2.inOut.out',
      });
    } else {
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

      gsap.from(this.skillsCarouselContainer.nativeElement, {
        opacity: 0,
        x: 35,
        duration: 0.75,
        delay: 0.65,
        ease: 'power2.inOut.out',
      });
    }
  }

  private checkDeviceType(): void {
    const windowWidth: number = window.innerWidth;
    const windowHeight: number = window.innerHeight;

    this.isMobileOrTablet = ((windowWidth >= 320 && windowWidth < 768) || (windowWidth >= 768 && windowWidth < 1280)) && windowWidth < windowHeight;
  }

  isSkillActive(index: number): boolean {
    return this.activeSkillIndex === index;
  }

  toggleSkillOverlay(index: number, event: Event): void {
    event.stopPropagation();

    if (this.activeSkillIndex === index) {
      this.activeSkillIndex = null;
    } else {
      this.activeSkillIndex = index;
    }
  }

  // Hide overlay when clicking elsewhere
  @HostListener('document:click')
  onDocumentClick(): void {
    this.activeSkillIndex = null;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkDeviceType();
  }
}
