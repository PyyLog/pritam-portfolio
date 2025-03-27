import { Component, ElementRef, Renderer2, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { PROJECTS_DESCRIPTION } from '../../data/projects';
import { LINKS } from '../../data/links';

interface taskDetails {
  title: string;
  points: string[];
}

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  context: string;
  tasksDetails: taskDetails[];
  technologies: string[];
  thumbnail: string;
  illustration: string;
  spanNames: string[];
  pathToCodes: string[];
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements AfterViewInit {
  illustrationPicture = 'pictures/landscape-at-twilight-van-gogh.png';
  activeTab: 'projects' | 'idle' = 'projects';
  selectedProject: Project | null = null;
  projectsDescription = PROJECTS_DESCRIPTION;
  projects: Project[] = [
    this.projectsDescription[0],
    this.projectsDescription[1],
    this.projectsDescription[2],
    this.projectsDescription[3],
    this.projectsDescription[4],
    this.projectsDescription[5],
  ];
  links = LINKS;
  constructor(private renderer: Renderer2) {}
  @ViewChild('homepageContentContainer', { static: true }) homepageContentContainer!: ElementRef;
  @ViewChild('navigation', { static: true }) navigation!: ElementRef;

  ngAfterViewInit() {
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

  switchTab(tab: 'idle' | 'projects') {
    this.activeTab = tab;
    this.selectedProject = null;
  }

  showProjectDetails(project: Project): void {
    this.selectedProject = project;
  }

  closeProjectDetails(): void {
    this.selectedProject = null;
  }

  toggleContactText(event: Event): void {
    const contactTextContainer = (event.target as HTMLElement).nextElementSibling;
    if (contactTextContainer) {
      if (contactTextContainer.classList.contains('active')) {
        this.renderer.removeClass(contactTextContainer, 'active');
      } else {
        this.renderer.addClass(contactTextContainer, 'active');
      }
    }
  }
}
