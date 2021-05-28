import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router){

  }
  canActivate() {
    if(!this.authService.isLoggedIn) {
      this.navigateLogin();
    }
    return this.authService.isLoggedIn;
  }
  private navigateLogin() {
    this.router.navigate(['account/login'])
  }

 
}
