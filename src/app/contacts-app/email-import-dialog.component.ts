// --------- BEGIN RUNBOX LICENSE ---------
// Copyright (C) 2016-2020 Runbox Solutions AS (runbox.com).
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

import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from './contact';

export interface EmailImportDialogResult {
    addToContact?:    Contact;
    createNewContact: boolean;
}

@Component({
    selector: 'app-contacts-email-import-dialog-component',
    templateUrl: 'email-import-dialog.component.html',
})
export class EmailImportDialogComponent {
    contacts: Contact[];
    email: string;
    name?: string;

    nameAndEmail: string;

    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<EmailImportDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        console.log("Dialog opened:", data);
        this.contacts = data['contacts'];
        this.email    = data['email'];
        this.name     = data['name'];

        if (this.name) {
            this.nameAndEmail = `${this.name} (${this.email})`;
        } else {
            this.nameAndEmail = this.email;
        }
    }

    onCancelClick(): void {
        this.finish(null);
    }

    onSubmitClick(): void {
        this.finish(null); // FIXME
    }

    // so that we get typechecking on close() :)
    private finish(result: EmailImportDialogResult): void {
        this.dialogRef.close(result);
    }
}
