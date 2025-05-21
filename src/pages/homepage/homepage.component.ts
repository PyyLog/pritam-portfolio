import { Component, ElementRef, Renderer2, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { Project } from '../../models/homepage.model';
import { PROJECTS_DESCRIPTION } from '../../data/projects';
import { LINKS } from '../../data/links';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit, AfterViewInit {
  illustrationPicture = 'pictures/landscape-at-twilight-van-gogh.png';
  activeTab: 'projects' | 'idle' = 'projects';
  selectedProject: Project | null = null;
  projects: Project[] = PROJECTS_DESCRIPTION;
  links = LINKS;
  activeProjectIndex: number | null = null;
  isMobileOrTablet = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  @ViewChild('homepageContentContainer') homepageContentContainer!: ElementRef;
  @ViewChild('navigation') navigation!: ElementRef;

  ngOnInit(): void {
    this.checkDeviceType();
    this.setPointerEventsStyle();
  }

  ngAfterViewInit(): void {
    gsap.from(this.homepageContentContainer.nativeElement, {
      opacity: 0,
      x: -50,
      duration: 0.75,
      ease: 'power2.inOut.out',
    });

    gsap.from(this.navigation.nativeElement.children, {
      opacity: 0,
      x: 50,
      stagger: 0.15,
      delay: 0.25,
      ease: 'power2.inOut.out',
    });
  }

  switchTab(tab: 'idle' | 'projects'): void {
    this.activeTab = tab;
    this.selectedProject = null;
    this.activeProjectIndex = null;
  }

  setOverlayStateColor(state: string): string {
    if (state === 'In Progress') {
      return 'linear-gradient(180deg, gold, transparent)';
    } else if (state === 'Prototype' || state === 'Completed - Prototype') {
      return 'linear-gradient(180deg, teal, transparent)';
    } else if (state === 'Completed') {
      return 'linear-gradient(180deg, darkgreen, transparent)';
    } else {
      return 'linear-gradient(180deg, darkgray, transparent)';
    }
  }

  showProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.activeProjectIndex = null;
  }

  closeProjectDetails(): void {
    this.selectedProject = null;
  }

  toggleContactText(event: Event): void {
    const contactTextContainer: Element | null = (event.target as HTMLElement).nextElementSibling;

    if (contactTextContainer) {
      if (contactTextContainer.classList.contains('active')) {
        gsap.to(contactTextContainer, {
          opacity: 0,
          visibility: 'hidden',
          duration: 0.1,
          ease: 'power2.inOut.out',
          onComplete: (): void => {
            this.renderer.removeClass(contactTextContainer, 'active');
          },
        });
      } else {
        gsap.to(contactTextContainer, {
          opacity: 1,
          visibility: 'visible',
          duration: 0.1,
          ease: 'power2.inOut.out',
          onComplete: (): void => {
            this.renderer.addClass(contactTextContainer, 'active');
          },
        });
      }
    }
  }

  // Functions for mobile size logic handling
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkDeviceType();
  }

  private checkDeviceType(): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    this.isMobileOrTablet = (width <= 768 && height <= 1024) || (width <= 1024 && height <= 768);
  }

  handleProjectElementClick(event: Event, index: number): void {
    if (this.isMobileOrTablet) {
      event.preventDefault();
      event.stopPropagation();

      // Toggle the active project index
      if (this.activeProjectIndex === index) {
        this.activeProjectIndex = null;
      } else {
        this.activeProjectIndex = index;
      }
    }
  }

  isProjectActive(index: number): boolean {
    return this.activeProjectIndex === index;
  }

  setPointerEventsStyle(): void {
    const projectOverlayElements: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.project-overlay');

    projectOverlayElements.forEach((projectOverlay: HTMLElement): void => {
      if (this.isMobileOrTablet) {
        this.renderer.setStyle(projectOverlay, 'pointer-events', 'none');
      } else {
        this.renderer.setStyle(projectOverlay, 'pointer-events', 'auto');
      }
    });
  }
}
