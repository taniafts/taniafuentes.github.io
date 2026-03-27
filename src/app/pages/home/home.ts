import { AfterViewInit, Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Projects } from '../../components/projects/projects';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';
import { Background } from '../../components/background/background';

@Component({
  selector: 'app-home',
  imports: [Background,Navbar, Hero, About, Projects, Contact, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  ngAfterViewInit(): void {

    const reveal = () => {
      const reveals = document.querySelectorAll('.reveal');

      reveals.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', reveal);

    setTimeout(() => {
      reveal();
    }, 100);
  }
}