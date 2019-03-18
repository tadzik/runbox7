import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RunboxCalendarEvent } from './runbox-calendar-event';

@Component({
	selector: 'event-editor-dialog',
	templateUrl: 'event-editor-dialog.component.html',
})
export class EventEditorDialog {
    event = new RunboxCalendarEvent({
        title: '',
        start: new Date(),
    });

	constructor(
		public dialogRef: MatDialogRef<EventEditorDialog>,
		@Inject(MAT_DIALOG_DATA) public data: RunboxCalendarEvent
	) {
		if (data) {
			this.event = data;
		}
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
