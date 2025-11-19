import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      userId: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }


   onSignup() {
    if (this.signupForm.invalid) return;
    

    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe({
      next: (res) => {
        return res.success ? this.router.navigate(['/login']) : alert('Signup failed');
      },
      error: (err) => {
        console.error(err);
        alert('Signup failed');
      },
    });
  }
}
