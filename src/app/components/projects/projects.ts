import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Project {
  title: string;
  description: string;
  images?: string[];
  video?: SafeResourceUrl;
  technologies: string[];
  link?: string;
  linkText?: string;
  reverse?: boolean;
  currentIndex: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
})
export class Projects implements OnInit {

  constructor(private sanitizer: DomSanitizer) {}

  projects: Project[] = [];

  ngOnInit() {
    this.projects = [
      {
        title: 'Tetris - Power Pages',
        description: 'Built an interactive web experience using JavaScript, integrated with Power Pages through external navigation, focusing on UI design and game logic.',
        images: [
          'assets/img/tetris-1.png',
          'assets/img/tetris-2.png',
          'assets/img/tetris-3.png',
          'assets/img/tetris-4.png',
          'assets/img/tetris-5.png'
        ],
        technologies: [
          'assets/icons/powerpages.png',
          'assets/icons/javascript.png'
        ],
        link: 'https://taniafts.github.io/Tetris-Pastel/',
        linkText: 'Play TETRIS! →',
        reverse: false,
        currentIndex: 0
      },
      {
        title: 'Pokedex App',
        description: 'Built a Power Apps application that consumes external REST APIs to dynamically display Pokémon data. Includes filtering, pagination and Power Automate integration.',
        video: this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube.com/embed/nNe4HxMgejc'
        ),
        technologies: [
          'assets/icons/powerapps.png',
          'assets/icons/powerautomate.png',
          'assets/icons/restAPI.png'
        ],
        link: 'https://github.com/taniafts/powerapps-pokedex',
        linkText: 'View Code →',
        reverse: true,
        currentIndex: 0
      },
      {
        title: 'Point of Sale - School Cafeteria',
        description: 'Early project built to manage orders. Includes product selection, order tracking, and workflow handling for daily operations.',
        images: [
          'assets/img/cafe-6.png',
          'assets/img/cafe-1.jpeg',
          'assets/img/cafe-2.jpeg',
          'assets/img/cafe-3.jpeg',
          'assets/img/cafe-4.jpeg',
          'assets/img/cafe-5.jpeg'
        ],
        technologies: [
          'assets/icons/powerapps.png',
          'assets/icons/sharepoint.png',
          'assets/icons/office365.png'
        ],
        link: 'https://github.com/taniafts/powerapps-rapiHalcon',
        linkText: 'View Project →',
        reverse: false,
        currentIndex: 0
      }
    ];
  }

  // 👇 AQUÍ VAN (fuera de ngOnInit)

  next(project: Project) {
    if (!project.images) return;

    project.currentIndex =
      (project.currentIndex + 1) % project.images.length;
  }

  prev(project: Project) {
    if (!project.images) return;

    project.currentIndex =
      (project.currentIndex - 1 + project.images.length) % project.images.length;
  }
}