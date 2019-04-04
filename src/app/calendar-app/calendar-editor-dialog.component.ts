import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RunboxCalendarEvent } from './runbox-calendar-event';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog.component';

@Component({
	selector: 'calendar-editor-dialog',
	templateUrl: 'calendar-editor-dialog.component.html',
})
export class CalendarEditorDialog {
    calendar = {};

	constructor(
        private dialog: MatDialog,
		public dialogRef: MatDialogRef<CalendarEditorDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		if (data) {
            console.log("Opening calendar:", data);
			this.calendar = data;
		}
	}

    onDeleteClick(): void {
        const confirmRef = this.dialog.open(DeleteConfirmationDialog, { data: "calendar" });
        confirmRef.afterClosed().subscribe(result => {
            if (result) {
                this.dialogRef.close('DELETE');
            }
        });
    }

	onCancelClick(): void {
		this.dialogRef.close();
	}

    onSubmitClick(): void {
		this.dialogRef.close(this.calendar);
    }
}
