import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private dbName: string = 'wallet';
    private dbVersion: number = 1;
    private db: IDBDatabase;

    constructor() {
        // Initialize the IndexedDB database when the service is created.
        this.initializeDatabase();
    }

    /**
     * Initializes the IndexedDB database.
     */
    async initializeDatabase() {
        try {
            this.db = await this.openDatabase();
        } catch (error) {
            console.error('Error opening database:', error);
        }
    }

    /**
     * Opens the IndexedDB database and handles versioning and object store creation.
     * @returns A Promise resolving to the opened IDBDatabase.
     */
    private async openDatabase(): Promise<IDBDatabase> {
        return new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onsuccess = event => {
                const db = (event.target as IDBOpenDBRequest).result;
                resolve(db);
            };

            request.onupgradeneeded = event => {
                this.db = (event.target as IDBOpenDBRequest).result;
                if (!this.db.objectStoreNames.contains('accounts')) {
                    this.db.createObjectStore('accounts', { keyPath: 'id', autoIncrement: true });
                }
                if (!this.db.objectStoreNames.contains('auth')) {
                    this.db.createObjectStore('auth', { keyPath: 'token' });
                }
                if (!this.db.objectStoreNames.contains('wallet')) {
                    this.db.createObjectStore('wallet', { keyPath: 'wallet' });
                }
                if (!this.db.objectStoreNames.contains('walletCreated')) {
                    this.db.createObjectStore('walletCreated', { keyPath: 'id' });
                }
                if (!this.db.objectStoreNames.contains('tokens')) {
                    this.db.createObjectStore('tokens', { keyPath: 'token' });
                }
                if (!this.db.objectStoreNames.contains('networks')) {
                    this.db.createObjectStore('networks', { keyPath: 'network' });
                }
            };

            request.onerror = event => {
                reject((event.target as IDBOpenDBRequest).error);
                console.error('Database error:', (event.target as IDBOpenDBRequest).error);
            };
        });
    }

    /**
     * Adds an object to the specified object store in the database.
     * @param storeName - The name of the object store.
     * @param object - The object to add to the store.
     */
    public addObject(storeName: string, object: any) {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(object);
    }

    /**
     * Retrieves all objects from the specified object store in the database.
     * @param storeName - The name of the object store.
     * @param callback - A callback function to handle the retrieved objects.
     */
    public async getAllObjects(storeName: string, callback: (objects: any[]) => void) {
        if (!this.db) {
            await this.openDatabase();
        }
        const transaction = this.db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = event => {
            const objects = request.result;
            callback(objects);
        };
    }

    /**
     * Clears all data in the specified object store in the database.
     * @param storeName - The name of the object store to clear.
     */
    public clearStore(storeName: string) {
        const transaction = this.db.transaction(storeName, 'readwrite');

        transaction.onerror = event => {
            console.error('Error clearing the database:', (event.target as IDBTransaction).error);
        };

        transaction.objectStore(storeName).clear();
    }
}
