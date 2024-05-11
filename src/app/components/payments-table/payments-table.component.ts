import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PaymentTransactionDto } from 'src/app/interfaces/payment.interfaces';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent {
  @Input() tableItems?: PaymentTransactionDto[];
}
