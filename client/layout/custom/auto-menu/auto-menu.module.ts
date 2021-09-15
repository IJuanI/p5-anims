import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AutoMenuComponent } from './auto-menu.component';

@NgModule({
  imports: [MatMenuModule, MatButtonModule],
  exports: [AutoMenuComponent],
  declarations: [AutoMenuComponent],
  providers: []
})
export class AutoMenuModule { }
