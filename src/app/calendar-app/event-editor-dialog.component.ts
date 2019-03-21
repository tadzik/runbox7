import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RunboxCalendarEvent } from './runbox-calendar-event';
import { EventDeleteConfirmationDialog } from './event-delete-confirmation-dialog.component';

@Component({
	selector: 'event-editor-dialog',
	templateUrl: 'event-editor-dialog.component.html',
})
export class EventEditorDialog {
    event = new RunboxCalendarEvent({
        title: '',
        start: new Date(),
        allDay: false,
    });

	constructor(
        private dialog: MatDialog,
		public dialogRef: MatDialogRef<EventEditorDialog>,
		@Inject(MAT_DIALOG_DATA) public data: RunboxCalendarEvent
	) {
		if (data) {
            console.log("Opening event:", data);
			this.event = data;
		}
	}

    onDeleteClick(): void {
        const confirmRef = this.dialog.open(EventDeleteConfirmationDialog, {});
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
		this.dialogRef.close(this.event);
    }
}
