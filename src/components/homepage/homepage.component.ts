import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PROJECTS_DESCRIPTION } from '../../data/projects';

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
export class HomepageComponent {
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
}
