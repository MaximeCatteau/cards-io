import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  cards = <any>[];
  isLoading = true;
  username = null;

  constructor(public api: ApiService, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.api.cards.getAllPlayerCards(localStorage['token']).subscribe((response) => {
      if (response) {
        this.cards = response;
        this.isLoading = false;
      }
    });
  }

  public getCards() {
    return this.cards;
  }

  public getCardQuantity(card) {
    return card.cardQuantity;
  }
}
