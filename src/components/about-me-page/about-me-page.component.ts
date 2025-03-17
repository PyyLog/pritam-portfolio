import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { SKILLS } from '../../data/skills';

interface Skills {
  name: string;
  level: string;
  thumbnail: string;
}

@Component({
  selector: 'app-about-me-page',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './about-me-page.component.html',
  styleUrls: ['./about-me-page.component.scss'],
})
export class AboutMePageComponent {
  pritamPicture = 'pictures/pritam-picture.png';
  skillsDetails = SKILLS;
  skills: Skills[] = [
    this.skillsDetails[0],
    this.skillsDetails[1],
    this.skillsDetails[2],
    this.skillsDetails[3],
    this.skillsDetails[4],
    this.skillsDetails[5],
    this.skillsDetails[6],
    this.skillsDetails[7],
    this.skillsDetails[8],
    this.skillsDetails[9],
    this.skillsDetails[10],
    this.skillsDetails[11],
    this.skillsDetails[12],
    this.skillsDetails[13],
    this.skillsDetails[14],
    this.skillsDetails[15],
    this.skillsDetails[16],
    this.skillsDetails[17],
  ];
}
