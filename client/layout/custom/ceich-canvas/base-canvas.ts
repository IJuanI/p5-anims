import p5, { Renderer } from 'p5';

export abstract class BaseCanvas {

  setup?(s: p5, render: Renderer): void;
  draw?(s: p5): void;
  windowResized?(s: p5): void;
  mousePressed?(s: p5, e: MouseEvent): void;
  mouseDragged?(s: p5, e: MouseEvent): void;
  mouseReleased?(s: p5, e: MouseEvent): void;
  touchStarted?(s: p5, e: any): void;
  touchMoved?(s: p5, e: any): void;
  touchEnded?(s: p5, e: any): void;

}