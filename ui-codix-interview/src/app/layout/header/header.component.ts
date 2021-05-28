import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: User;
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logOut() {
    this.authService.logout();
  }
  goProfile(){
    this.router.navigate(['profile'])
  }
}
