import { PaymentsListComponent } from './payments-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DataService } from 'src/app/services/data.service';
import { DatePipe } from '@angular/common';
import { PaginatedDto } from '../../interfaces/payment.interfaces';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { PaymentsTableComponent } from '../payments-table/payments-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('PaymentsListComponent', () => {
  let component: PaymentsListComponent;
  let fixture: ComponentFixture<PaymentsListComponent>;
  let mockDataService;
  const mockData: PaginatedDto = {
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

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', [
      'getPaymentTransactions',
    ]);
    mockDataService.getPaymentTransactions.and.returnValue(of(mockData));

    await TestBed.configureTestingModule({
      declarations: [PaymentsListComponent, PaymentsTableComponent],
      imports: [
        FormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: DataService, useValue: mockDataService },
        DatePipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit filtered date values', () => {
    // Arrange
    spyOn(component, 'filterDate');

    // Act
    const startDateInput = fixture.debugElement.query(
      By.css('input[matStartDate]')
    );
    const endDateInput = fixture.debugElement.query(
      By.css('input[matEndDate]')
    );

    startDateInput.nativeElement.value = '2024-05-01';
    endDateInput.nativeElement.value = '2024-05-10';

    // Manually trigger the dateChange event
    startDateInput.triggerEventHandler('dateChange', {
      value: new Date(startDateInput.nativeElement.value),
    });
    endDateInput.triggerEventHandler('dateChange', {
      value: new Date(endDateInput.nativeElement.value),
    });

    fixture.detectChanges();

    // Assert
    expect(component.filterDate).toHaveBeenCalledWith(
      'createdAtStart',
      new Date('2024-05-01')
    );
    expect(component.filterDate).toHaveBeenCalledWith(
      'createdAtEnd',
      new Date('2024-05-10')
    );
  });

  it('should display error message when isError is true', () => {
    // Arrange
    component.isError = true;
    component.errorMessage = 'An error occurred'; // Set a mock error message

    // Act
    fixture.detectChanges();

    // Assert
    const errorMessageElement = fixture.debugElement.query(
      By.css('.error-message')
    );
    expect(errorMessageElement).toBeTruthy();
    expect(errorMessageElement.nativeElement.textContent.trim()).toBe(
      'An error occurred'
    );
  });
});
