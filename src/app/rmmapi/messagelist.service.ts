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

import { Injectable } from '@angular/core';

import { throwError as observableThrowError, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';
import { catchError, distinctUntilChanged, map, filter, take } from 'rxjs/operators';

import { MessageInfo } from '../common/messageinfo';

import { RunboxWebmailAPI, FolderListEntry } from './rbwebmail';
import { SearchService } from '../xapian/searchservice';

export class FolderMessageCountEntry {
    constructor(
        public unread: number,
        public total:  number,
    ) { }

    static of(folder: FolderListEntry) {
        return new this(
            folder.newMessages,
            folder.totalMessages,
        );
    }
}

export interface FolderMessageCountMap {
    [folderPath: string]: FolderMessageCountEntry;
}

@Injectable()
export class MessageListService {
    messagesInViewSubject: BehaviorSubject<MessageInfo[]> = new BehaviorSubject([]);
    folderListSubject: BehaviorSubject<FolderListEntry[]> = new BehaviorSubject([]);
    folderMessageCountSubject: ReplaySubject<FolderMessageCountMap> = new ReplaySubject(1);

    currentFolder = 'Inbox';

    folderMessageLists: { [folder: string]: MessageInfo[] } = {};
    messagesById: { [id: number]: MessageInfo } = {};
    folderCounts: FolderMessageCountMap;

    trashFolderName = 'Trash';
    spamFolderName = 'Spam';

    public fetchInProgress = false;

    // Initialized "manually" by SearchService.
    // Can't be depedency-injected because of a circular dependency
    public searchservice = new AsyncSubject<SearchService>();

    constructor(
        public rmmapi: RunboxWebmailAPI
    ) {
        this.refreshFolderList();

        rmmapi.messageFlagChangeSubject.pipe(
                filter((msgFlagChange) => this.messagesById[msgFlagChange.id] ? true : false)
            ).subscribe((msgFlagChange) => {
                if (msgFlagChange.seenFlag === true || msgFlagChange.seenFlag === false) {
                    this.messagesById[msgFlagChange.id].seenFlag = msgFlagChange.seenFlag;
                }
                if (msgFlagChange.flaggedFlag === true || msgFlagChange.flaggedFlag === false) {
                    this.messagesById[msgFlagChange.id].flaggedFlag = msgFlagChange.flaggedFlag;
                }
                // update local results ASAP, schedule API results for later
                this.refreshFolderCounts().then(() => this.refreshFolderList());
            });
    }

    public setCurrentFolder(folder: string) {
        this.currentFolder = folder;
        this.searchservice.pipe(take(1)).subscribe(searchservice => {
            if (!searchservice.localSearchActivated ||
                folder === this.spamFolderName ||
                folder === this.trashFolderName) {
                // Always fetch fresh folder listing when setting current folder
                this.folderMessageLists[folder] = [];

                this.fetchFolderMessages();
            }
        });
    }

    public refreshFolderCounts(): Promise<void> {
        return new Promise((resolve, _) => {
            return this.searchservice.pipe(take(1)).subscribe(searchservice => {
                const xapianFolders = new Set(
                    searchservice.localSearchActivated
                        ?  searchservice.api.listFolders().map(f => f[0])
                        : []
                );

                this.folderListSubject.pipe(take(1)).subscribe((folders) => {
                    const folderCounts = {};
                    for (const folder of folders) {
                        const path = folder.folderPath;
                        const xapianPath = path.replace(/\//g, '.');

                        if (xapianFolders.has(xapianPath)) {
                            const res = searchservice.api.getFolderMessageCounts(xapianPath);

                            folderCounts[path] = new FolderMessageCountEntry(res[1], res[0]);
                        } else {
                            folderCounts[path] = FolderMessageCountEntry.of(folder);
                        }
                    }
                    this.folderCounts = folderCounts;
                    this.folderMessageCountSubject.next(folderCounts);

                    resolve();
                });
            });
        });
    }

    public refreshFolderList(): Promise<FolderListEntry[]> {
        return new Promise((resolve, _) => {
            this.rmmapi.getFolderList()
                .pipe(distinctUntilChanged((prev, curr) =>
                     prev.length === curr.length
                     && prev.map(f => f.folderId).join('') === curr.map(f => f.folderId).join('')))
                .subscribe((folders) => {
                    const trashfolder = folders.find(folder => folder.folderType === 'trash');
                    if (trashfolder) {
                        this.trashFolderName = trashfolder.folderName;
                    }
                    const spamfolder = folders.find(folder => folder.folderType === 'spam');
                    if (spamfolder) {
                        this.spamFolderName = spamfolder.folderName;
                    }

                    this.folderListSubject.next(folders);
                    // Will fallback on the folder counters set above for folders not in the search index
                    this.refreshFolderCounts();
                resolve(folders);
            });
       });
    }

    public requestMoreData(currentlimit: number) {
        const messageList = this.folderMessageLists[this.currentFolder];
        if (messageList && messageList.length === currentlimit && currentlimit % RunboxWebmailAPI.LIST_ALL_MESSAGES_CHUNK_SIZE === 0) {
            this.fetchFolderMessages();
        }
    }

    public applyChanges(msgInfos: MessageInfo[]) {
        const filterFolders: { [folder: string]: boolean } = {};

        let hasChanges = false;
        // New messages
        msgInfos
            .filter((msg) => this.messagesById[msg.id] === undefined)
            .forEach((msg) => {
                hasChanges = true;
                this.messagesById[msg.id] = msg;
                if (!this.folderMessageLists[msg.folder]) {
                    this.folderMessageLists[msg.folder] = [];
                }
                const newFolderMessageIndex = this.folderMessageLists[msg.folder].findIndex((m) => msg.id > m.id);
                if (newFolderMessageIndex > -1) {
                    this.folderMessageLists[msg.folder]
                        .splice(newFolderMessageIndex, 0, msg);
                } else {
                    this.folderMessageLists[msg.folder].push(msg);
                }
            });

        // Messages moved to another folder or deleted (moved to trash)
        msgInfos
            .filter((msg) =>
                this.messagesById[msg.id] &&
                this.messagesById[msg.id].folder !== msg.folder
            )
            .forEach((msg) => {
                hasChanges = true;
                filterFolders[this.messagesById[msg.id].folder] = true;
                this.messagesById[msg.id].folder = msg.folder;

                msg = this.messagesById[msg.id];

                if (this.folderMessageLists[msg.folder]) {
                    const newFolderMessageIndex = this.folderMessageLists[msg.folder].findIndex((m) => msg.id > m.id);

                    if (newFolderMessageIndex > -1) {
                        this.folderMessageLists[msg.folder]
                            .splice(newFolderMessageIndex, 0, msg);
                    } else {
                        this.folderMessageLists[msg.folder].push(msg);
                    }
                }
            });
        // Messages status changed (read/unread)
        msgInfos
            .filter((msg) =>
                this.messagesById[msg.id] &&
                this.messagesById[msg.id].seenFlag !== msg.seenFlag
            )
            .forEach((msg) => {
                hasChanges = true;
                this.messagesById[msg.id].seenFlag = msg.seenFlag;
            });
        Object.keys(filterFolders)
            .filter((fld) => this.folderMessageLists[fld])
            .forEach((fld) => {
                this.folderMessageLists[fld] = this.folderMessageLists[fld].filter((msg) =>
                    msg.folder === fld);
            });

        if (hasChanges) {
            this.messagesInViewSubject.next(this.folderMessageLists[this.currentFolder]);
            this.refreshFolderList();
        }
    }

    // When emptying the trash we delete from here first
    // (then update backend + index)
    public pretendEmptyTrash() {
        // Set these locally, main trash emptying will come along and
        // offically update them later
        this.folderCounts[this.trashFolderName].unread = 0;
        this.folderCounts[this.trashFolderName].total = 0;

        // Just lie a bit, we'll fix it in a mo..
        this.folderMessageCountSubject.next(this.folderCounts);
        this.folderMessageLists[this.trashFolderName] = [];
    }

    // Non-index users - delete messages from messagelist
    public deleteMessages(messageIds: number[]) {
        messageIds.forEach((msgId) => {
            const msg = this.messagesById[msgId];
            if (!msg) {
                return;
            }
            const msgPos = this.folderMessageLists[msg.folder].findIndex((m) => msg.id == m.id);
            if (msgPos > -1 ) {
                this.folderMessageLists[msg.folder]
                    .splice(msgPos, 1);
                this.folderCounts[msg.folder].total--;
                if (!msg.seenFlag) {
                    this.folderCounts[msg.folder].unread--;
                }
            }

            // Not already in trash so move it there:
            if (msg.folder != this.trashFolderName) {
                // reinsert into trash (assuming we've loaded trash)
                if (this.folderMessageLists[this.trashFolderName]) {
                    const msgNewIndex = this.folderMessageLists[this.trashFolderName].findIndex((m) => msg.id > m.id);
                    if (msgNewIndex > -1) {
                        this.folderMessageLists[this.trashFolderName]
                            .splice(msgNewIndex, 0, msg);
                    } else {
                        this.folderMessageLists[this.trashFolderName].push(msg);
                    }
                }

                this.folderCounts[this.trashFolderName].total++;
                if (!msg.seenFlag) {
                    this.folderCounts[this.trashFolderName].unread++;
                }
            }
        });
        this.folderMessageCountSubject.next(this.folderCounts);
    }

    public fetchFolderMessages() {
        if (this.fetchInProgress) {
            return;
        }
        this.fetchInProgress = true;
        const folder = this.currentFolder;
        if (!this.folderMessageLists[folder]) {
            this.folderMessageLists[folder] = [];
        }
        const messageList = this.folderMessageLists[folder];
        const sinceid = messageList.length > 0 ? messageList[messageList.length - 1].id : 0;
        this.rmmapi.listAllMessages(0, sinceid, 0,
            RunboxWebmailAPI.LIST_ALL_MESSAGES_CHUNK_SIZE
            , true, folder)
            .pipe(
                map((messages) => messages.filter(m => m.deletedFlag ? false : true)),
                catchError((e) => {
                    this.fetchInProgress = false;
                    return observableThrowError(e);
                }))
            .subscribe((res) => {
                if (res && res.length > 0) {
                    this.folderMessageLists[folder] = messageList.concat(res);
                    res.forEach((m: MessageInfo) => this.messagesById[m.id] = m);
                }
                this.messagesInViewSubject.next(this.folderMessageLists[this.currentFolder]);
                this.fetchInProgress = false;
            });
    }
}
