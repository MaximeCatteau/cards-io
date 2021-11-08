import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styles: []
})
export class TradeComponent implements OnInit {
  heading = 'Échanges';
  subheading = 'Huge selection of charts created with the Vue ChartJS Plugin';
  icon = 'pe-7s-bandaid icon-gradient bg-amy-crisp';

  constructor() {
  }

  ngOnInit() {
  }

}
