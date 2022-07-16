import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  // loggedIn!: boolean;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    // this.getCurrentUser();
    // this.currentUser$ = this.accountService.currentUser$;
  }
  login(loginForm: FormGroup) {
    this.accountService.login(loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        // this.loggedIn = true;
      },
      error: (error) => { console.log(error) }
    })
  }

  logout() {
    this.accountService.logout();
    // this.loggedIn = false;
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe({
  //     next: (user) => this.loggedIn = !!user,
  //     error: (error) => console.log(error),
  //   })
  // }
}
