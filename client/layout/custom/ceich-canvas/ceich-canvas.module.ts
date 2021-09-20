import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CeichCanvasComponent } from './ceich-canvas.component';

@NgModule({
  imports: [MatMenuModule, MatButtonModule],
  exports: [CeichCanvasComponent],
  declarations: [CeichCanvasComponent],
  providers: []
})
export class CeichCanvasModule { }
