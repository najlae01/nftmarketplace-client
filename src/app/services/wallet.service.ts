import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private walletConnectedSubject = new BehaviorSubject<boolean>(false);
  public walletConnected$ = this.walletConnectedSubject.asObservable();
  public accounts: any;
  public ethereum;
  public notInstalled = false;

  constructor() { 
    const {ethereum} = <any>window;
    this.ethereum = ethereum;
  }

  public connectWallet = async () => {
    try {
        if(!this.ethereum){
          this.notInstalled = true;
          return;
        }
        this.accounts = await this.ethereum.request({method: 'eth_requestAccounts'});
        if (this.accounts && this.accounts.length > 0) {
          this.walletConnectedSubject.next(true);
        }
  }
    catch(e){
       throw new Error("No ethereum object found")
    }
  }

  public checkWalletConnected = async () => {
    try{
      if(!this.ethereum){
        this.notInstalled = true;
        return;
      }
      this.accounts = await this.ethereum.request({method: 'eth_accounts'});
      if (this.accounts && this.accounts.length > 0) {
        this.walletConnectedSubject.next(true);
      } else {
        this.walletConnectedSubject.next(false);
      }
      return this.accounts;
    }
    catch(e){
      throw new Error("No ethereum object found");
    }
  }
}