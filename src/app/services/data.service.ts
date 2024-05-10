import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {
  PaginatedDto,
  PaymentTransactionOptions,
} from 'src/app/interfaces/payment.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getPaymentTransactions(
    transactionOptions: PaymentTransactionOptions = {}
  ): Observable<PaginatedDto> {
    const paymentsEndpoint = 'http://localhost:8080/api/v1/payments';

    const paymentsEndpointParams = this.generateQueryParams(transactionOptions);

    const paymentsEndpointParamsAuthHeader = new HttpHeaders({
      Authorization: 'Basic ' + btoa('user:userPass'),
    });

    return this.http
      .get<PaginatedDto>(paymentsEndpoint, {
        params: paymentsEndpointParams,
        headers: paymentsEndpointParamsAuthHeader,
      })
      .pipe(catchError(this.handleError));
  }

  private generateQueryParams(
    transactionOptions: PaymentTransactionOptions
  ): HttpParams {
    let queryParams = new HttpParams();

    let key: keyof PaymentTransactionOptions;

    for (key in transactionOptions) {
      if (transactionOptions.hasOwnProperty(key)) {
        queryParams = queryParams.set(key, transactionOptions[key] as string);
      }
    }

    return queryParams;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);

    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Failed to fetch transactions. Please try again later.')
    );
  }
}
