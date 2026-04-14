
import { APOLLO_OPTIONS, provideApollo } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';

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

export const apolloProviders: any[] = provideApollo(() => createApollo(inject(HttpLink))) as any[];