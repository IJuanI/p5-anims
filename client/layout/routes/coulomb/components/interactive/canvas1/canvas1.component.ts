import { Component, ElementRef, forwardRef, Input } from '@angular/core';
import { BaseCanvas } from 'client/layout/custom';
import { ColorService } from 'client/services';
import { Particle, vector } from 'client/sim';
import p5, { Renderer } from 'p5';

@Component({
  selector: 'ceich-coulomb-interactive-canvas1[charge]',
  templateUrl: 'canvas1.component.html',
  providers: [{ provide: BaseCanvas, useExisting: forwardRef(() => CoulombInteractiveCanvas1) }]
})

export class CoulombInteractiveCanvas1
  extends BaseCanvas {

  @Input() charge: number;

  private readonly k0 = 10e3;

  private readonly mainBorder = 2;
  private readonly mainMinRadius = 12;
  private readonly mainMaxRadius = 35;
  private readonly sideMinRadius = 1;
  private readonly sideMaxRadius = 8;
  private readonly spawnRatio = 15;
  private readonly chargeVariation = 10;


  particles: Particle[] = [];
  mainCharge: Particle;

  private offsetX: number;
  private offsetY: number;
  private w: number;
  private h: number;

  private mainRadius: number;
  private dragging: boolean = false;
  private clicking: boolean = false;

  private render: Renderer;

  constructor(private color: ColorService) {
    super();
  }

  setup(_s: p5, render: Renderer) {
    this.render = render;
    this.updateSize();
    this.mainCharge = new Particle(new vector(this.w / 2, this.h / 2));
  }

  private updateSize() {
    const bounds = this.render.elt.getBoundingClientRect();
    this.w = bounds.width;
    this.h = bounds.height;
    this.offsetX = bounds.left;
    this.offsetY = bounds.top;
  }

  draw(s: p5): void {
    if (this.w !== s.width || this.h !== s.height)
      this.updateSize();

    this.spawnParticles(s);

    this.applyElectricForces(s);

    this.despawnParticles(s);

    this.drawSideParticles(s);

    this.drawMainParticle(s);
  }

  mouseDragged(s: p5, e: MouseEvent) {
    if (!s.mouseIsPressed) this.dragging = false;
    if (!(e.x < this.offsetX || e.x > this.w + this.offsetX || e.y < this.offsetY || e.y > this.h + this.offsetY)) {
      if (!this.clicking && s.mouseIsPressed)
        this.dragging = true;
    }
    if (this.dragging)
      this.mainCharge.move(new vector(e.movementX, e.movementY));
    this.clicking = s.mouseIsPressed;
  }

  mouseReleased() {
    this.dragging = false;
    this.clicking = false;
  }

  drawMainParticle(s: p5) {
    s.stroke(this.color.black);
    this.mainRadius = this.mainMinRadius + (this.mainMaxRadius - this.mainMinRadius) * s.abs(this.charge) / 20;
    s.strokeWeight(this.mainRadius + this.mainBorder);
    
    const hRad = (this.mainRadius + this.mainBorder) / 2;
    const mainPos = this.mainCharge.position;
    if (mainPos.x < +hRad) mainPos.x = +hRad;
    else if (mainPos.x > this.w-hRad) mainPos.x = this.w-hRad;
    if (mainPos.y < +hRad) mainPos.y = +hRad;
    else if (mainPos.y > this.h-hRad) mainPos.y = this.h-hRad;

    this.mainCharge.draw(s);
    s.stroke(this.chargeColor(this.charge));
    s.strokeWeight(this.mainRadius);
    this.mainCharge.draw(s, false);
  }

  spawnParticles(s: p5) {
    const target = this.spawnRatio * s.deltaTime / 1000;
    let count = s.ceil(target);
    const chance = target / count;
    while (count-- > 0)
      if (s.random() < chance) {
        const p = new Particle(
          new vector(
            s.random(0, s.width),
            s.random(0, s.height)));
        p.charge = s.random(-this.chargeVariation, this.chargeVariation);
        this.particles.push(p);
      }
  }

  applyElectricForces(s: p5) {
    const mainPos = this.mainCharge.position;
    this.particles.forEach(p => {
      if (!p.charge) return;
      const diff = p.position.clone().diff(mainPos);
      const rad = s.max(10, diff.length);
      p.push(diff.mul(this.k0 * this.charge * p.charge / (rad * rad * rad) * s.deltaTime / 1000));
    });
  }

  drawSideParticles(s: p5) {
    const radOffset = this.sideMinRadius;
    const radScale = (this.sideMaxRadius - this.sideMinRadius) / this.chargeVariation;
    this.particles.forEach(p => {
      s.strokeWeight(radOffset + s.round(s.abs(p.charge) * radScale));
      s.stroke(this.chargeColor(p.charge));
      p.draw(s);
    });
  }

  despawnParticles(s: p5) {
    const srad = this.sideMaxRadius / 2;
    const sqrMainRad = (this.mainRadius + this.mainBorder + srad) ^ 2;
    const mainPos = this.mainCharge.position;
    this.particles.forEach((p, i) => {
      if (p.position.x < -srad || p.position.y < -srad || p.position.x > s.width + srad || p.position.y > s.height + srad)
        this.particles.splice(i, 1);
      else if (mainPos.clone().diff(p.position).sqrLength <= sqrMainRad)
        this.particles.splice(i, 1);
    });
  }

  private chargeColor(charge: number): string {
    return charge > 0 ? this.color.red : charge < 0 ? this.color.blue : this.color.purple;
  }

}