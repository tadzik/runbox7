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

import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { of, AsyncSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { CartService } from './cart.service';
import { BitpayPaymentDialogComponent } from './bitpay-payment-dialog.component';
import { PaypalPaymentDialogComponent } from './paypal-payment-dialog.component';
import { StripePaymentDialogComponent } from './stripe-payment-dialog.component';
import { PaymentsService } from './payments.service';
import { ProductOrder } from './product-order';

import { RunboxWebmailAPI } from '../rmmapi/rbwebmail';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
    tableColumns = ['name', 'quantity', 'price', 'total-price', 'remove'];

    // the component has two "modes":
    // it either displays the cart items and allows for their manipulation,
    // or allows for a purchase of whatever is specified in the URL (as JSON),
    // in a non-editable form.
    fromUrl = false;
    domregHash: string;

    itemsSubject = new Subject<any[]>();
    total    = new Subject<number>();
    currency = new AsyncSubject<string>();

    constructor(
        private cart:            CartService,
        private dialog:          MatDialog,
        private paymentsservice: PaymentsService,
        private rmmapi:          RunboxWebmailAPI,
        private route:           ActivatedRoute,
        private router:          Router,
    ) {
        this.itemsSubject.subscribe(items => this.calculateTotal(items));
        this.currency = this.paymentsservice.currency;

        this.route.queryParams.subscribe(params => {
            const forParam = params['for'];
            if (forParam) {
                const source = JSON.parse(forParam);
                this.fromUrl = true;
                this.tableColumns = ['name', 'quantity', 'price', 'total-price']; // no 'remove'
                if (source['domregHash']) {
                    // this is a domain purchase: the only supported currency is USD
                    this.domregHash = source['domregHash'];
                    this.currency = new AsyncSubject<string>();
                    this.currency.next('USD');
                    this.currency.complete();
                }
                this.loadProducts(source['items']).then(items => this.itemsSubject.next(items));
            } else {
                this.cart.items.subscribe(items => {
                    this.loadProducts(items).then(loadedItems => {
                        console.log("Got cart items!", loadedItems);
                        this.itemsSubject.next(loadedItems);
                    });
                });
            }
        });
    }

    calculateTotal(items) {
        let total = 0.0;
        for (const i of items) {
            total += i.quantity * i.product.price;
        }
        this.total.next(total);
        console.log("Calculated total is", total);
    }

    // loads `.product` into incoming items, returns the "enriched" list
    // Example:
    // input: [{ pid: 42 }]
    // output: [{ pid: 42, product: { name: "Runbox mini", price: 9.95, ... }}]
    async loadProducts(items: any[]): Promise<any[]> {
        const currency = await this.currency.toPromise();
        const products = await this.rmmapi.getProducts(items.map(i => i.pid), currency).toPromise();
        
        let myItems = JSON.parse(JSON.stringify(items));

        for (const p of products) {
            const item = myItems.find(i => i.pid == p.pid);
            item.product = p;
        }

        return myItems;
    }

    remove(p: ProductOrder) {
        console.log("Removing product", p);
        this.cart.remove(p);
    }

    async initiatePayment(method: string) {
        const currency = await this.currency.toPromise();
        const items    = await this.itemsSubject.pipe(take(1)).toPromise();
        this.rmmapi.orderProducts(items, method, currency, this.domregHash).subscribe(tx => {
            let dialogRef: MatDialogRef<any>;
            if (method === 'stripe') {
                dialogRef = this.dialog.open(StripePaymentDialogComponent, {
                    data: { tx: tx, currency: currency, method: method }
                });
            } else if (method === 'bitpay') {
                dialogRef = this.dialog.open(BitpayPaymentDialogComponent, {
                    data: { tx: tx }
                });
            } else if (method === 'paypal') {
                dialogRef = this.dialog.open(PaypalPaymentDialogComponent, {
                    data: { tx: tx }
                });
            } else if (method === 'giro') {
                this.router.navigateByUrl('/account/receipt/' + tx.tid);
                if (!this.fromUrl) {
                    this.cart.clear();
                }
                return;
            }

            dialogRef.afterClosed().subscribe(paid => {
                if (paid && !this.fromUrl) {
                    this.cart.clear();
                }
            });
        });
    }
}
