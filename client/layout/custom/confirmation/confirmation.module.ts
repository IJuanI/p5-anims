import { NgModule } from '@angular/core';
import { ConfirmationComponent } from './confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  exports: [MatDialogModule],
  declarations: [ConfirmationComponent],
  providers: []
})
export class ConfirmationModule { }
