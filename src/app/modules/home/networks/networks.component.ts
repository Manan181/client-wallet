import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-networks',
    templateUrl: './networks.component.html',
    styleUrls: ['./networks.component.css']
})
export class NetworksComponent {
    constructor(public dialog: MatDialog) {}

    closeDialog(): void {
        this.dialog.closeAll();
    }
}
