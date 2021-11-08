import {Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
export class ShopComponent implements OnInit {

  collections;
  isLoading = true;

  constructor(public api: ApiService) {
  }

  ngOnInit() {
    this.api.collectionService.getCollectionsNotAlreadyPaidByUser(localStorage.user).subscribe((col) => {
      this.collections = col;
      
      this.isLoading = false;
    });
  }

  buy(collection) {
    const cashOfUser = +localStorage.userCash;
    if (cashOfUser >= collection.price) {
      localStorage.userCash = cashOfUser - collection.price;
      this.api.collectionService.buyCollection(localStorage.user, collection.id).subscribe((res) => {
        console.log("### BUY COLLECTION :D");   
      });
    }
  }

}
