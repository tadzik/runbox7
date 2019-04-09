import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RunboxCalendar } from './runbox-calendar';
import { RunboxCalendarEvent } from './runbox-calendar-event';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog.component';

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
    calendars: RunboxCalendar[];

    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<EventEditorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data['event']) {
            this.event = data['event'];
        }
        this.calendars = data['calendars'];
    }

    onDeleteClick(): void {
        const confirmRef = this.dialog.open(DeleteConfirmationDialog, { data: "event" });
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
