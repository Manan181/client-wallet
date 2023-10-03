import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/shared/service/storage/storage.service';
import { AddTokenModalComponent } from '../add-token-modal/add-token-modal.component';
import { TransactionService } from 'src/app/data/service/transaction.service';
import { TokenBalanceParams } from '../../../../models/transaction';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-tokens',
    templateUrl: './tokens.component.html',
    styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
    @Input() accountBal: number;
    @Input() accountAddress: string;
    tokens: any[] = [];

    constructor(private storageService: StorageService, public dialog: MatDialog, private transactionService: TransactionService) {}

    async ngOnInit() {
        await this.initTokens();
    }

    async initTokens(): Promise<void> {
        await this.storageService.getAllObjects('tokens', async objects => {
            const newTokens = objects;
            const uniqueTokens = newTokens.filter(newToken => !this.tokens.some(existingToken => existingToken.symbol === newToken.symbol));
            this.tokens = this.tokens.concat(uniqueTokens);
            for (const token of uniqueTokens) {
                let tokenBalance: number;
                let params: TokenBalanceParams = {
                    module: 'account',
                    action: 'tokenbalance',
                    contractaddress: token.contractAddress,
                    address: this.accountAddress,
                    tag: 'latest'
                };
                if (params.contractaddress.length > 0 && params.address.length > 0) {
                    let response = await firstValueFrom(this.transactionService.getTokenBalance(params));
                    tokenBalance = Number(response.result);
                } else {
                    tokenBalance = Number(this.accountBal);
                }
                token.balance = tokenBalance;
            }
        });
    }

    async importTokenModal() {
        const dialogRef = this.dialog.open(AddTokenModalComponent, {
            width: '250px',
            hasBackdrop: true,
            disableClose: false,
            data: {}
        });
        dialogRef.afterClosed().subscribe(() => {
            this.initTokens();
        });
    }
}
