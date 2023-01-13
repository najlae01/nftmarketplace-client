import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  public isAuth: boolean = false;

  constructor( private data: UserService) { 
    setTimeout(
      () => {
        this.isAuth = true;
      }
    )
  }


  dt: any;
  imageDirectorypath: any = 'http://127.0.0.1:8000/storage/categories/'
  imageDirectorypathProducts: any = 'http://127.0.0.1:8000/storage/products/'
  categories: any;
  products: any;

  ngOnInit(): void {
  }

}
