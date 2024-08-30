import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
    const userId = localStorage.getItem('accountId');
    if (userId) {
      return true; // Allow navigation to the route
    } else {
      this.router.navigate(['/']); // Redirect to the home page
      return false; // Prevent navigation to the route
    }
  }
  
}
