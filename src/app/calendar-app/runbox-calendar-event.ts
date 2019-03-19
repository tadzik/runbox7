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

import { CalendarEvent, } from 'angular-calendar';

import {
    addDays,
    addHours,
    addSeconds
} from 'date-fns';

export class RunboxCalendarEvent implements CalendarEvent {
	id?: 	   string | number;
    start:     Date;
    end?:      Date;
    title:     string;
    allDay?:   boolean;
	calendar:  string = 'rmm7-testing';

    constructor(event: any) {
        this.id     = event.id;
        this.start  = new Date(event.start);
        this.allDay = event.isAllDay;
        this.title  = event.title;

		if (event.duration) {
			// https://tools.ietf.org/html/rfc2445#section-4.3.6
			const durationRE = /^([\+\-]?)PT?(\d+)([WHMSD])$/;
			const parts = durationRE.exec(event.duration);
			switch (parts[3]) {
				case 'D':
					this.end = addDays(this.start, Number(parts[2]));
					break;
				case 'H':
					this.end = addHours(this.start, Number(parts[2]));
					break;
				case 'S':
					this.end = addSeconds(this.start, Number(parts[2]));
					break;
				default:
					throw new Error("Unsupported duration: " +  parts[3]);
			}
		}
    }
}

