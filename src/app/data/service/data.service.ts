import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chain } from 'src/app/models/chains';
import { Account } from 'src/app/models/ether.state';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private fromModuleSubject = new BehaviorSubject<string>('');
    fromModule$ = this.fromModuleSubject.asObservable();

    private selectedAccountSubject = new BehaviorSubject<Account>({ accountName: '', privateKey: '', address: '', balance: 0 });
    selectedAccount$ = this.selectedAccountSubject.asObservable();

    private selectedNetworkSubject = new BehaviorSubject<Chain>({ networkName: '', rpcUrl: '', blockExplorerUrl: '', chainId: '', currencySymbol: '' });
    selectedNetwork$ = this.selectedNetworkSubject.asObservable();

    updateFromModule(module: string) {
        this.fromModuleSubject.next(module);
    }

    updateSelectedAccount(account: Account) {
        this.selectedAccountSubject.next(account);
    }

    updateSelectedNetwork(network: Chain) {
        this.selectedNetworkSubject.next(network);
    }
}
