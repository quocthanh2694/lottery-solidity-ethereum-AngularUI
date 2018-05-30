import { Injectable } from '@angular/core';
import Web3 from 'web3';
declare var window;

@Injectable({
    providedIn: 'root'
})
export class Web3Service {
    public web3;
    constructor() {


        if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
            // We are in the browser and metamask is running.
            this.web3 = new Web3(window.web3.currentProvider);
        } else {
            // We are on the server *OR* the user is not running metamask
            const provider = new Web3.providers.HttpProvider(
                'https://rinkeby.infura.io/your secret key'
            );
        }
    
    }
}
