import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AccountsComponent } from 'src/app/modules/home/accounts/accounts.component';
import { NetworksComponent } from 'src/app/modules/home/networks/networks.component';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent {
    currentNetwork = {
        networkName: 'Sepolia',
        rpcUrl: '',
        chainId: '',
        currencySymbol: '',
        blockExplorerUrl: ''
    };
    currentAccount = {
        accountName: 'Account 1',
        accountAddress: '0x88588D081f41bB1e7C6357a00E98e402e6f27BC9',
        accountAmount: 0
    };
    menuItems: any[] = [
        { name: 'Account details', id: 'accountDetails' },
        { name: 'View on explorer', id: 'viewOnExplorer' },
        { name: 'Connected sites', id: 'connectedSites' },
        { name: 'Support', id: 'support' },
        { name: 'Settings', id: 'settings' },
        { name: 'Lock WebWallet', id: 'lockWebWallet' }
    ];

    constructor(private router: Router, private dialog: MatDialog) {}

    openAccountsModal() {
        const dialogRef = this.dialog.open(AccountsComponent, {
            width: '250px',
            hasBackdrop: true,
            disableClose: false,
            data: {}
        });
        dialogRef.afterClosed().subscribe(() => {});
    }

    openNetworksModal() {
        const dialogRef = this.dialog.open(NetworksComponent, {
            width: '250px',
            hasBackdrop: true,
            disableClose: false,
            data: {}
        });
        dialogRef.afterClosed().subscribe(() => {});
    }

    onMenuItemClick(item: string): void {
        switch (item) {
            case 'accountDetails':
            case 'viewOnExplorer':
                this.handleViewOnExplorer();
                break;
            case 'connectedSites':
            case 'support':
            case 'settings':
            case 'lockWebWallet':
        }
    }

    handleViewOnExplorer() {
        const newWindow = window.open('', '_blank');
        newWindow.location.href = `${environment.etherscanExplorerUrl}/address/${this.currentAccount.accountAddress}`;
    }
}
