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

import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SearchService } from '../xapian/searchservice';
import { ContactsService } from '../contacts-app/contacts.service';
import { ContactKind, Contact } from '../contacts-app/contact';
import { isValidEmail } from './emailvalidator';
import { MailAddressInfo } from '../xapian/messageinfo';
import { Recipient } from './recipient';
import { RunboxWebmailAPI } from '../rmmapi/rbwebmail';

@Injectable()
export class RecipientsService {
    ownAddresses: ReplaySubject<Set<string>> = new ReplaySubject(1);
    recipients: ReplaySubject<Recipient[]> = new ReplaySubject();
    popularRecipients: ReplaySubject<Recipient[]> = new ReplaySubject(1);

    constructor(
        searchService: SearchService,
        private contactsService: ContactsService,
        rmmapi: RunboxWebmailAPI,
    ) {
        rmmapi.getFromAddress().subscribe(
            froms => this.ownAddresses.next(new Set(froms.map(f => f.email)))
        );

        searchService.initSubject.subscribe((hasSearchIndex: boolean) => {
            const popularRecipients: { [email: string]: number } = {};
            const namesOf: {[email: string]: Set<string>} = {};

            const recipientsMap: {[email: string]: Recipient} = {};

            if (hasSearchIndex) {
                // Get all recipient terms from search index
                window['termlistresult'] = [];
                searchService.api.termlist('XRECIPIENT:');

                // Filter valid emails

                window['termlistresult']
                    .filter(recipient => isValidEmail(recipient))
                    .map(recipient => MailAddressInfo.parse(recipient)[0])
                    .forEach(recipient => {
                        recipientsMap[recipient.address] = Recipient.fromSearchIndex(recipient.nameAndAddress);

                        // add it to the "popularity contest" dataset
                        const email = recipient.address;
                        if (popularRecipients[email]) {
                            popularRecipients[email]++;
                        } else {
                            popularRecipients[email] = 1;
                        }
                        if (namesOf[email]) {
                            namesOf[email].add(recipient.name);
                        } else {
                            namesOf[email] = new Set([recipient.name]);
                        }
                    });

                this.ownAddresses.subscribe(own => {
                    this.popularRecipients.next(
                        Object.entries(
                            popularRecipients
                        ).filter(
                            // not us, and used at least 3 times
                            x => !own.has(x[0]) && x[1] > 2
                        ).sort(
                            (a, b) => b[1] - a[1]
                        ).map(
                            a => new Recipient([a[0]])
                        )
                    );
                });
            }

            this.popularRecipients.subscribe(pops => {
                console.log("Popular recipients:", pops);
            });

            contactsService.contactsSubject.subscribe(contacts => {
                const categories = {};
                const groups     = [];
                contacts.forEach(contact => {
                    if (contact.kind === ContactKind.GROUP) {
                        groups.push(contact);
                        return;
                    }

                    contact.emails.forEach(email => {
                        const recipientString = `"${contact.first_and_last_name()}" <${email.value}>`;
                        recipientsMap[email.value] = Recipient.fromContact(contact, email.value);
                    });

                    contact.categories.forEach(category => {
                        if (!categories[category]) {
                            categories[category] = [];
                        }
                        categories[category].push(contact);
                    });
                });

                const result = Object.keys(recipientsMap).map(mailaddr => recipientsMap[mailaddr]);

                for (const category of Object.keys(categories)) {
                    result.unshift(Recipient.fromCategory(category, categories[category]));
                }

                Promise.all(
                    groups.map(g => this.recipientFromGroup(g))
                ).then(
                    recipients => this.recipients.next(result.concat(recipients))
                ).catch(
                    () => this.recipients.next(result)
                );
            });
        });
    }

    private recipientFromGroup(group: Contact): Promise<Recipient> {
        const promises = [];

        for (const m of group.members) {
            if (m.uuid) {
                promises.push(
                    this.contactsService.lookupByUUID(m.uuid).then(
                        (c: Contact) => {
                            if (c.primary_email()) {
                                return `"${c.external_display_name()}" <${c.primary_email()}>`;
                            } else {
                                return null;
                            }
                        }
                    ).catch(
                        () => null
                    )
                );
            } else if (m.email) {
                if (m.name) {
                    promises.push(Promise.resolve(`${m.name} <${m.email}>`));
                } else {
                    promises.push(Promise.resolve(m.email));
                }
            }
        }

        return Promise.all(promises).then(
            members => {
                const recipients = members.filter(r => !!r);
                return new Recipient(recipients, `"${group.full_name}" group (${recipients.length} contacts)`);
            }
        );
    }
}
