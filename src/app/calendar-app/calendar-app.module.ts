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

import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MenuModule } from '../menu/menu.module';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarAppComponent } from './calendar-app.component';
import { EventEditorDialog } from './event-editor-dialog.component';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  declarations: [
    CalendarAppComponent,
    EventEditorDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MenuModule,
    MatButtonModule,
	MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
	MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    // angular-calendar stuff
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  entryComponents: [
    EventEditorDialog
  ],
  providers: [
  ],
  bootstrap: [CalendarAppComponent]
})

export class CalendarAppModule { }
