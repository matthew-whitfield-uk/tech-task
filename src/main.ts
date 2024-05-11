import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideRouter, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/components/payments-list/payments-list.component').then(
        (mod) => mod.PaymentsListComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    provideRouter(routes)
  ],
}).catch((err) => console.error(err));

