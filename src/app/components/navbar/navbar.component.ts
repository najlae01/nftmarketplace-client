import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
  
})
export class NavbarComponent implements OnInit {
public items: MenuItem[];
public walletConnected: boolean = false;
public walletId: string = '';
public toSearch: any;
public accounts: any;

constructor(private walletService: WalletService, private messageService: MessageService, private primengConfig: PrimeNGConfig) { 
  
  this.items = [
        {
            label: 'HOME',
            routerLink: '/'
        },
        {
            label: 'MARKETPLACE'
        },
        {
            label: 'MY NFTS',
            routerLink: '/mynfts',
            visible: true
        },
        {
            label: 'CONNECT',
            command: () => this.connectToWallet(),
            visible: true
        },
        {
          label: '',
          icon:'pi pi-shopping-cart',
          visible: true
        },
        {
          label: '',
          icon:'pi pi-wallet',
          visible: true
        }
        /*
        {
            label: 'LOGOUT',
            icon: 'pi pi-power-off',
            command: () => this.logout(),
            visible: false
        }*/
    ];
  }
connectToWallet  = () => {
    this.walletService.connectWallet();
    if(this.walletService.notInstalled)
      this.alert()
  }

  checkWalletConnected = async () => {
    this.accounts = await this.walletService.checkWalletConnected();
    if(this.walletService.notInstalled)
      return;
    if(this.accounts.length > 0){
      this.walletConnected = true;
      this.walletId = this.accounts[0];
      localStorage.setItem("accountId", this.walletId)
    }else{
      localStorage.removeItem("accountId");
    }
  }

  checkVisibility(){
    if(this.walletConnected ){
      this.walletConnected = true;
      this.items[2].visible = true;
      this.items[3].visible = false;
      this.items[4].visible = true;
      this.items[5].visible = true;
      return true
    }else{
      this.items[2].visible = false;
      this.items[3].visible = true;
      this.items[4].visible = false;
      this.items[5].visible = false;
      return true
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.checkWalletConnected();
  }

    alert() {
        this.messageService.clear();
        this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'You need to have MetaMask installed in your browser.', detail:'Install it now?'});
    }
    onConfirm() {
        window.open("https://metamask.io/download/", "_blank");
        this.messageService.clear('c');
    }

    onReject() {
        this.messageService.clear('c');
    }
    
    clear() {
        this.messageService.clear();
    } 
/*logout(){
  localStorage.removeItem("accountId");
  this.walletService.disconnectWallet()
  this.walletConnected = false;
  this.items[2].visible = true;
  this.items[3].visible = false;
}*/

}
