// --------- BEGIN RUNBOX LICENSE ---------
// Copyright (C) 2016-2019 Runbox Solutions AS (runbox.com).
// 
// This file is part of Runbox 7.
// 
// Runbox 7 is free software: You can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
// 
// Runbox 7 is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Runbox 7. If not, see <https://www.gnu.org/licenses/>.
// ---------- END RUNBOX LICENSE ----------

import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef
} from '@angular/core';

import { MatDialog } from '@angular/material';

import {
    isSameDay,
    isSameMonth,
} from 'date-fns';

import { Subject } from 'rxjs';

import {
    CalendarEvent,
    CalendarEventTimesChangedEvent,
    CalendarEventTitleFormatter,
    CalendarView
} from 'angular-calendar';

import { RunboxWebmailAPI } from '../rmmapi/rbwebmail';
import { RunboxCalendarEvent } from './runbox-calendar-event';
import { EventEditorDialog } from './event-editor-dialog.component';
import { EventTitleFormatter } from './event-title-formatter';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'calendar-app-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calendar-app.component.html',
    providers: [
        { provide: CalendarEventTitleFormatter, useClass: EventTitleFormatter }
    ]
})
export class CalendarAppComponent {
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    activeDayIsOpen: boolean = true;

    refresh: Subject<any> = new Subject();

    events: CalendarEvent[] = [];

    constructor(
        private dialog: MatDialog,
        private rmmapi: RunboxWebmailAPI
    ) {
        this.rmmapi.getCalendarEvents().subscribe(events => {
            console.log('Calendar events:', events);
            this.events = [];
            for (var e of events) {
                this.events.push(new RunboxCalendarEvent(e));
            }
            this.refresh.next();
        });
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
              this.activeDayIsOpen = false;
            } else {
              this.activeDayIsOpen = true;
            }
        }
    }

    eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        console.log('Event changed', event);
        this.rmmapi.modifyCalendarEvent(event as RunboxCalendarEvent).subscribe(
            res => console.log("Event updated:", res)
        );
    }

    openEvent(event: CalendarEvent): void {
        console.log("Opening event", event);
        const dialogRef = this.dialog.open(EventEditorDialog, { 'data': event });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'DELETE') {
                this.rmmapi.deleteCalendarEvent(event.id).subscribe(
                    res => {
                        console.log("Event deleted:", res);
                        const idx = this.events.findIndex(e => e.id === event.id);
                        this.events.splice(idx, 1);
                        this.refresh.next();
                    }
                );
            } else if (result) {
                console.log("Updating event:", result);
                this.rmmapi.modifyCalendarEvent(result).subscribe(
                    res => {
                        console.log("Event updated:", res);
                        const idx = this.events.findIndex(e => e.id == result.id);
                        this.events.splice(idx, 1, result);
                        this.refresh.next();
                    }
                );
            }
        });
    }

    addEvent(): void {
        const dialogRef = this.dialog.open(EventEditorDialog, {});
        dialogRef.afterClosed().subscribe(event => {
            console.log("Dialog result:", event);
			if (event) {
				this.rmmapi.addCalendarEvent(event).subscribe(res => {
					console.log("Event created:", res);
                    event.id = res.id;
                    this.events.push(event);
                    this.refresh.next();
                });
			}
        });
    }
}
