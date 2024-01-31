import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData = {
    username: '',
    password: '',
  };
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
  ngOnInit() {
    if (this.AuthService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/books']);
    }
  }
  Submit() {
    this.userData.username = this.loginForm.get('username')?.value;
    this.userData.password = this.loginForm.get('password')?.value;

    this.AuthService.login(this.userData).subscribe(
      (result: string) => {
        const token = result;
        localStorage.setItem('token', token);
        console.log(`Login was successful`);

        if (token) {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error('Login error', error);
        console.log('Error status:', error.status);
      }
    );
  }
}
