import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  isScrolled = false;
  activeSection = '';

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollY = window.scrollY;

    this.isScrolled = scrollY > 50;

    const sections = ['about', 'projects', 'contact'];

    for (let section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop - 100;
        const height = element.offsetHeight;

        if (scrollY >= top && scrollY < top + height) {
          this.activeSection = section;
        }
      }
    }
  }
}