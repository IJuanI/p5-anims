import p5, { Renderer } from 'p5';

export abstract class BaseCanvas {

  setup?(s: p5, render: Renderer): void;
  draw?(s: p5): void;
  windowResized?(s: p5): void;
  mouseDragged?(s: p5, e: MouseEvent): void;
  mouseReleased?(s: p5, e: MouseEvent): void;

}