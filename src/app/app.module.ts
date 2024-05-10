import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentsListComponent,
    PaymentsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
