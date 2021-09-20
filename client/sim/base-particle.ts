import p5 from 'p5';
import { vector } from './vector';

export abstract class BaseParticle {
  public velocity: vector;
  public drag?: number;
  public charge?: number;
  constructor(public position: vector, velocity?: vector) {
    this.velocity = velocity ? velocity : new vector(0, 0);
  }
  public abstract draw(s: p5): void;
  protected tick(s: p5): void {
    const delta = s.deltaTime / 1000;
    if (this.drag) this.velocity.mul(1 - (this.drag * delta));
    this.position.add(this.velocity.clone().mul(delta));
  }
  public move(displacement: vector) {
    this.position.add(displacement);
  }
  public push(force: vector) {
    this.velocity.add(force);
  }
}