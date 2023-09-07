import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/data/schema/transaction';

@Component({
    selector: 'app-transaction-item',
    templateUrl: './transaction-item.component.html',
    styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {
    @Input() transaction: Transaction;
    explorerUrl: string;

    constructor() {}

    ngOnInit(): void {
        this.explorerUrl = `https://sepolia.etherscan.io/tx/${this.transaction.hash}`;
        if (this.transaction && this.transaction.to.length > 0 && this.transaction.input === '0x') {
            
        }
    }
}
