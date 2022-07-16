import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountServicve: AccountService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })


  }

  register(registerForm: FormGroup) {
    console.log("register", registerForm.value);
    this.accountServicve.register(registerForm.value).subscribe({
      next: (response) => {
        console.log("register response: ", response)
        this.cancel();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error)
      }
    }


    )
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
