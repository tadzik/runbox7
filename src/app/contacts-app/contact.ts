export class Email {
    types: string[];
    value: string;
}

export class URI {
    types: string[];
    value: string;
}

export class Phone {
    types: string[];
    value: string;
}

export class Relative {
    types: string[];
    value: string;
}

export class AddressDetails {
    street:      string;
    city:        string;
    region:      string;
    post_code:   string;
    country:     string;
}

export class Address {
    types: string[];
    value: AddressDetails;
}

export class Contact {
    id:         string;

    nickname:   string;
    first_name: string;
    last_name:  string;
    birthday:   string;
    note:       string;
    company:    string;
    department: string;
    categories: string[]   = [];

    emails:     Email[]    = [];
    addresses:  Address[]  = [];
    urls:       URI[]      = [];
    phones:     Phone[]    = [];
    related:    Relative[] = [];

    rmm_backed = false;

    constructor(properties: any) {
        // backcompat with old RMM contacts API
        if (typeof properties['id'] === 'number') {
            properties['id'] = 'RMM-' + properties['id'];
        }
        if (properties['email']) {
            properties['emails'] = [
                { 'types': ['home'], 'value': properties['email'] }
            ];
            delete properties['email'];
        }

        // tslint:disable-next-line:forin
        for (const key in properties) {
            this[key] = properties[key];
        }

        if (this.id && this.id.substr(0, 4) === 'RMM-') {
            this.rmm_backed = true;
        }
    }

    get_rmm_id(): number {
        return Number(this.id.substr(4));
    }

    display_name(): string|null {
        if (this.show_as_company()) {
            return this.company;
        }

        if (this.nickname) {
            const fn = this.full_name();
            const postfix = fn ?  (' (' + fn + ')') : '';
            return this.nickname + postfix;
        }

        return this.full_name();
    }

    full_name(): string {
        if (this.first_name && this.last_name) {
            return this.first_name + ' ' + this.last_name;
        } else if (this.first_name) {
            return this.first_name;
        } else {
            return this.last_name;
        }
    }

    primary_email(): string {
        if (this.emails.length > 0) {
            return this.emails[0].value;
        }
        return null;
    }

    show_as_company(): boolean {
        return this['show_as'] === 'COMPANY';
    }
}
