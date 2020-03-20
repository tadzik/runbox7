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

import * as moment from 'moment';

export enum EntryType {
    BUILD,
    CI,
    DOCS,
    FEAT,
    FIX,
    PERF,
    REFACTOR,
    STYLE,
    TEST
}

const typeMapping = {
    'build':    EntryType.BUILD,
    'ci':       EntryType.CI,
    'docs':     EntryType.DOCS,
    'feat':     EntryType.FEAT,
    'fix':      EntryType.FIX,
    'perf':     EntryType.PERF,
    'refactor': EntryType.REFACTOR,
    'style':    EntryType.STYLE,
    'test':     EntryType.TEST
};

export class ChangelogEntry {
    public datetime: moment.Moment;

    constructor(
        public hash:        string,
               datetime:    number,
        public type:        EntryType,
        public component:   string,
        public description: string,
    ) {
        this.datetime = moment(datetime * 1000); // in ms
    }

    get url(): string {
        return `https://github.com/runbox/runbox7/commit/${this.hash}`;
    }
}


// These entries are auto-generated from build-changelog.js.
// Manual edits will be overwritten.
// tslint:disable:quotemark
// BEGIN:AUTOGENERATED
const changes = [
    [
        "ef90f54",
        "1582728986",
        "fix",
        "shopping-cart",
        "Increase quantities in cart when adding duplicate products"
    ],
    [
        "bc4f9f3",
        "1582737676",
        "feat",
        "build",
        "Add an option to enable Sentry monitoring"
    ],
    [
        "d399270",
        "1582803126",
        "feat",
        "app",
        "Add an indicator if the API connection is lost"
    ],
    [
        "72d4d93",
        "1582650205",
        "fix",
        "menu",
        "Bugfix."
    ],
    [
        "be967ed",
        "1582561863",
        "fix",
        "menu",
        "Delint."
    ],
    [
        "2276d18",
        "1582552419",
        "feat",
        "update-notifier",
        "Make the update notifier link to changelog for changes"
    ],
    [
        "e34f447",
        "1582549440",
        "fix",
        "ci",
        "Bump the revision number for commit log tests"
    ],
    [
        "ebfa269",
        "1582547823",
        "fix",
        "mailviewer",
        "Make it possible to reply to emails with no \"To\" header"
    ],
    [
        "409450c",
        "1582324828",
        "feat",
        "payment",
        "Add subscribe link in header for trial accounts."
    ],
    [
        "ab369d6",
        "1582109637",
        "fix",
        "identity",
        "fix lint errors"
    ],
    [
        "68d23e4",
        "1582108624",
        "fix",
        "identity",
        "show \"email\" field grayed in aliases because its readonly"
    ],
    [
        "e374eea",
        "1581701171",
        "fix",
        "identity",
        "set the email field as readonly if its an aliases. aliases email cannot be edited."
    ],
    [
        "47b7af6",
        "1581698494",
        "fix",
        "identity",
        "allow the user to unset the reply_to address in identitys"
    ],
    [
        "309add4",
        "1581684809",
        "feat",
        "account",
        "Distinguish Apple Pay from regular payment methods"
    ],
    [
        "d9e4e34",
        "1581684809",
        "feat",
        "account",
        "Add a way to list and edit available payment methods"
    ],
    [
        "95e518d",
        "1581621544",
        "build",
        "deps",
        "Update angular-calendar"
    ],
    [
        "f1c142d",
        "1581620926",
        "fix",
        "calendar",
        "Add a missing license header to calendar-event-card"
    ],
    [
        "0da999a",
        "1581620926",
        "feat",
        "calendar",
        "show event previews in the import dialog"
    ],
    [
        "2484c98",
        "1581620926",
        "refactor",
        "calendar",
        "refactor event preview card into its own component"
    ],
    [
        "078561c",
        "1581620926",
        "fix",
        "calendar",
        "make sure recurring events are displayed when starting in overview mode"
    ],
    [
        "9df7df3",
        "1581620926",
        "fix",
        "calednar/contacts",
        "fix import dialog popping up repeatedly"
    ],
    [
        "f00e7d1",
        "1581620926",
        "fix",
        "contacts",
        "fix a contact import regression"
    ],
    [
        "4214381",
        "1581620926",
        "fix",
        "calendar",
        "Fix importing events with a METHOD property"
    ],
    [
        "be9f683",
        "1581599903",
        "feat",
        "contacts",
        "Add a way to export contacts"
    ],
    [
        "8c4be7e",
        "1581539397",
        "ci",
        "cypress",
        "Increase the default command timeout"
    ],
    [
        "97b6f79",
        "1581532103",
        "fix",
        "calendar",
        "Make the datetime picker show up again"
    ],
    [
        "7b77a6e",
        "1581527146",
        "fix",
        "contacts",
        "Don't include contacts' nicknames when composing emails to them"
    ],
    [
        "a7721d5",
        "1581521104",
        "feat",
        "contacts",
        "Update contacts incrementally instead of fetching the entire list every time"
    ],
    [
        "020d28a",
        "1581509027",
        "test",
        "lint",
        "Remove obsolete linter rules"
    ],
    [
        "5ccbc93",
        "1581507826",
        "build",
        "e2e",
        "Remove old e2e angular build setup"
    ],
    [
        "4105be6",
        "1581507187",
        "test",
        "cypress",
        "tidy up e2e test locations and setup"
    ],
    [
        "94fcb83",
        "1581504532",
        "test",
        "login",
        "Convert old e2e login tests to cypress"
    ],
    [
        "2b46946",
        "1581501645",
        "test",
        "search",
        "Convert old e2e search tests to cypress"
    ],
    [
        "ffbdb4b",
        "1581449700",
        "test",
        "folders",
        "Port the folder tests to cypress, fixing them in the process"
    ],
    [
        "7a8c97b",
        "1581444632",
        "fix",
        "folder",
        "Prevent duplicate requests during folder operations"
    ],
    [
        "9816843",
        "1581438201",
        "test",
        "compose",
        "Convert old e2e compose tests to cypress"
    ],
    [
        "34bffa4",
        "1581434409",
        "test",
        "canvastable",
        "Convert old e2e canvastable tests to cypress"
    ],
    [
        "c035890",
        "1581428261",
        "test",
        "domreg",
        "Convert old e2e domreg tests to cypress"
    ],
    [
        "3a7016b",
        "1581427525",
        "test",
        "payments",
        "Convert old e2e payment tests to cypress"
    ],
    [
        "0af793b",
        "1581426260",
        "test",
        "calendar",
        "Convert old e2e calendar tests to cypress"
    ],
    [
        "a182d74",
        "1581424329",
        "ci",
        "travis",
        "Update .travis.yml for new e2e setup"
    ],
    [
        "bba8bbc",
        "1581424217",
        "build",
        "deps",
        "Update cypress to 4.0.1"
    ],
    [
        "c2be0c2",
        "1581423480",
        "test",
        "e2e",
        "Run cypress tests by default instead of existing ones"
    ],
    [
        "8523e4a",
        "1581422587",
        "build",
        "deps",
        "Update e2e dependencies"
    ],
    [
        "45bfe56",
        "1581420519",
        "test",
        "cypress-e2e",
        "Add cypress e2e setup with some basic tests for contacts"
    ],
    [
        "8974853",
        "1581365272",
        "build",
        "app",
        "Changes required for Angular 9"
    ],
    [
        "818f664",
        "1581365272",
        "build",
        "deps",
        "Update to Angular 9"
    ],
    [
        "4817569",
        "1581365272",
        "build",
        "deps",
        "Update dependencies"
    ],
    [
        "4d7f368",
        "1581353908",
        "style",
        "menu",
        "Add tooltip to menu items that link to Runbox 6. (#400)"
    ],
    [
        "8877f18",
        "1580419398",
        "build",
        "deps",
        "bump tinymce from 5.0.16 to 5.1.4"
    ],
    [
        "4324b84",
        "1580397445",
        "docs",
        "readme",
        "Update npm commands with npx. (#444)"
    ],
    [
        "78169c1",
        "1579706065",
        "feat",
        "account",
        "Ensure business rules are met before purchase is allowed"
    ],
    [
        "a978215",
        "1579636372",
        "fix",
        "tinymce",
        "replace old compose tinymce with TinyMCEPlugin"
    ],
    [
        "74cda19",
        "1579620894",
        "feat",
        "account",
        "Offer a purchase of Email Hosting when necessary"
    ],
    [
        "af61636",
        "1579576050",
        "feat",
        "email",
        "delete multiple messages"
    ],
    [
        "1b7dfe0",
        "1579545306",
        "style",
        "account",
        "Rename Account Upgrades to Main Account Subscriptions"
    ],
    [
        "34cdcb9",
        "1579539932",
        "feat",
        "changelog",
        "Add a built-in changelog"
    ],
    [
        "0d571bc",
        "1579364032",
        "fix",
        "identities",
        "added matdialog module dependency to fix identities modal."
    ],
    [
        "444da1f",
        "1579000304",
        "style",
        "payment",
        "Make layout more responsive, add button color, and credit card logos."
    ],
    [
        "24a0c8a",
        "1578935410",
        "fix",
        "tinymce",
        "remove RMM from tinymce.plugin.ts"
    ],
    [
        "f0624dd",
        "1578935336",
        "fix",
        "rmm.ts",
        "move TinyMCEPlugin out of rmm.ts"
    ],
    [
        "631cf19",
        "1578768357",
        "fix",
        "auth",
        "dont use type=\"number\" otherwise the form wont get the values"
    ],
    [
        "4f250b7",
        "1578578284",
        "fix",
        "account",
        "Improve error handling in bitpay payment dialog"
    ],
    [
        "8c3a898",
        "1578576969",
        "fix",
        "account",
        "disallow renewal of trial"
    ],
    [
        "3a4f561",
        "1577795829",
        "perf",
        "app",
        "lazy-load non-core modules to improve load times"
    ],
    [
        "1877990",
        "1577576739",
        "fix",
        "lint",
        "fixed line too long lint error"
    ],
    [
        "d61af89",
        "1577575998",
        "fix",
        "identities",
        "move resend_validate_email from profile lister to profile editor"
    ],
    [
        "2484bfa",
        "1577574303",
        "feat",
        "identities",
        "update test to use FromAddress from rmmap/from_address"
    ],
    [
        "15559a3",
        "1577573098",
        "feat",
        "identities",
        "prepare the from_addresses to be used by the compose \"From\" field"
    ],
    [
        "7f8e471",
        "1577572952",
        "feat",
        "identities",
        "created new tinymce class that can be instanciated via RMM class"
    ],
    [
        "a9d0594",
        "1577572817",
        "feat",
        "identities",
        "switched fields positions, added signature support for tinymce"
    ],
    [
        "9a9fda4",
        "1577572664",
        "feat",
        "identities",
        "update draftdesk to use RMM class in refreshForms method"
    ],
    [
        "1d09c70",
        "1577570978",
        "feat",
        "identities",
        "update compose to enable html if signature is html"
    ],
    [
        "3c7a98d",
        "1577570477",
        "feat",
        "identities",
        "move FromAddress class into its own file"
    ],
    [
        "204b227",
        "1577569898",
        "fix",
        "identities",
        "Remove Description from identities overview"
    ],
    [
        "3517b91",
        "1577569882",
        "fix",
        "identitie",
        "Under \"Other identities\" next to \"Add email\" btn, change to \"n identities created\""
    ],
    [
        "d931aeb",
        "1577463614",
        "feat",
        "contacts",
        "Button to select all visible contacts"
    ],
    [
        "59ff56f",
        "1576863015",
        "fix",
        "identitie",
        "Under \"Other identities\", rename button \"Add email\" to \"Add identity\""
    ],
    [
        "d198c5d",
        "1576772266",
        "build",
        "deps",
        "Update webdriver-manager for new chromium versions"
    ],
    [
        "c269a66",
        "1576771367",
        "fix",
        "contacts",
        "Make the address form display correctly"
    ],
    [
        "efe52cc",
        "1576683344",
        "style",
        "print",
        "Add tooltip about printing vs the environment."
    ],
    [
        "d2fb368",
        "1576290169",
        "fix",
        "identities",
        "fix lint problems"
    ],
    [
        "a31c6da",
        "1576285439",
        "feat",
        "identities",
        "added more endpoints related to compose in mockserver"
    ],
    [
        "80308c8",
        "1576280267",
        "fix",
        "identities",
        "import Observable from rxjs instead of rxjs/Rx"
    ],
    [
        "73f305e",
        "1576274850",
        "fix",
        "idenitites",
        "update app.module and profile.module so e2e tests pass"
    ],
    [
        "add4d81",
        "1576264677",
        "fix",
        "identities",
        "move dependencies from app.module into profiles.module"
    ],
    [
        "a9a34cc",
        "1576176865",
        "fix",
        "identities",
        "add missing DevModule to app.module.ts"
    ],
    [
        "717bcc5",
        "1576175997",
        "fix",
        "identities",
        "import profiles module in app module"
    ],
    [
        "1b378ea",
        "1576174438",
        "fix",
        "identities",
        "add a type to data attribute"
    ],
    [
        "9161818",
        "1576172204",
        "fix",
        "identities",
        "return of to always return an observable via this method"
    ],
    [
        "0ac0868",
        "1576155138",
        "fix",
        "identities",
        "add Observable to load"
    ],
    [
        "9ae2eb1",
        "1576153002",
        "fix",
        "identities",
        "re-add required components to NgModule"
    ],
    [
        "37f9795",
        "1576089025",
        "fix",
        "idenitties",
        "fixed more review points and lint problems"
    ],
    [
        "bbfa515",
        "1576088885",
        "fix",
        "identities",
        "re-added these lines because it does not work without them here it seems"
    ],
    [
        "dee23f6",
        "1575961718",
        "fix",
        "travis",
        "fix travis errors"
    ],
    [
        "2377251",
        "1575957116",
        "fix",
        "profiles",
        "fix lint and merge review suggestions"
    ],
    [
        "d14169f",
        "1575955120",
        "fix",
        "appmodule",
        "removed unecessary imports from app.module.ts"
    ],
    [
        "334bc24",
        "1575953558",
        "fix",
        "lint",
        "identities lint problems fix"
    ],
    [
        "4fa195c",
        "1575750346",
        "fix",
        "compose",
        "use profiles signature"
    ],
    [
        "c7b377f",
        "1575747126",
        "fix",
        "profiles",
        "fixing profiles to compile"
    ],
    [
        "265e0d1",
        "1575742830",
        "feat",
        "identities",
        "identities"
    ],
    [
        "0ff194d",
        "1575633683",
        "build",
        "deps",
        "Update some dependencies"
    ],
    [
        "a5db0d3",
        "1575633175",
        "feat",
        "account",
        "Add a page for Paypal billing agreements"
    ],
    [
        "66c34c8",
        "1575632503",
        "feat",
        "account",
        "Allow enabling/disabling product autorenewal"
    ],
    [
        "e2db28d",
        "1575564524",
        "style",
        "intro",
        "Update introductory welcome text."
    ],
    [
        "7e07ab8",
        "1575383249",
        "style",
        "payments",
        "Keep the ZIP field underline from overflowing the form"
    ],
    [
        "f6c1bcb",
        "1575381183",
        "fix",
        "payments",
        "Improve error reporting for Stripe in some edge cases"
    ],
    [
        "1ac674f",
        "1575311869",
        "fix",
        "canvastable",
        "Keep columns from overlapping in the wrapped view"
    ],
    [
        "7f69e8e",
        "1575307453",
        "refactor",
        "rmmapi",
        "Switch to the new, faster REST endpoint for moving messages"
    ],
    [
        "80760d6",
        "1575283863",
        "style",
        "account",
        "Fix wording on the subscription page"
    ],
    [
        "7329b9a",
        "1575283389",
        "fix",
        "dkim",
        "add missing dot in dkim page > dns zone file"
    ],
    [
        "8fc3b16",
        "1575116953",
        "fix",
        "folders",
        "Make folders show up on old versions of Edge"
    ],
    [
        "5abe9e9",
        "1575045336",
        "style",
        "canvastable",
        "Fix overflow and adjustment of column headers"
    ],
    [
        "f32c1da",
        "1575041177",
        "feat",
        "account-products",
        "Only allow one subscription order at a time"
    ],
    [
        "9896cdc",
        "1575036646",
        "fix",
        "calendar",
        "Don't try to import events when user cancelled it"
    ],
    [
        "54bb5ee",
        "1575034297",
        "feat",
        "account-app",
        "Offer a redirect back to rmm6 if stripe payment form fails to load"
    ],
    [
        "abb66e0",
        "1575031474",
        "style",
        "update-notifier",
        "Make the version wording a bit more understandable"
    ],
    [
        "b3cc2ba",
        "1575026468",
        "style",
        "login",
        "Improve layout of login area. Move progress bar to footer."
    ],
    [
        "2f21669",
        "1574958021",
        "fix",
        "canvastable",
        "Make sure column widths are remembered and respected"
    ],
    [
        "fe0693f",
        "1574956692",
        "refactor",
        "webmail",
        "remove unused column widths code from AppComponent"
    ],
    [
        "7a6e340",
        "1574950551",
        "fix",
        "canvastable",
        "Fix scrolling with keyboard bindings"
    ],
    [
        "abefe2c",
        "1574783071",
        "feat",
        "update-notifier",
        "Include build time in appData"
    ],
    [
        "e58d15b",
        "1574780568",
        "feat",
        "update-notifier",
        "Include commit hash in app update data"
    ],
    [
        "28606b5",
        "1574774285",
        "feat",
        "calendar",
        "add overview -- a new calendar view mode"
    ],
    [
        "c534aac",
        "1574683303",
        "fix",
        "contacts",
        "make sure no details are leftover when switching between contacts"
    ],
    [
        "4bf0200",
        "1574681860",
        "feat",
        "contacts",
        "Add a way to select (and delete) multiple contacts"
    ],
    [
        "0eed26c",
        "1574676741",
        "style",
        "contacts",
        "make each row in contacts editor a flexbox"
    ],
    [
        "edf51a4",
        "1574673994",
        "fix",
        "folderlist",
        "handle draft subfolders"
    ],
    [
        "76ba8c3",
        "1574673570",
        "docs",
        "contributing",
        "Update TOC"
    ],
    [
        "2b7a221",
        "1574487772",
        "style",
        "login",
        "Improve style of error message and make layout more consistent."
    ],
    [
        "cef7878",
        "1574430474",
        "fix",
        "login",
        "Re-add the specialized expired account error"
    ],
    [
        "1296ecb",
        "1574370845",
        "fix",
        "authguard",
        "don't push users out to login if they're merely expired"
    ],
    [
        "163d88f",
        "1574346008",
        "style",
        "webmail",
        "Hide nav submenu in mobile view"
    ],
    [
        "0b65c8f",
        "1574345196",
        "feat",
        "contacts",
        "Implement a basic mobile view for Contacts"
    ],
    [
        "84b6c47",
        "1574232330",
        "feat",
        "login",
        "include checkbox option to use legacy and stay logged in"
    ],
    [
        "0d6b92c",
        "1574198440",
        "fix",
        "login",
        "fix lint"
    ],
    [
        "a746eb5",
        "1574177409",
        "fix",
        "dkim",
        "Change \"CNAME in DNS\"\", \"Active\" selector2 active date."
    ],
    [
        "32525ff",
        "1574092979",
        "fix",
        "login",
        "use this.handleLoginError in handleLoginResponse"
    ],
    [
        "89be95e",
        "1573947642",
        "fix",
        "login",
        "simplify login error messages"
    ],
    [
        "be9520b",
        "1573928680",
        "build",
        "dependencies",
        "update package-lock.json"
    ],
    [
        "a37257e",
        "1573928646",
        "fix",
        "Unit",
        "folderlist.component.spec.ts mock for hotkeys added"
    ],
    [
        "64ec6f4",
        "1573924677",
        "feat",
        "HomePage",
        "Add keyboard shortcuts"
    ],
    [
        "8026cf1",
        "1573924645",
        "feat",
        "HomePage",
        "Add keyboard shortcuts"
    ],
    [
        "f69af60",
        "1573848492",
        "style",
        "webmail",
        "Omit \"Deleting...\" feedback message when deleting messages."
    ],
    [
        "f58b874",
        "1573825263",
        "refactor",
        "authguard",
        "Add a fast pass for previously logged in users"
    ],
    [
        "c1fe23e",
        "1573800457",
        "feat",
        "loginerrors",
        "render more login errors"
    ],
    [
        "77aee54",
        "1573745308",
        "feat",
        "tests",
        "Add a ci-runner script and use it in Travis settings"
    ],
    [
        "e3506cb",
        "1573744450",
        "style",
        "menu",
        "Move the logout button to the \"global\" sidenav-menu"
    ],
    [
        "3171fb8",
        "1573669888",
        "style",
        "calendar",
        "make sure datepicker is usable in mobile view"
    ],
    [
        "0a861d0",
        "1573669866",
        "fix",
        "calendar",
        "make sure first-day-of-week settings are respected in event editor"
    ],
    [
        "40df944",
        "1573668248",
        "style",
        "calendar",
        "Make the calendar header more concise in mobile view"
    ],
    [
        "2d882ed",
        "1573665884",
        "style",
        "calendar",
        "Disable custom day template in mobile view"
    ],
    [
        "4abe522",
        "1573575906",
        "fix",
        "account-app",
        "Use ngOnInit consistently when loading async resources"
    ],
    [
        "c14aac7",
        "1573568860",
        "fix",
        "cart",
        "Don't perform async queries before the component is fully initialized"
    ],
    [
        "dfe49e1",
        "1573487344",
        "docs",
        "introductions",
        "Add links to more details about the project. (#348)"
    ],
    [
        "2e3be51",
        "1573486468",
        "feat",
        "menu",
        "Add buttons to navigate between calendar and webmail"
    ],
    [
        "85ea2fa",
        "1573478651",
        "fix",
        "tests",
        "Ensure that xapian is loaded in each testcase"
    ],
    [
        "d0ffd9d",
        "1573476255",
        "fix",
        "unit-tests",
        "Add MobileQueryService to test providers"
    ],
    [
        "3a53c4d",
        "1573475267",
        "fix",
        "contacts",
        "Cap the contacts buffer at 1 to prevent excessive memory usage"
    ],
    [
        "e0144a9",
        "1573475267",
        "fix",
        "contacts",
        "Prevent contact-details from reloading every time contact list reloads"
    ],
    [
        "d4c2d76",
        "1573471024",
        "fix",
        "contacts",
        "Abandon custom routereusestrategy"
    ],
    [
        "f220966",
        "1573466759",
        "fix",
        "calendar",
        "Fix linter errors"
    ],
    [
        "ab161a2",
        "1573466443",
        "fix",
        "account-app",
        "const-ize a variable to make linter happy"
    ],
    [
        "f9d6f52",
        "1573465246",
        "fix",
        "payments",
        "Make the shopping cart more resilient"
    ],
    [
        "7e3251e",
        "1573230634",
        "fix",
        "account-app",
        "Fix total price in shopping cart"
    ],
    [
        "be5c796",
        "1573229944",
        "feat",
        "account-app",
        "Add loading indicators to async elements of account-app"
    ],
    [
        "93bb314",
        "1573211390",
        "test",
        "rmmapi",
        "remove obsolete test assumptions"
    ],
    [
        "18dc94d",
        "1573023063",
        "fix",
        "dkim",
        "the button \"check cname\" now should display for all users"
    ],
    [
        "3ea1b7b",
        "1573012695",
        "feat",
        "README.md",
        "link the Github documentation to tips & tricks page"
    ],
    [
        "4ddb4cd",
        "1572627548",
        "feat",
        "calendar",
        "Make calendar (more) usable on mobile"
    ],
    [
        "e8c518a",
        "1572627548",
        "feat",
        "calendar",
        "allow expanding days from non-current month"
    ],
    [
        "c02d5cd",
        "1572627548",
        "refactor",
        "sidemenu",
        "refactor the sidemenu into its own component"
    ],
    [
        "f2ce8f4",
        "1572627011",
        "refactor",
        "app",
        "extract the mobileQuery into a service"
    ],
    [
        "eb33e58",
        "1572539144",
        "fix",
        "draftdesk",
        "Make sure draft previews don't overflow regardless of when they're created"
    ],
    [
        "04beb7e",
        "1572526335",
        "fix",
        "folderlist",
        "Make sure folders appear in the right order"
    ],
    [
        "81c901b",
        "1572454751",
        "fix",
        "dkim",
        "remove reconfigure option"
    ],
    [
        "f6a56f0",
        "1572451388",
        "fix",
        "httpinterceptor",
        "undo changes in httpinterceptor"
    ],
    [
        "94af34a",
        "1572442577",
        "fix",
        "calendar",
        "make sure toggling calendar visibility refreshes the event list"
    ],
    [
        "68a6efe",
        "1572426602",
        "feat",
        "calendar",
        "Make \"Synchronize calendars\" button more aggresive"
    ],
    [
        "c60113e",
        "1572368558",
        "feat",
        "calendar",
        "Add an activity tracker to monitor calendar queries"
    ],
    [
        "7987e25",
        "1572362180",
        "fix",
        "calendar",
        "refactor/fix the way event times are handled"
    ],
    [
        "164b9c2",
        "1572357709",
        "fix",
        "calendar",
        "don't double-encode calendar cache"
    ],
    [
        "a2242bf",
        "1572356855",
        "fix",
        "calendar",
        "fix changing event from one recurring freq to another"
    ],
    [
        "21e3cb7",
        "1572355885",
        "fix",
        "calendar",
        "fix recurring event settings"
    ],
    [
        "1a21270",
        "1572351944",
        "fix",
        "webmail",
        "don't keep the message pane open when in mobile view"
    ],
    [
        "d2969db",
        "1572351280",
        "style",
        "webmail",
        "adjust preview pane wording"
    ],
    [
        "9c4e9b6",
        "1572280164",
        "fix",
        "webmail",
        "Display viewMode menu even when no local index exists"
    ],
    [
        "5a30155",
        "1572279479",
        "feat",
        "webmail",
        "add an option to toggle the message pane openness"
    ],
    [
        "09a3fa1",
        "1572277440",
        "feat",
        "webmail",
        "Add an option to hide the message pane"
    ],
    [
        "0a51680",
        "1572269645",
        "fix",
        "login",
        "Make sure we're displaying all login errors"
    ],
    [
        "cbb5822",
        "1572268445",
        "test",
        "all",
        "make sure *all* tests are running again"
    ],
    [
        "716277f",
        "1572260992",
        "feat",
        "calendar",
        "add a settings option to clear the local cache"
    ],
    [
        "90cf8d5",
        "1571851107",
        "fix",
        "canvastable",
        "scroll lagging caused by focus"
    ],
    [
        "62ba9ba",
        "1571542164",
        "fix",
        "canvastable",
        "scroll speed, column resize"
    ],
    [
        "dbed608",
        "1571328720",
        "fix",
        "dkim",
        "fix lint errors"
    ],
    [
        "567a6b9",
        "1571325831",
        "style",
        "draftdesk",
        "Add a message to an empty draftdesk"
    ],
    [
        "405a10d",
        "1571325031",
        "fix",
        "calendar",
        "make sure allDay settings are respected"
    ],
    [
        "47bbc7d",
        "1571323867",
        "fix",
        "calendar",
        "prevent calendar visibility from being reset each update"
    ],
    [
        "906d570",
        "1571320989",
        "feat",
        "calendar",
        "Set a default calendar when creating new events"
    ],
    [
        "11b0c34",
        "1571320812",
        "style",
        "calendar",
        "order available calendars alphabetically"
    ],
    [
        "7ff74b7",
        "1571315487",
        "test",
        "all",
        "make sure all tests are running again"
    ],
    [
        "0bb45a3",
        "1571313210",
        "test",
        "e2e",
        "Add basic tests for calendar event creation"
    ],
    [
        "f9b179e",
        "1571290280",
        "fix",
        "dkim",
        "remove cname reconfigure functionality"
    ],
    [
        "4c62549",
        "1571290230",
        "feat",
        "dkim",
        "button to re-check cname in dkim page"
    ],
    [
        "51fb2f9",
        "1571244983",
        "fix",
        "account-app",
        "Implement the missing bits of PaymentRequest handling"
    ],
    [
        "16bd505",
        "1571244548",
        "fix",
        "email-app",
        "Hide the message panel when in compose/drafts"
    ],
    [
        "033f1f7",
        "1571243828",
        "fix",
        "calendar",
        "update event editor for the new API"
    ],
    [
        "54ea906",
        "1571149663",
        "feat",
        "calendar",
        "Implement client-side ical parsing"
    ],
    [
        "e124032",
        "1571063181",
        "test",
        "e2e",
        "extra compose test and root folder creation"
    ],
    [
        "64ace43",
        "1570810524",
        "feat",
        "compose",
        "Attachment upload progress bar indicate filename and filesize."
    ],
    [
        "765c319",
        "1570378912",
        "fix",
        "app",
        "re-add deprecated mobileQuery APIs"
    ],
    [
        "c42c1d6",
        "1570127201",
        "feat",
        "dkim",
        "create button to re-check dkim cnames"
    ],
    [
        "40130d2",
        "1570014789",
        "feat",
        "contacts-app",
        "Keep an offline cache of contacts"
    ],
    [
        "7c77048",
        "1569525279",
        "fix",
        "calendar",
        "Allow to move events between calendars by modifying them"
    ],
    [
        "b9fbfcb",
        "1569504496",
        "build",
        "material",
        "Update to angular/material 8"
    ],
    [
        "7dbfce2",
        "1569497862",
        "build",
        "calendar",
        "Update angular-calendar"
    ],
    [
        "87f5655",
        "1569497228",
        "refactor",
        "compose",
        "Use the native serviceworker bypass feature"
    ],
    [
        "8e4faa7",
        "1569425926",
        "build",
        "app",
        "Update to Angular 8, including required API changes"
    ],
    [
        "2c9d869",
        "1569425925",
        "refactor",
        "progress-service",
        "remove deprecated usage of BrowserXHR"
    ],
    [
        "a8233a3",
        "1569425925",
        "refactor",
        "mailviewer",
        "remove unnecessary use of HttpModule"
    ],
    [
        "15f93cb",
        "1569425925",
        "refactor",
        "searchservice",
        "remove a deprecated use of Injector.get"
    ],
    [
        "4670c0a",
        "1569425925",
        "refactor",
        "webmail",
        "remove deprecated MediaQueryList APIs"
    ],
    [
        "5e3cf47",
        "1569425925",
        "refactor",
        "canvastable",
        "migrate to non-deprecated APIs"
    ],
    [
        "8145736",
        "1569425925",
        "refactor",
        "all",
        "Remove most deprecated usage of '@angular/http'"
    ],
    [
        "fc4205c",
        "1569336615",
        "fix",
        "tests",
        "Update the commit log test, hopefully for the last time"
    ],
    [
        "330b926",
        "1567685774",
        "fix",
        "folder",
        "make sure folders are handled correctly regadless of order"
    ]
];
// END:AUTOGENERATED

export const changelog: ChangelogEntry[] = changes.map(entry => {
    const type = typeMapping[entry[2]];
    if (type === undefined) {
        throw new Error('Invalid change type in ' + entry);
    }
    return new ChangelogEntry(
        entry[0], parseInt(entry[1], 10), type, entry[3], entry[4]
    );
});