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

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Filter } from '../../rmmapi/rbwebmail';
import { MessageListService } from '../../rmmapi/messagelist.service';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-account-filter-editor',
    template: `
<mat-card style="margin: 10px;">
    <mat-card-content>
        <form [formGroup]="form" style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <div style="display: flex; flex-direction: column;">
                <mat-checkbox formControlName="active"> Active </mat-checkbox> 
                <button mat-button (click)="moveUp.emit()">
                    <mat-icon svgIcon="priority-high"></mat-icon> Move up
                </button>
                <button mat-button (click)="moveDown.emit()">
                    <mat-icon svgIcon="priority-low"></mat-icon> Move down
                </button>
            </div>
            <mat-form-field>
                <mat-label> A message where </mat-label>
                <mat-select formControlName="location" style="width: auto">
                    <mat-option value="0"> To </mat-option>
                    <mat-option value="1"> From </mat-option>
                    <mat-option value="2"> Subject </mat-option>
                    <mat-option value="3"> Cc </mat-option>
                    <mat-option value="4"> Reply-To </mat-option>
                    <mat-option value="5"> Body </mat-option>
                    <mat-option value="6"> Return-Path </mat-option>
                    <mat-option value="7"> Delivered-To </mat-option>
                    <mat-option value="8"> Mailing-List </mat-option>
                    <mat-option value="9"> Header </mat-option>
                    <mat-option value="11"> Address-suffix </mat-option>
                    <mat-option value="13"> List-ID </mat-option>
                </mat-select>
            </mat-form-field>
            <div>
                <mat-form-field>
                    <mat-label>
                        <span *ngIf="isNegated; else contains"> doesn't contain </span>
                        <ng-template #contains> contains </ng-template>
                    </mat-label>
                    <input matInput type="text" formControlName="str">
                    <button matSuffix mat-icon-button (click)="negate()" matTooltip="Negate">
                        <mat-icon *ngIf="isNegated; else negateElement" svgIcon="alphabetical"></mat-icon>
                        <ng-template #negateElement>
                            <mat-icon svgIcon="alphabetical-off"></mat-icon>
                        </ng-template>
                    </button>
                </mat-form-field>
            </div>
            <mat-form-field>
                <mat-label> Will be </mat-label>
                <mat-select formControlName="action" style="width: auto">
                    <mat-option value="t"> moved to folder </mat-option>
                    <mat-option value="f"> forwarded to </mat-option>
                    <mat-option value="b"> redirected to </mat-option>
                </mat-select>
            </mat-form-field>
            <mat-form-field *ngIf="form.get('action').value === 't'; else freeform">
                <mat-label> Select folder </mat-label>
                <mat-select formControlName="target" style="width: auto">
                    <mat-option
                        *ngFor="let folder of folders"
                        [value]="folder"
                    > {{ folder }} </mat-option>
                </mat-select>
            </mat-form-field>
            <ng-template #freeform>
                <mat-form-field>
                    <mat-label> Target </mat-label>
                    <input matInput type="text" formControlName="target">
                </mat-form-field>
            </ng-template>
        </form>
    </mat-card-content>
    <mat-card-actions style="display: flex">
        <button mat-raised-button color="primary" *ngIf="form.dirty || !filter.id" (click)="saveFilter()"> Save </button>
        <button mat-raised-button *ngIf="form.dirty" (click)="reloadForm()"> Discard changes </button>
        <span style="flex-grow: 1"></span>
        <button mat-raised-button color="warn" (click)="deleteFilter()"> Delete </button>
    </mat-card-actions>
</mat-card>
    `,
})
export class FilterEditorComponent implements OnInit {
    @Input() filter: Filter;

    @Output() delete:   EventEmitter<void>   = new EventEmitter();
    @Output() save:     EventEmitter<Filter> = new EventEmitter();
    @Output() moveUp:   EventEmitter<void>   = new EventEmitter();
    @Output() moveDown: EventEmitter<void>   = new EventEmitter();

    isNegated: boolean;
    folders: string[] = [];
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        messageListService: MessageListService,
    ) {
        messageListService.folderListSubject.subscribe(folders => {
            this.folders = folders.map(f => f.folderPath);
        });
    }

    negate(): void {
        this.isNegated = !this.isNegated;
        this.form.get('negated').setValue(this.isNegated);
        this.form.get('negated').markAsDirty();
    }

    ngOnInit() {
        this.reloadForm();
    }

    reloadForm(): void {
        this.form = this.fb.group({
            active:   this.fb.control(this.filter.active),
            location: this.fb.control(this.filter.location),
            negated:  this.fb.control(this.filter.negated),
            str:      this.fb.control(this.filter.str),
            action:   this.fb.control(this.filter.action),
            target:   this.fb.control(this.filter.target),
        });
        this.isNegated = this.filter.negated;
    }

    deleteFilter(): void {
        this.delete.emit();
    }

    saveFilter(): void {
        const newFilter = {id: this.filter.id};
        Object.assign(newFilter, this.form.value);
        this.save.emit(newFilter as Filter);
    }
}
