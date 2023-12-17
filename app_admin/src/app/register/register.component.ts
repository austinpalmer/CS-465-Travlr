import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formErrors: string = '';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {}

  public onRegisterSubmit(): void {
    this.formErrors = '';
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formErrors = 'All fields are required, please try again';
    } else {
      this.doRegister();
    }
  }

  private doRegister(): void {
    this.authenticationService.register(this.credentials)
      .then(() => this.router.navigateByUrl('#'))
      .catch((message) => this.formErrors = message);
  }
}
