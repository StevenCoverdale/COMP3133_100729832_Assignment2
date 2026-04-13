import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN_QUERY, SIGNUP_MUTATION } from '../graphql/graphql.operations';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  constructor(private apollo: Apollo) {}

  login(usernameOrEmail: string, password: string) {
    return this.apollo.query({
      query: LOGIN_QUERY,
      variables: { usernameOrEmail, password }
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

  signup(input: any) {
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { input }
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
