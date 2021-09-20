import { AfterViewInit, Component, ContentChild, ElementRef, Input, ViewChild } from '@angular/core';
import p5 from 'p5';
import { BaseCanvas } from './base-canvas';

@Component({
  selector: 'ceich-canvas[width][height]',
  template: ``
})
export class CeichCanvasComponent implements AfterViewInit {

  @ContentChild(BaseCanvas) canvasImpl: BaseCanvas;

  @Input() width: number;
  @Input() height: number;
  @Input() webGL: boolean;

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    const sketch = (s: p5) => {
      s.setup = () => {
        s.cursor(s.CROSS);
        const render = s.createCanvas(this.width, this.height, this.webGL === true ? s.WEBGL : s.P2D)
        render.parent(this.elRef.nativeElement);
        this.canvasImpl.setup?.(s, render);
      }

      s.windowResized = () => {
        s.resizeCanvas(this.width, this.height);
        this.canvasImpl.windowResized?.(s);
      }

      s.draw = () => {
        s.clear();
        s.fill(255, 0);
        this.canvasImpl.draw?.(s);
      }

      s.mouseDragged = (e: MouseEvent) => {
        this.canvasImpl.mouseDragged?.(s, e);
      }

      s.mouseReleased = (e: MouseEvent) => {
        this.canvasImpl.mouseReleased?.(s, e);
      }

    };

    new p5(sketch);
  }
}