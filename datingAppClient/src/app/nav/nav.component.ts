import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  login(loginForm: FormGroup) {
    this.accountService.login(loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.loginForm.get('username')?.patchValue('');
        this.loginForm.get('password')?.patchValue('');
        this.loginForm.updateValueAndValidity();
        this.router.navigateByUrl('/members');
      }
      // ,
      // error: (error) => {
      //   console.log(error);
      //   this.toastr.error(error.error);
      // }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
