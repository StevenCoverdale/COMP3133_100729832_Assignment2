import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY } from '../../graphql/graphql.operations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      error: () => {
        this.error = 'Invalid username/email or password';
      }
    });
  }
}