
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';

const uri = 'http://localhost:4000/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions {
  const token = localStorage.getItem('token');
  const headers = token
    ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    : new HttpHeaders();

  return {
    link: httpLink.create({ uri, headers }) as any,
    cache: new InMemoryCache(),
  };
}

export const apolloProvider = {
  provide: APOLLO_OPTIONS,
  useFactory: createApollo,
  deps: [HttpLink],
};