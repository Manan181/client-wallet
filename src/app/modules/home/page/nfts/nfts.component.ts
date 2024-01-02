import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { TransactionService } from 'src/app/data/service/transaction.service';
import { TokenBalanceParams } from 'src/app/models/transaction';
import { StorageService } from 'src/app/shared/service/storage.service';
import { AddNftModalComponent } from '../add-nft-modal/add-nft-modal.component';

@Component({
    selector: 'app-nfts',
    templateUrl: './nfts.component.html',
    styleUrls: ['./nfts.component.css']
})
export class NftsComponent {
    @Input() accountBal: number;
    @Input() accountAddress: string;
    nfts: any[] = [];

    constructor(private storageService: StorageService, public dialog: MatDialog, private transactionService: TransactionService) {}

    async ngOnInit() {
        await this.initNfts();
    }

    async initNfts(): Promise<void> {
        await this.storageService.getAllObjects('nfts', async objects => {
            const newNfts = objects;
            const uniqueNfts = newNfts.filter(newNft => !this.nfts.some(existingNft => existingNft.symbol === newNft.symbol));
            this.nfts = this.nfts.concat(uniqueNfts);
            for (const nft of uniqueNfts) {
                let tokenBalance: number;
                let params: TokenBalanceParams = {
                    module: 'account',
                    action: 'tokenbalance',
                    contractaddress: nft.contractAddress,
                    address: this.accountAddress,
                    tag: 'latest'
                };
                if (params.contractaddress.length > 0 && params.address.length > 0) {
                    let response = await firstValueFrom(this.transactionService.getTokenBalance(params));
                    tokenBalance = Number(response.result);
                } else {
                    tokenBalance = Number(this.accountBal);
                }
                nft.balance = tokenBalance;
            }
        });
    }

    async importNftModal() {
        const dialogRef = this.dialog.open(AddNftModalComponent, {
            width: '250px',
            hasBackdrop: true,
            disableClose: false,
            data: {}
        });
        dialogRef.afterClosed().subscribe(() => {
            this.initNfts();
        });
    }
}
