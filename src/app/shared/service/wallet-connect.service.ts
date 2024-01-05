import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Core } from '@walletconnect/core';
import { Web3Wallet, Web3WalletTypes } from '@walletconnect/web3wallet';
import { Subscription } from 'rxjs';
import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils';

@Injectable({
    providedIn: 'root'
})
export class WalletConnectService implements OnInit, OnDestroy {
    core;
    web3wallet;
    private subscriptions: Subscription[] = [];

    constructor() {
        console.log('constructing');
        this.initialize();
    }

    ngOnInit() {
        this.initialize();
    }

    ngOnDestroy(): void {
        console.log('destroyed');
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    async initialize() {
        console.log('initializing');
        this.core = new Core({
            projectId: 'dbc7fac0e707801a8f9c8813f4653701', // bef1db6c71e4c022d5cfa260f8e95e58, dbc7fac0e707801a8f9c8813f4653701
            relayUrl: 'wss://relay.walletconnect.com'
        });

        this.web3wallet = await Web3Wallet.init({
            core: this.core,
            metadata: {
                name: 'Demo app',
                description: 'Demo Client as Wallet/Peer',
                url: 'https://biz-client-wallet.onrender.com/',
                icons: []
            }
        });
        
        const sessions = this.web3wallet.getActiveSessions();
        const sessionsArray = Object.values(sessions);
        console.log('🚀 ~ file: wallet-connect.service.ts:51 ~ WalletConnectService ~ initialize ~ sessions:', sessions);
        console.log('🚀 ~ file: wallet-connect.service.ts:52 ~ WalletConnectService ~ initialize ~ sessionsArray:', sessionsArray);
        this.web3wallet.on('session_proposal', this.onSessionProposal);
    }

    async onSessionProposal(proposal) {
        console.log('🚀 ~ file: wallet-connect.service.ts:53 ~ WalletConnectService ~ onSessionProposal ~ proposal:', proposal);
        try {
            const approvedNamespaces = buildApprovedNamespaces({
                proposal: proposal.params,
                supportedNamespaces: {
                    eip155: {
                        chains: ['eip155:1', 'eip155:11155111'],
                        methods: ['eth_sendTransaction', 'personal_sign'],
                        events: ['accountsChanged', 'chainChanged'],
                        accounts: ['eip155:1:0x88588D081f41bB1e7C6357a00E98e402e6f27BC9', 'eip155:11155111:0x88588D081f41bB1e7C6357a00E98e402e6f27BC9']
                    }
                }
            });
            console.log('🚀 ~ file: wallet-connect.service.ts:66 ~ WalletConnectService ~ onSessionProposal ~ approvedNamespaces:', approvedNamespaces);
            const session = await this.web3wallet.approveSession({
                id: proposal.id,
                relayProtocol: proposal.params.relays[0].protocol,
                namespaces: approvedNamespaces
            });
            console.log('🚀 ~ file: wallet-connect.service.ts:72 ~ WalletConnectService ~ onSessionProposal ~ session:', session);
        } catch (error) {
            await this.web3wallet.rejectSession({
                id: proposal.id,
                reason: getSdkError('USER_REJECTED')
            });
        }
    }

    async startPairing(uri) {
        await this.web3wallet.pair({ uri });

        await this.web3wallet.respondSessionRequest({
            topic: 'topic',
            response: 'response'
        });
    }
}
