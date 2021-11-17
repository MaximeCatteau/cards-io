import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
export class ShopComponent implements OnInit {

  collections: any;
  isLoading = true;

  constructor(public api: ApiService, public router: Router) {
  }

  ngOnInit() {
    this.api.collectionService.getCollectionsNotAlreadyPaidByUser(localStorage['token']).subscribe((col) => {
      this.collections = col;
      
      this.isLoading = false;
    });
  }

  buy(collection: any) {
    const cashOfUser = +localStorage['userCash'];
    if (cashOfUser >= collection.price) {
      localStorage['userCash'] = cashOfUser - collection.price;
      this.api.collectionService.buyCollection(localStorage['token'], collection.id).subscribe((res) => {
        console.log("");
      });
    }
  }

}
