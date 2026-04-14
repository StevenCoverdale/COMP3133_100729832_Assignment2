import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { apolloProviders } from './app/graphql/apollo.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
      ...apolloProviders,
      importProvidersFrom(HttpClientModule)
  ]
});