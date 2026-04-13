import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { apolloProvider } from './graphql/apollo.config';

@NgModule({
  declarations: [
    // declare non-standalone components here if any
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule, Material modules, etc.
  ],
  providers: [
    apolloProvider
  ]
})
export class AppModule {}