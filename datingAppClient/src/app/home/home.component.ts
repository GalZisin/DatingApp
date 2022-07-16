import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: User[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  // getUsers() {
  //   this.http.get<User[]>('http://localhost:5001/api/users').subscribe(response => {
  //     if (response) {
  //       console.log("users", response)
  //       this.users = response;
  //     }
  //   })
  // }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
