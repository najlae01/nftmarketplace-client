import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  
})
export class NavbarComponent implements OnInit {
public items: MenuItem[];


constructor() { 
  
  this.items = [
        {
            label: 'HOME',
            routerLink: '/'
        },
        {
            label: 'MARKETPLACE'
        },
        {
          label: 'LOGIN',
          routerLink: '/login'
        },
        {
            label: 'SIGN UP',
            routerLink: '/register'
        },
        {
            label: 'LOGOUT',
            icon: 'pi pi-power-off',
            routerLink: '/logout',
        }
    ];
  }


ngOnInit() {
}

}
