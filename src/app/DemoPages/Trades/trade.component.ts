import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styles: []
})
export class TradeComponent implements OnInit {

  public isLoading = true;
  public tradesForStepOne: any;
  public playerDoubles: any;
  public playerTrades: any;
  public playerPropositions: any;

  public cardTraded: any;

  heading = "Échanges";
  subheading = "Cette zone vous permet de gérer tous vos échanges ainsi que d'en proposer";
  icon = "vsm-icon pe-7s-repeat icon-gradient bg-warm-flame";

  closeResult: string | undefined;
  currentJustify = 'only_doubles';

  createTradeForm = new FormGroup({
    card: new FormControl('')
  });

  createPropositionForm = new FormGroup({
    card: new FormControl('')
  });

  constructor(public api: ApiService, private modalService: NgbModal, private router: Router) {
  }

  ngOnInit() {
    this.api.tradeService.getAllTradesInStepOne().subscribe((response) => {
      this.tradesForStepOne = response;
    });

    this.api.cards.getDoublesForTradeCreation(localStorage['token']).subscribe((response) => {
      this.playerDoubles = response;
    });

    this.api.tradeService.getAllPlayerTrades(localStorage['token']).subscribe((response) => {
      this.playerTrades = response;
    });

    this.api.tradeService.getAllPlayerPropositions(localStorage['token']).subscribe((response) => {
      this.playerPropositions = response;
      this.isLoading = false;
    });
  }

  createTrade(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  create() {
    this.api.tradeService.createTrade(localStorage['token'], this.createTradeForm.value.card).subscribe((trade) => {
      this.playerDoubles = null;
      
      this.api.tradeService.getAllTradesInStepOne().subscribe((response) => {
        this.tradesForStepOne = response;
        this.isLoading = false;
        this.modalService.dismissAll();
      });
    });
  }

  createProposition(content, trade) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  isSameUser(username) {
    if (username === localStorage['user']) {
      return true;
    } else {
      return false;
    }
  }

  createProp(trade) {
    this.api.tradeService.createProposition(localStorage['token'], trade.tradeId, this.createPropositionForm.value.card).subscribe((response) => {
      this.modalService.dismissAll();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  acceptProposition(content, tradeId, propositionId) {
    this.api.tradeService.makeTrade(localStorage['token'], tradeId, propositionId).subscribe((response) => {
      this.cardTraded = response;
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
  }

  refuseProposition(propositionId) {
    this.api.tradeService.refuseTradeProposition(propositionId).subscribe((response) => {
      const tradePropostion = this.playerPropositions.find((pp) => pp.tradePropositionId == propositionId);
      const index = this.playerPropositions.indexOf(tradePropostion);
      this.playerPropositions.splice(index, 1);
    });
  }

  cancelProposition(tradeId, card, propositionId) {
  }

  redirectToCollectionPage() {
    this.modalService.dismissAll();
    this.router.navigate(['/cards/' + this.cardTraded.collectionId]);
  }

}
