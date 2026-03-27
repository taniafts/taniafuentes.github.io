import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-background',
  standalone: true,
  templateUrl: './background.html',
  styleUrl: './background.css'
})
export class Background implements AfterViewInit {

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const c = canvas.getContext('2d')!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let n_stars = 150;
    let colors = [
      '#00ffc8',
      '#5fffe0',
      '#7fffd4',
      '#00e6b8'
    ];

    for (let i = 0; i < 98; i++) {
      colors.push('#fff');
    }

    const randomInt = (max: number, min: number) =>
      Math.floor(Math.random() * (max - min) + min);

    let bg = c.createRadialGradient(
      canvas.width / 2,
      canvas.height * 3,
      canvas.height,
      canvas.width / 2,
      canvas.height,
      canvas.height * 4
    );

    bg.addColorStop(0, "#daefdc");
    bg.addColorStop(.4, "#9abf8d");
    bg.addColorStop(.8, "#c1e3b5");
    bg.addColorStop(1, "#cbd8c5");

    class Star {
      x: number;
      y: number;
      radius: number;
      color: string;
      dy: number;

      constructor(x?: number, y?: number) {
        this.x = x ?? randomInt(0, canvas.width);
        this.y = y ?? randomInt(0, canvas.height);
        this.radius = Math.random() * 3;
        this.color = colors[randomInt(0, colors.length)];
        this.dy = -Math.random() * .3;
      }

      draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.shadowBlur = randomInt(3, 15);
        c.shadowColor = this.color;
        c.strokeStyle = this.color;
        c.fillStyle = 'rgba(255,255,255,.5)';
        c.fill();
        c.stroke();
        c.closePath();
      }

      update(stars: Star[]) {
        if (this.y - this.radius < 0) {
          let i = stars.indexOf(this);
          stars.splice(i, 1);
          stars.push(new Star(undefined, canvas.height + 5));
        }
        this.y += this.dy;
        this.draw();
      }
    }

    let stars: Star[] = [];

    function init() {
      stars = [];
      for (let i = 0; i < n_stars; i++) {
        stars.push(new Star());
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.fillStyle = bg;
      c.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => s.update(stars));
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    init();
    animate();
  }
}