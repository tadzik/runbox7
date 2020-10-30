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

import { Component } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { Filter, RunboxWebmailAPI } from '../../rmmapi/rbwebmail';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-account-filters-component',
    templateUrl: './account-filters.component.html',
    styleUrls: ['./account-filters.component.scss'],
})
export class AccountFiltersComponent {
    filters: ReplaySubject<Filter[]> = new ReplaySubject(1);

    constructor(
        private rmmapi: RunboxWebmailAPI,
    ) {
        this.rmmapi.getFilters().subscribe(filters => {
            this.filters.next(filters);
        });
    }

    newFilter(): void {
        const template = {
            id: null,
            str: '',
            action: 't',
            active: true,
            target: 'Inbox',
            negated: false,
            location: '0',
            priority: 99,
        };
        this.updateFilters(
            filters => [template, ...filters]
        );
    }

    deleteFilter(target: Filter): void {
        if (target.id) {
            console.log(`Deleting filter #${target.id}`);
            this.rmmapi.deleteFilter(target).subscribe(
                () => console.log(`Filter #${target.id} deleted`),
            );
        }
        this.updateFilters(
            filters => filters.filter(f => f !== target)
        );
    }

    saveFilter(existing: Filter, replacement: Filter): void {
        console.log(`Uploading filter to server ${JSON.stringify(replacement)}`);
        this.rmmapi.saveFilter(replacement).subscribe(
            id => {
                replacement.id = id; // only needed when a new one is created, but no difference to us
                this.updateFilters(
                    filters => filters.map(f => {
                        if (f === existing) {
                            return replacement;
                        } else {
                            return f;
                        }
                    })
                );
            },
            err => {
                console.log("FILTER CREATE ERROR:", err);
            },
        );
    }

    updateFilters(transform: (_: Filter[]) => Filter[]): void {
        this.filters.pipe(take(1)).subscribe(
            filters => this.filters.next(transform(filters))
        );
    }

    moveFilterUp(filter: Filter): void {
        this.updateFilters(filters => {
            const index = filters.findIndex(f => f === filter);
            if (index === 0) {
                return filters;
            }
            const head = filters.slice(0, index);
            let tail = filters.slice(index + 1);
            tail = [head.pop(), ...tail];
            setTimeout(() => this.hilightFilter(filter), 50);
            return [...head, filter, ...tail];
        });
    }

    moveFilterDown(filter: Filter): void {
        this.updateFilters(filters => {
            const index = filters.findIndex(f => f === filter);
            if (index === filters.length - 1) {
                return filters;
            }
            const head = filters.slice(0, index);
            const tail = filters.slice(index + 1);
            setTimeout(() => this.hilightFilter(filter), 50);
            return [...head, tail.shift(), filter, ...tail];
        });
    }

    hilightFilter(filter: Filter): void {
        const elem = document.getElementById(`${filter.id}`);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
            elem.classList.add('backlitCard');
        }
    }
}
