import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-cards-collection',
  templateUrl: './cards-collection.component.html',
  styles: []
})
export class CardsCollectionComponent implements OnInit {

  cards = [];
  collectionCards;
  isLoading = true;
  username = null;
  collectionId;
  cardCount;
  DEFAULT_CARD = "https://i.ibb.co/RNBJD9f/default-card.png";

  constructor(public api: ApiService, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.route.url.subscribe((e) => {
      this.collectionId = e[1].path;
      this.getCardCountInCollection();
      this.getPlayerCardsInCollection();
    });
  }

  getCardCountInCollection() {
    return this.api.collectionService.getCollectionCardCount(this.collectionId).subscribe((n) => {
      this.cardCount = n;
      this.isLoading = false;
    });
  }

  getPlayerCardsInCollection() {
    return this.api.cards.getPlayerCardsByCollection(localStorage.user, this.collectionId).subscribe((playerCards) => {
      this.collectionCards = playerCards;
      console.log(this.collectionCards);
    });
  }

  userHasCard(index) {
    if (this.collectionCards) {
      const find = this.collectionCards.find((c) => {
        if (c.idInCollection === index) {
          return true;
        } else {
          return false;
        }
      });

      if (find) {
        return find.imageUrl;
      } else {
        return this.DEFAULT_CARD;
      }
    }
  }

  composeCards() {
    this.cards = [];

    for (let i = 1; i <= this.cardCount; i++) {
      if (this.userHasCard(i) === this.DEFAULT_CARD) {
        this.cards.push(this.DEFAULT_CARD);
      } else {
        this.cards.push(this.userHasCard(i));
      }
    }

    return this.cards;
  }
}
