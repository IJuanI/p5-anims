import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationData } from './confirmation-data';

@Component({
  selector: 'ceich-confirmation',
  templateUrl: 'confirmation.component.html'
})

export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData) {
      if (!data.buttons) data.buttons = ['Confirmar', 'Cancelar'];
    }

  onCancel(): void {
    this.dialogRef.close();
  }
}
