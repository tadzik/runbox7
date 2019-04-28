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

import { RunboxWebmailAPI } from '../rmmapi/rbwebmail';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, Observable, Subject, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Task } from './task';

@Injectable()
export class TasksService {
    tasksSubject    = new ReplaySubject<Task[]>();
    informationLog  = new Subject<string>();
    errorLog        = new Subject<HttpErrorResponse>();

    constructor(
        private rmmapi: RunboxWebmailAPI
    ) {
        this.reload();
    }

    apiErrorHandler(e: HttpErrorResponse): void {
        this.errorLog.next(e);
    }

    reload(): Observable<any> {
        console.log('Reloading the tasks list');
        const res = this.rmmapi.getCalendarTasks();
        res.subscribe(tasks => {
            tasks = tasks.map(t => new Task(t))
            this.tasksSubject.next(tasks);
        }, e => this.apiErrorHandler(e));
        return res;
    }
}
