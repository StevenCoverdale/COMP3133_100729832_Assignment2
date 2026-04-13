import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { SIGNUP_MUTATION } from '../../graphql/graphql.operations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class SignupComponent {

  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid) return;

    this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { input: this.form.value }
    }).subscribe({
      next: (result: any) => {
        const { token } = result.data.signup;
        localStorage.setItem('token', token);
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.error = 'Username or email already exists';
      }
    });
  }
}