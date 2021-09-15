import { Component } from '@angular/core';

@Component({
  selector: 'ceich-auto-menu',
  template: `
  <button mat-button [matMenuTriggerFor]="menu" #menuTrigger="matMenuTrigger"
                  (mouseenter)="mouseEnter(menuTrigger)" (mouseleave)="mouseLeave(menuTrigger)">
      <ng-content select="[trigger]"></ng-content>
  </button>
  <mat-menu #menu="matMenu" class="no-border" [hasBackdrop]="false">
      <div class="py-2" (mouseenter)="mouseEnter(menuTrigger)" (mouseleave)="mouseLeave(menuTrigger)">
          <ng-content select="[content]"></ng-content>
      </div>
  </mat-menu>
  `
})
export class AutoMenuComponent {
  timedOutCloser;

  constructor() { }

  mouseEnter(trigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }
}