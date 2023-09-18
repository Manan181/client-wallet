import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/service/storage/storage.service';

@Component({
    selector: 'app-tokens',
    templateUrl: './tokens.component.html',
    styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {
    tokens: any[];

    constructor(private storageService: StorageService) {}

    async ngOnInit() {
        await this.storageService.getAllObjects('tokens', objects => {
            if (objects.length > 0) {
                this.tokens = objects;
            }
        });
    }
}
