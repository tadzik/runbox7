import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RunboxCalendar } from './runbox-calendar';
import { RunboxCalendarEvent } from './runbox-calendar-event';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

@Component({
    selector: 'app-calendar-editor-dialog-component',
    templateUrl: 'calendar-editor-dialog.component.html',
})
export class CalendarEditorDialogComponent {
    calendar: RunboxCalendar = new RunboxCalendar({ id: '' });
    name = 'New calendar';

    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<CalendarEditorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data) {
            console.log('Opening calendar:', data);
            this.calendar = data;
            this.name = data.toString();
        }
    }

    onDeleteClick(): void {
        const confirmRef = this.dialog.open(DeleteConfirmationDialogComponent, { data: 'calendar' });
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
