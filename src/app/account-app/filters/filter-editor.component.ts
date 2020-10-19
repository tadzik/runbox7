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

import { Component, Input, OnInit } from '@angular/core';
import { Filter } from '../../rmmapi/rbwebmail';

@Component({
    selector: 'app-account-filter-editor',
    template: `
<div *ngIf="shown" style="display: flex; justify-content: space-between;">
    <mat-checkbox [checked]="filter.active"> Active </mat-checkbox> 
    <mat-select [(ngModel)]="filter.location" style="width: auto">
        <mat-option value="1"> From </mat-option>
        <mat-option value="0"> To </mat-option>
        <mat-option value="3"> Cc </mat-option>
        <mat-option value="4"> Reply-To </mat-option>
    </mat-select>
    <mat-form-field>
        <mat-label>
            <span *ngIf="filter.negated; else contains"> doesn't contain </span>
            <ng-template #contains> contains </ng-template>
        </mat-label>
        <input matInput type="text" [(ngModel)]="filter.str">
    </mat-form-field>
    then
    <mat-select [(ngModel)]="filter.action" style="width: auto">
        <mat-option value="t"> move to folder </mat-option>
        <mat-option value="f"> forward to </mat-option>
        <mat-option value="b"> redirect to </mat-option>
    </mat-select>
    <mat-form-field>
        <input matInput type="text" [(ngModel)]="filter.target">
    </mat-form-field>
</div>
    `,
})
export class FilterEditorComponent implements OnInit {
    @Input() filter: Filter;

    shown: boolean;

    constructor(
    ) {
    }

    ngOnInit() {
        this.shown = this.filter.action !== 'pass' && this.filter.action !== 'vacation';
    }
}
