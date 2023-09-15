import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    constructor() {}

    encrypt(data): string {
        const jsonString = JSON.stringify(data);
        const encryptedData = CryptoJS.AES.encrypt(jsonString, environment.passwordSecret);
        return encryptedData.toString();
    }

    decrypt(encryptedData: string): string {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, environment.passwordSecret);
        const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    }
}
