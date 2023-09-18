import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { AccountBalanceParams, AccountBalanceResponse, TransactionListResponse, TransactionParams, TokenBalanceParams } from '../../models/transaction';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    constructor(private http: HttpClient) {}

    getAllTransactions(params: TransactionParams): Observable<TransactionListResponse> {
        try {
            let apiUrl: string;
            if (params.page && params.offset) {
                apiUrl = `${environment.etherscanApiUrl}?module=${params.module}&action=${params.action}&address=${params.address}&startblock=${params.startblock}&endblock=${params.endblock}&page=${params.page}&offset=${params.offset}&sort=${params.sort}&apikey=${environment.etherscanApiKey}`;
            } else {
                apiUrl = `${environment.etherscanApiUrl}?module=${params.module}&action=${params.action}&address=${params.address}&startblock=${params.startblock}&endblock=${params.endblock}&sort=${params.sort}&apikey=${environment.etherscanApiKey}`;
            }
            return this.http.get<TransactionListResponse>(apiUrl).pipe(
                timeout(environment.apiTimeout),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        return throwError('Request timed out');
                    }
                    return throwError('Something went wrong');
                })
            );
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    getAccountBalance(params: AccountBalanceParams): Observable<AccountBalanceResponse> {
        try {
            const apiUrl = `${environment.etherscanApiUrl}?module=${params.module}&action=${params.action}&address=${params.address}&tag=${params.tag}&apikey=${environment.etherscanApiKey}`;
            return this.http.get<AccountBalanceResponse>(apiUrl).pipe(
                timeout(environment.apiTimeout),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        return throwError('Request timed out');
                    }
                    return throwError('Something went wrong');
                })
            );
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    getTokenBalance(params: TokenBalanceParams): Observable<AccountBalanceResponse> {
        try {
            const apiUrl = `${environment.etherscanApiUrl}?module=${params.module}&action=${params.action}&contractaddress=${params.contractaddress}&address=${params.address}&tag=${params.tag}&apikey=${environment.etherscanApiKey}`;
            return this.http.get<AccountBalanceResponse>(apiUrl).pipe(
                timeout(environment.apiTimeout),
                catchError(error => {
                    if (error.name === 'TimeoutError') {
                        return throwError('Request timed out');
                    }
                    return throwError('Something went wrong');
                })
            );
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
