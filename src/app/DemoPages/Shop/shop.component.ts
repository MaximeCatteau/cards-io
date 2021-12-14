import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: []
})
export class ShopComponent implements OnInit {

  collections: any;
  isLoading = true;

  // MODAL CARTES
  cardPack: any;
  currentCard: any;
  packLength: any;
  cardIndex: any;

  constructor(public api: ApiService, public router: Router, public modalService: NgbModal) {
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

  buyPack(content, packNumber: any, price: any) {
    const cashOfUser = +localStorage['userCash'];

    if (cashOfUser < price) {
      return;
    }

    localStorage['userCash'] = cashOfUser - price;

    this.api.cards.buyPack(localStorage['token'], packNumber).subscribe((res) => {
      this.modalService.open(content);
      this.cardPack = res;
      this.packLength = this.cardPack.length;
      this.currentCard = this.cardPack[0];
      this.cardIndex = 0;
    });
  }

  next(){
    this.cardIndex++;
    this.currentCard = this.cardPack[this.cardIndex];
  }

  previous() {
    this.cardIndex--;
    this.currentCard = this.cardPack[this.cardIndex];
  }

  quit() {
    this.modalService.dismissAll();
  }

}
