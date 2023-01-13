import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(){
    return this.httpClient.get('http://127.0.0.1:8082/api/users');
  }

  register(user: User){
    return this.httpClient.post('http://127.0.0.1:8082/api/users/register', user);
  }

  login(user: User){
    return this.httpClient.post('http://127.0.0.1:8082/api/users/login', user);
  }

  user(id: any){
    return this.httpClient.get('http://127.0.0.1:8082/api/users/'+id);
  }

  logout(){
    return this.httpClient.get('http://127.0.0.1:8082/api/users/logout');
  }
}
