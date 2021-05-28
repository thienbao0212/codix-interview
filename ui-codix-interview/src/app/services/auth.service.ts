import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  userSub = new BehaviorSubject<User>(null);
  user$ = this.userSub.asObservable();
  isLoggedIn;
  isLoggedInSub = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSub.asObservable();
  constructor(private router: Router,
    private http: HttpClient) {
    this.getUserInfo();
    if (this.user) {
      this.loggedInSuccess();
    }
  }

  login(nickName, password) {
    const authObj = { nickName: nickName, password: password }
    return this.http.post<User>(`${environment.api}/users/authenticate`, authObj)
      .pipe(map(user => {
        this.user = user;
        this.router.navigate(['']);
        this.saveUser();
        this.loggedInSuccess();
        return user;
      }));
  }
  register(user: User) {
    return this.http.post<User>(`${environment.api}/users/register`, user)
      .pipe(map(res => {
        if (res.nickName && res.password) {
          this.login(user.nickName, user.password).pipe()
            .subscribe({
              next: () => {
              },
              error: res => {
              }
            });
        }

        return user;
      }));
  }
  loggedInSuccess() {
    this.userSub.next({ ...this.user });
    this.isLoggedIn = true;
    this.isLoggedInSub.next(true);

  }

  logout() {
    sessionStorage.removeItem('user');
    this.isLoggedIn = false;
    this.user = null;
    this.userSub.next(null);
    this.isLoggedInSub.next(false);
    this.router.navigate(['/account']);
  }

  getUserInfo() {
    try {
      this.user = JSON.parse(sessionStorage.getItem('user'));
    } catch (e) {
      this.user = null;
    }
  }
  saveUser() {
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  getUserById(id) {
    return this.http.get<User>(`${environment.api}/users/${id}`,)
      .pipe(map(res => {
        return res;
      }));
  }
  updateUser(user: User) {
    return this.http.put<User>(`${environment.api}/users/${user.id}`, user)
      .pipe(map(res => {
        this.user = user;
        this.saveUser();
        return res;
      }));
  }
}
