import { Component, ViewChild, ElementRef } from '@angular/core';
// import { WalletConnectService } from '../../service/wallet-connect.service';

@Component({
    selector: 'app-wallet-connect',
    templateUrl: './wallet-connect.component.html',
    styleUrls: ['./wallet-connect.component.css']
})
export class WalletConnectComponent {
    walletUri: string;
    @ViewChild('walletURI') walletConnectUri: ElementRef;

    // constructor(public walletConnectService: WalletConnectService) {}

    onSubmit() {
        console.log('clicked', this.walletConnectUri.nativeElement.value);
        if (this.walletConnectUri.nativeElement.value.length > 0) {
            // this.walletConnectService.startPairing(this.walletConnectUri.nativeElement.value);
        }
    }
}
