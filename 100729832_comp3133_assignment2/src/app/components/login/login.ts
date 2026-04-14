import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY } from '../../graphql/graphql.operations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  form: any;

  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.apollo.query({
      query: LOGIN_QUERY,
      variables: this.form.value
    }).subscribe({
      next: (result: any) => {
        const { token } = result.data.login;
        localStorage.setItem('token', token);
        this.router.navigate(['/employees']);
      },
      error: (err: any) => {
        if (err.networkError && err.networkError.result && err.networkError.result.errors) {
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

        this.error = 'Invalid username/email or password';
      }
    });
  }
}