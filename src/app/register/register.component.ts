import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userData = {
    username: '',
    password: '',
  };
  register: FormGroup;
  constructor(private AuthService: AuthService, private router: Router) {
    this.register = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {
    if (this.AuthService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  Submitted() {
    this.userData.username = this.register.get('username')?.value;
    this.userData.password = this.register.get('password')?.value;
    this.AuthService.register(this.userData).subscribe(
      (result) => {
        console.log('user registered successfully ', result);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error occurred during registration ', error);
      }
    );
  }
}
