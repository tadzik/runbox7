import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RunboxCalendar } from './runbox-calendar';
import { RunboxCalendarEvent } from './runbox-calendar-event';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';

@Component({
    selector: 'app-calendar-colour-selector-dialog-component',
    templateUrl: 'color-selector-dialog.component.html',
})
export class ColorSelectorDialogComponent {
    colors = [
        'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige',
        'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood',
        'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk',
        'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray',
        'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen',
        'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
        'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet',
        'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick',
        'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold',
        'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink',
        'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen',
        'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow',
        'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen',
        'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow',
        'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue',
        'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue',
        'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue',
        'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive',
        'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen',
        'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum',
        'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon',
        'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
        'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal',
        'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke',
        'yellow', 'yellowgreen'
        // We need the filter until https://github.com/sabre-io/dav/issues/1144 is fixed
    ].filter(n => n.length <= 10);

    selected: string;

    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<ColorSelectorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string[]
    ) {
        if (data) {
            this.selected = data[0];
        }
    }

    onSurpriseMeClick(): void {
        const pick = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.dialogRef.close(pick);
    }
}
