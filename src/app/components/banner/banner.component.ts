import { OnInit, Component } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent  implements OnInit {
public walletConnected: boolean = false;
public walletId: string = '';
public accounts: any;

  constructor(
    private walletService: WalletService, 
    private messageService: MessageService,
    private messageServiceNotInstalled: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router) {}


  handleUpload() {
    if (this.walletConnected) {
      this.router.navigate(['/upload']);
    } else {
      this.alert();
    }
  }

  checkWalletConnected = async () => {
    try {
      // Check if the wallet is installed and get accounts
      this.accounts = await this.walletService.checkWalletConnected();
      // If the wallet is not installed, exit the function
      if (this.walletService.notInstalled) {
        return;
      }
      // If accounts are connected
      if (this.accounts.length > 0) {
        this.walletConnected = true;
        this.walletId = this.accounts[0];
        localStorage.setItem("accountId", this.walletId);
      } else {
        // If no accounts are connected, remove the account ID from localStorage
        this.walletConnected = false;
        localStorage.removeItem("accountId");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.checkWalletConnected();
  }

  connectToWallet  = () => {
    this.walletService.connectWallet();
    if(this.walletService.notInstalled)
      this.alertNotInstalled();
  }

  alert() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'error', 
    summary:'You need to connect your wallet.',
      detail:'Connect it now?'});
  }

  onConfirm() {
    this.connectToWallet();
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }
    
  clear() {
    this.messageService.clear();
  } 


  alertNotInstalled() {
    this.messageServiceNotInstalled.clear();
    this.messageServiceNotInstalled.add({key: 'n', sticky: true, severity:'error', 
    summary:'You need to have MetaMask installed in your browser.',
     detail:'Install it now?'});
  }

  onConfirmNotInstalled() {
    window.open("https://metamask.io/download/", "_blank");
    this.messageServiceNotInstalled.clear('n');
  }

  onRejectNotInstalled() {
    this.messageServiceNotInstalled.clear('n');
  }
    
  clearNotInstalled() {
    this.messageServiceNotInstalled.clear();
  } 

}
