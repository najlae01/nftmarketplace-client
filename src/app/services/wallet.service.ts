import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
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
  }
    catch(e){
       throw new Error("No thereum object found")
    }
  }

  public checkWalletConnected = async () => {
    try{
      if(!this.ethereum){
        this.notInstalled = true;
        return;
      }
      this.accounts = await this.ethereum.request({method: 'eth_accounts'});
      return this.accounts;
    }
    catch(e){
      throw new Error("No ethereum object found");
    }
  }

  /*public disconnectWallet = async () => {
    this.accounts = await this.ethereum.request({
          method: "eth_requestAccounts",
          params: [
            {
              eth_accounts: {}
            }
          ]
        });
  }*/
}