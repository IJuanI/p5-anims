import p5 from 'p5';
import { BaseParticle } from './base-particle';

export class Particle extends BaseParticle {

  public draw(s: p5, doTick?: boolean) {
    if (doTick !== false) this.tick(s);
    s.point(this.position.x, this.position.y, this.position.z);
  }
}