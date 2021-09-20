import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule, Routes } from '@angular/router';
import { CeichCanvasModule } from 'client/layout/custom';
import { CoulombInteractiveCanvas1, CoulombInteractiveComponent } from './components';
import { CoulombComponent } from './coulomb.component';

const routes: Routes = [
  {
    path: '', component: CoulombComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CeichCanvasModule,
    MatSliderModule,
  ],
  exports: [],
  declarations: [CoulombComponent, CoulombInteractiveComponent, CoulombInteractiveCanvas1],
  providers: [],
})
export class CoulombModule { }
