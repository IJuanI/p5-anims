import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'client/services';
import p5, { Camera, Color } from 'p5';

@Component({
  selector: 'ceich-app',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  canvas: p5;
  animTime = 0;
  animDuration = 18;
  paused = false;
  isDark: boolean;

  constructor(private theme: ThemeService) { }

  togglePause() {
    this.paused = !this.paused;
  }

  ngOnInit(): void {
    this.isDark = this.theme.getDarkTheme();
    this.theme.isDarkTheme.subscribe({next: dark => this.isDark = dark });

    const sketch = (s: p5) => {

      // constants
      const margin = [42, 132+48];
      const spacing = 40;
      const lines = 8;
      const thick1 = 2;
      const thick3 = 3;
      const thick5 = 5;
      const initTime = 0;

      // colors
      const transparent = s.color(255, 0);
      const _black = s.color(0);
      const _white = s.color(255);
      const red = s.color('#F43830');
      const green = s.color('#30f447');
      const blue = s.color('#304af4');
      const _gray_dark = s.color('#45474a');
      const _gray_light = s.color('#cccdcf');
      
      let black: Color;
      let white: Color;
      let gray;

      let darkMode: boolean;
      let half_width: number, half_height: number;
      let elapsed: number;

      let mainCamera: Camera;


      s.setup = () => {
        const render = s.createCanvas(s.windowWidth - margin[0], s.windowHeight - margin[1], s.WEBGL);
        render.parent('dummy-canvas');
        s.frameRate(60);
        
        half_height = s.height/2;
        half_width = s.width/2;

        mainCamera = s.createCamera();
        mainCamera.ortho();

        restart.bind(this)();
      }
      
      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth - margin[0], s.windowHeight - margin[1]);
        half_height = s.height/2;
        half_width = s.width/2;
      }

      s.draw = () => {
        computeColors();
        computeTime();

        s.clear();
        s.fill(transparent);
        
        s.camera(0, s.height, 0, 0, 0, 0, 0, 0, 1);
        moveCamera(animate(8, 3.5));

        drawGrid(animate(5, 5));
        drawAxisX(animate(0, 2));
        drawAxisY(animate(3, 2));
        drawCircle(animate(6, 2), animate(10.5, 0));
        drawCoil(animate(10.5, 2), animate(11, 5));
      }

      function animate(start: number, duration: number): number {
        return clamp((elapsed - start*1000)/duration/1000, 0, 1);
      }

      function clamp(value: number, min: number, max: number): number {
        return s.min(s.max(value, min), max);
      }

      function restart() {
        this.animTime = initTime*1000;
      }

      const computeColors = () => {
        black = this.isDark ? _black : _white;
        white = this.isDark ? _white : _black;
        gray = this.isDark ? _gray_dark : _gray_light;
      }

      const computeTime = () => {
        if (!this.paused) {
          this.animTime += s.deltaTime;
          if (this.animTime > this.animDuration * 1000)
            restart.bind(this)();
        }
        elapsed = this.animTime;
      }

      function drawGrid(completion: number) {
        if (completion < Number.EPSILON) return;
        s.strokeWeight(thick1);
        s.stroke(gray);
        s.noFill();

        const length = lines*spacing;
        const start = thick1-length;
        const end = length-thick1;

        for (let i = 1; i < lines; i+=2) {
          const delta = i*spacing;
          s.line(delta, 0, start, delta, 0, s.lerp(start, end, completion));
          s.line(-delta, 0, start, -delta, 0, s.lerp(start, end, completion));
          s.line(start, 0, delta, s.lerp(start, end, completion), 0, delta);
          s.line(start, 0, -delta, s.lerp(start, end, completion), 0, -delta);
        }
        for (let i = 2; i < lines; i+=2) {
          const delta = i*spacing;
          s.line(delta, 0, end, delta, 0, s.lerp(end, start, completion));
          s.line(-delta, 0, end, -delta, 0, s.lerp(end, start, completion));
          s.line(end, 0, delta, s.lerp(end, start, completion), 0, delta);
          s.line(end, 0, -delta, s.lerp(end, start, completion), 0, -delta);
        }
      }
      
      function drawAxisX(completion: number) {
        if (completion < Number.EPSILON) return;
        const length = lines*spacing;
        s.strokeWeight(thick3);
        s.stroke(red);
        const start = length-thick3;
        const end = thick3-length;
        s.line(start, 0, 0, s.lerp(start, end, completion), 0, 0);
      }

      function drawAxisY(completion: number) {
        if (completion < Number.EPSILON) return;
        const length = lines*spacing;
        s.strokeWeight(thick3);
        s.stroke(green);
        const start = length-thick3;
        const end = thick3-length;
        s.line(0, 0, start, 0, 0, s.lerp(start, end, completion));
      }

      function drawCircle(completion: number, deletion: number) {
        if (completion < Number.EPSILON || deletion) return;
        s.rotateX(s.HALF_PI);
        s.strokeWeight(thick5);
        s.stroke(white);
        const d = s.height * .4;
        s.arc(0, 0, d, d, 0, s.TWO_PI * completion, s.OPEN, s.ceil(d/6));
        s.rotateX(-s.HALF_PI);
      }

      function drawCoil(expansion: number, completion: number) {
        if (expansion < Number.EPSILON) return;
        s.strokeWeight(thick5);
        s.stroke(white);
        const diameter = s.height * .4;
        const detail = s.ceil(diameter/6);
        const radius = diameter/2;
        const coils = 4;
        const coilHeight = 100;
        const vertices = detail + detail * completion * (coils-1);
        s.beginShape();
        for (let i = 0; i <= vertices; ++i) {
          const progress = i/detail;
          const angle = progress * s.TWO_PI - s.HALF_PI;
          s.vertex(-s.sin(angle)*radius, coilHeight*expansion*progress, s.cos(angle)*radius);
        }
        if (vertices%1 > Number.EPSILON) {
          const progress = 1 + (coils-1)*completion;
          const angle = progress * s.TWO_PI - s.HALF_PI;
          s.vertex(-s.sin(angle)*radius, coilHeight*expansion*progress, s.cos(angle)*radius);
        }
        s.endShape();
      }

      function moveCamera(completion: number) {
        if (completion < Number.EPSILON) return;
        const x = half_width*completion;
        const y = half_height*completion;
        s.camera(x, s.height, y, 0, 0, 0, 0, -1*completion, 1-completion);
      }

    };

    this.canvas = new p5(sketch);
  }
}
