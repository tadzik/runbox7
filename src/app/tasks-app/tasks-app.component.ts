// --------- BEGIN RUNBOX LICENSE ---------
// Copyright (C) 2016-2018 Runbox Solutions AS (runbox.com).
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

import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { RunboxWebmailAPI } from '../rmmapi/rbwebmail';
import { TasksService } from './tasks.service';
import { Task } from './task';

@Component({
    moduleId: 'angular2/app/tasks-app/',
    // tslint:disable-next-line:component-selector
    selector: 'tasks-app-root',
    templateUrl: './tasks-app.component.html'
})
export class TasksAppComponent {
    title = 'Tasks';
    tasks: Task[];

    constructor(
        private tasksservice: TasksService,
        private route:        ActivatedRoute,
        private router:       Router,
        private snackBar:     MatSnackBar
    ) {
        this.tasksservice.tasksSubject.subscribe(t => {
            this.tasks = t;
        });

        this.tasksservice.informationLog.subscribe(
            msg => this.showNotification(msg)
        );

        this.tasksservice.errorLog.subscribe(
            e => this.showError(e)
        );
    }

    showNotification(message: string, action = 'Dismiss'): void {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    showError(e: HttpErrorResponse): void {
        let message = '';

        if (e.status === 500) {
            message = 'Internal server error';
        } else {
            console.log('Error ' + e.status +  ': ' + e.message);
        }

        if (message) {
            this.snackBar.open(message, 'Ok :(', {
                duration: 5000,
            });
        }
    }
}
