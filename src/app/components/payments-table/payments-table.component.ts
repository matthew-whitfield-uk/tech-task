import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent {

  @Input() items?: any[];

}
