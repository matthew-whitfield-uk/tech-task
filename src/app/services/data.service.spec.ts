import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';

import { HttpParams } from '@angular/common/http';
import {
  PaymentTransactionOptions,
  PaginatedDto,
} from '../interfaces/payment.interfaces';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request with correct parameters', () => {
    // Arrange
    const mockResponse: PaginatedDto = {
      totalNumberOfItems: 25,
      numberOfPages: 5,
      currentPage: 0,
      pageSize: 5,
      hasNext: true,
      items: [
        {
          id: 'TXID_sdfb-sodj-nd-3r3brb',
          amount: 24.35,
          currency: 'USD',
          description: 'Test payment made only for this technical task #18',
          status: 'SETTLED',
          createdAt: '2021-07-24T12:27:07.965',
        },
        {
          id: 'TXID_sdfb-sodj-3gb34-b5',
          amount: 47.46,
          currency: 'GBP',
          description: 'Test payment made only for this technical task #8',
          status: 'COMPLETED',
          createdAt: '2021-07-23T12:27:07.965',
        },
        {
          id: 'TXID_sdfb-sodj-3gb34-45b',
          amount: 57,
          currency: 'GBP',
          description: 'Test payment made only for this technical task #21',
          status: 'COMPLETED',
          createdAt: '2021-07-22T12:27:07.965',
        },
        {
          id: 'TXID_sdfb-sodj-45nub-3r3brb',
          amount: 25.24,
          currency: 'CHF',
          description: 'Test payment made only for this technical task #20',
          status: 'CREATED',
          createdAt: '2021-07-21T12:27:07.965',
        },
        {
          id: 'TXID_sdfb-sodj-3gb34-4un',
          amount: 476.24,
          currency: 'GBP',
          description: 'Test payment made only for this technical task #17',
          status: 'CREATED',
          createdAt: '2021-07-20T12:27:07.965',
        },
      ],
    };
    const transactionOptions: PaymentTransactionOptions = { page: 4, size: 5 };

    // Act
    service.getPaymentTransactions(transactionOptions).subscribe((response) => {
      // Assert
      expect(response).toEqual(mockResponse);
    });

    // Assert
    const request = httpMock.expectOne(
      (req) =>
        req.url === 'http://localhost:8080/api/v1/payments' &&
        req.params.get('page') === '4' && // Mocked transaction option
        req.params.get('size') === '5' && // Mocked transaction option
        req.headers.get('Authorization') === 'Basic ' + btoa('user:userPass')
    );

    // Respond to the request
    request.flush(mockResponse);
  });

  it('should handle errors properly', () => {
    // Arrange
    const transactionOptions: PaymentTransactionOptions = {};

    // Act
    service.getPaymentTransactions(transactionOptions).subscribe({
      next: () => {},
      error: (error) => {
        // Assert
        expect(error).toBeTruthy();
      },
    });

    // Assert
    const request = httpMock.expectOne('http://localhost:8080/api/v1/payments');
    request.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should generate query params from PaymentTransactionOptions', () => {
    // Arrange
    const transactionOptions: PaymentTransactionOptions = {
      size: 1,
      page: 4,
    };

    const expectedParams = new HttpParams().set('size', '1').set('page', '4');

    // Act
    const queryParams = service['generateQueryParams'](transactionOptions);

    // Assert
    expect(queryParams.toString()).toEqual(expectedParams.toString());
  });

  it('should generate empty query params if PaymentTransactionOptions is empty', () => {
    // Arrange
    const transactionOptions: PaymentTransactionOptions = {};

    const expectedParams = new HttpParams();

    // Act
    const queryParams = service['generateQueryParams'](transactionOptions);

    // Assert
    expect(queryParams.toString()).toEqual(expectedParams.toString());
  });
});
