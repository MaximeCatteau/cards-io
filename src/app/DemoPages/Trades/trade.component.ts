import {Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styles: []
})
export class TradeComponent implements OnInit {

  public isLoading = false;

  constructor(public api: ApiService) {
  }

  ngOnInit() {
  }

  buy(collection: any) {
    const cashOfUser = +localStorage['userCash'];
    if (cashOfUser >= collection.price) {
      localStorage['userCash'] = cashOfUser - collection.price;
      this.api.collectionService.buyCollection(localStorage['user'], collection.id).subscribe((res) => {
        console.log("### BUY COLLECTION :D");   
      });
    }
  }

}
