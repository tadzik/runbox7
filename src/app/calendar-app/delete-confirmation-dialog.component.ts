import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-calendar-delete-confirmation-dialog',
    template: `
<h2 mat-dialog-title>Delete {{ data }}</h2>
<mat-dialog-content>Are you sure you want to delete this {{ data }}?</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close>No</button>
  <button mat-button [mat-dialog-close]="true">Yes</button>
</mat-dialog-actions>
   `
})
export class DeleteConfirmationDialogComponent {
    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) {
    }
}
