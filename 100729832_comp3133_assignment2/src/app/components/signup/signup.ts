import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { SIGNUP_MUTATION } from '../../graphql/graphql.operations';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class SignupComponent {
  form: any;

  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

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
      error: (err: any) => {
        // Prefer backend validation/network error message if present
        if (err.networkError && err.networkError.result && err.networkError.result.errors) {
          // express-validator formatted errors: { errors: [ { field, message } ] }
          const serverErrors = err.networkError.result.errors;
          if (Array.isArray(serverErrors) && serverErrors.length) {
            this.error = serverErrors.map((e: any) => e.message).join('; ');
            return;
          }
        }

        if (err.graphQLErrors && err.graphQLErrors.length) {
          this.error = err.graphQLErrors.map((e: any) => e.message).join('; ');
          return;
        }

        this.error = 'Username or email already exists';
      }
    });
  }
}