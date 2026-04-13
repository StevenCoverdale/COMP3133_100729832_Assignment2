import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
    // AppRoutingModule, Material modules, etc.
  ],
  providers: [
    apolloProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}