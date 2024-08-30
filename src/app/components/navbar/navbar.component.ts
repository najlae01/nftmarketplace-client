import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { WalletService } from 'src/app/services/wallet.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService]
  
})
export class NavbarComponent implements OnInit {
public items: MenuItem[];
public walletConnected: boolean = false;
private walletSubscription: Subscription;

public walletId: string = '';
public toSearch: any;
public accounts: any;

constructor(
  private walletService: WalletService, 
  private messageService: MessageService,
  private primengConfig: PrimeNGConfig,
  private router: Router) { 

  this.walletSubscription = new Subscription();
  
  this.items = [
        {
            label: 'HOME',
            routerLink: '/'
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

  updateMenuItemsVisibility(){
    if(this.walletConnected ){
      this.items[1].visible = true;
      this.items[2].visible = false;
      this.items[3].visible = true;
      this.items[4].visible = true;
      return true
    }else{
      this.items[1].visible = false;
      this.items[2].visible = true;
      this.items[3].visible = false;
      this.items[4].visible = false;
      return true
    }
  }


  ngOnInit() {
    this.primengConfig.ripple = true;
    this.checkWalletConnected();
    
    // Subscribe to wallet connection changes
    this.walletSubscription = this.walletService.walletConnected$.subscribe((connected) => {
      this.walletConnected = connected;
      this.updateMenuItemsVisibility();
    });

    // Listen to route changes to trigger updates if needed
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMenuItemsVisibility();
      }
    });
  }

  ngOnDestroy() {
    if (this.walletSubscription) {
      this.walletSubscription.unsubscribe();
    }
  }

    alert() {
        this.messageService.clear();
        this.messageService.add({key: 'c', sticky: true, severity:'error', 
        summary:'You need to have MetaMask installed in your browser.',
         detail:'Install it now?'});
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

}
