import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  // private isloggedIn: boolean;


  constructor(private http: HttpClient) { }

  login(loginParams: any) {
    return this.http.post<User>(`${this.baseUrl}account/login`, loginParams).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          // this.isloggedIn = true;
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(registerParams: any) {
    return this.http.post<User>(`${this.baseUrl}account/register`, registerParams).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          // this.isloggedIn = true;
          this.currentUserSource.next(user);
        }
      })
    )
  }


  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user')!);
  //   return user !== 'null' ? true : false;
  // }


  // isUserLoggedIn(): boolean {
  //   return this.isloggedIn;
  // }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    // this.isloggedIn = false;
    this.currentUserSource.next(null);
  }
}
