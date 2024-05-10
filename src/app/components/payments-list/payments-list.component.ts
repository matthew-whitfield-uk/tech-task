import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {
  PaymentTransactionDto,
  PaymentTransactionOptions,
} from 'src/app/interfaces/payment.interfaces';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss'],
})
export class PaymentsListComponent implements OnInit {
  constructor(private dataService: DataService, private datePipe: DatePipe) {}

  tableItems: PaymentTransactionDto[] = [];
  errorMessage = '';
  isError = false;
  currentPage = 0;
  numberOfPages = 1;
  isWaitingForAPI = false;
  isWaitingForMinimumSpinTime = false;

  filterOptions: PaymentTransactionOptions = {
    page: 0, // API starts pages from 0
    size: 5,
  };

  ngOnInit(): void {
    this.getData();
  }

  filterDate(type: 'createdAtStart' | 'createdAtEnd', date: any): void {
    const formattedDate =
      this.datePipe.transform(date, 'yyyy-MM-dd') || undefined;

    if (formattedDate === undefined && this.filterOptions[type] !== undefined) {
      // remove date filter as user has deselected the field
      delete this.filterOptions[type];
    } else if (formattedDate !== undefined) {
      this.filterOptions[type] = formattedDate;
    }

    // start at first page again as filtering results
    this.filterOptions.page = 0;

    this.getData();
  }

  filterTransactionTypes(
    type?: 'CAPTURED' | 'COMPLETED' | 'CREATED' | 'FAILED' | 'SETTLED'
  ): void {
    if (!type && this.filterOptions.status !== undefined) {
      // remove status filter as user has selected all transaction types
      delete this.filterOptions.status;
    } else {
      this.filterOptions.status = type;
    }

    // start at first page again as filtering results
    this.filterOptions.page = 0;
    this.getData();
  }

  getData(scrollToTop: boolean = false): void {
    this.isWaitingForAPI = true;
    this.isWaitingForMinimumSpinTime = true;

    // scroll to the top of the page if navigating
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }

    this.dataService.getPaymentTransactions(this.filterOptions).subscribe({
      next: (response) => {
        this.currentPage = response.currentPage;
        this.numberOfPages = response.numberOfPages;
        this.tableItems = response.items;
        // Reset error state
        this.isError = false;
        this.errorMessage = '';
        this.isWaitingForAPI = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isError = true;
        this.isWaitingForAPI = false;
      },
    });

    // display the loading spinner for at least 600 to avoid flicker
    setTimeout(() => {
      this.isWaitingForMinimumSpinTime = false;
    }, 600);
  }
}
