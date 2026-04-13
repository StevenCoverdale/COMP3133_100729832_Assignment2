import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppComponent } from './app.component';
import { apolloProvider } from './graphql/apollo.config';

@NgModule({
  declarations: [
    AppComponent,
    // your components...
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    // AppRoutingModule, Material modules, etc.
  ],
  providers: [
    apolloProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}