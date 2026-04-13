import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../graphql/graphql.operations';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  constructor(private apollo: Apollo) {}

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password }
    }).pipe(
      map((result: any) => {
        const token = result.data?.login?.token;
        if (token) {
          localStorage.setItem(this.tokenKey, token);
        }
        return result.data.login;
      })
    );
  }

  signup(email: string, password: string, name: string) {
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { email, password, name }
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
