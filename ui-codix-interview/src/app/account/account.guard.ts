import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(public authService: AuthService,
    private router: Router){

  }
  canActivate() {
    return !this.authService.isLoggedIn;
      
  }

  private isAuth$() {
    return of(this.authService.isLoggedIn).pipe(
      tap(isAuth => {
        if (!isAuth) {
          // this.router.navigate(['/account/login']);
        }
      })
    );
  }
}
