import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit {

  constructor(private data: DataService) {}

  tableItems: any;


  ngOnInit(): void {


    this.data.getPaymentTransactions().subscribe((data) => {
      console.log('query')
      console.log(data);

      this.tableItems = data.items;

    })
  }




}
