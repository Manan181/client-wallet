// import { Injectable, OnDestroy, OnInit } from '@angular/core';
// import { Core } from '@walletconnect/core';
// import { Web3Wallet } from '@walletconnect/web3wallet';
// import { Subscription } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class WalletConnectService implements OnInit, OnDestroy {
//     core;
//     web3wallet;
//     private subscriptions: Subscription[] = [];

//     constructor() {
//         console.log('constructing');
//         this.initialize();
//     }

//     ngOnInit() {
//         this.initialize();
//     }

//     ngOnDestroy(): void {
//         console.log('destroyed');
//         this.subscriptions.forEach(subscription => subscription.unsubscribe());
//     }

//     async initialize() {
//         console.log('initializing');
//         this.core = new Core({
//             projectId: 'dbc7fac0e707801a8f9c8813f4653701', // bef1db6c71e4c022d5cfa260f8e95e58, dbc7fac0e707801a8f9c8813f4653701
//             relayUrl: 'wss://relay.walletconnect.com'
//         });

//         this.web3wallet = await Web3Wallet.init({
//             core: this.core,
//             metadata: {
//                 name: 'Demo app',
//                 description: 'Demo Client as Wallet/Peer',
//                 url: 'http://localhost:4200/',
//                 icons: []
//             }
//         });
//         console.log('🚀 ~ file: wallet-connect.service.ts:40 ~ WalletConnectService ~ initialize ~ web3wallet:', this.web3wallet);

//         this.web3wallet.on('session_proposal', async proposal => {
//             console.log('🚀 ~ file: wallet-connect.service.ts:48 ~ WalletConnectService ~ initialize ~ proposal:', proposal);
//             const session = await this.web3wallet.approveSession({
//                 id: proposal.id
//                 // namespaces
//             });
//         });
//     }

//     async startPairing(uri) {
//         await this.core.pairing.pair({ uri: 'http://localhost:4200/' });

//         await this.web3wallet.respondSessionRequest({
//             topic: 'topic',
//             response: 'response'
//         });
//     }
// }
