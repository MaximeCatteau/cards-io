import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-match-deck',
  templateUrl: './match-deck.component.html'
})

export class MatchDeckComponent implements OnInit {
  isLoading = true;

  players: any;
  clubs: any;
  competitions: any;

  scoreFCBinouzeForm: FormGroup;
  scoreOpponentForm: FormGroup;

  matchBeginningForm: FormGroup;
  matchEndingForm: FormGroup;

  yellowCardBinouzeForm: FormGroup;
  yellowCardOpponentForm: FormGroup;

  subBinouzeForm: FormGroup;
  subOpponentForm: FormGroup;

  constructor(public api: ApiService, public modalService: NgbModal, private fb: FormBuilder, public route: ActivatedRoute) {}


  ngOnInit() {
    this.scoreFCBinouzeForm = this.fb.group({
      scorer: this.fb.control(new FormControl()),
      passer: this.fb.control(new FormControl()),
      minute: this.fb.control(new FormControl())
    });

    this.scoreOpponentForm = this.fb.group({
      opponentId: this.fb.control(new FormControl()),
      scorer: this.fb.control(new FormControl()),
      passer: this.fb.control(new FormControl()),
      minute: this.fb.control(new FormControl()),
    });

    this.matchBeginningForm = this.fb.group({
      homeId: this.fb.control(new FormControl()),
      awayId: this.fb.control(new FormControl()),
      competitionId: this.fb.control(new FormControl()),
      stadium: this.fb.control(new FormControl()),
    });

    this.matchEndingForm = this.fb.group({
      homeId: this.fb.control(new FormControl()),
      awayId: this.fb.control(new FormControl()),
      scoreHome: this.fb.control(new FormControl()),
      scoreAway: this.fb.control(new FormControl()),
      competitionId: this.fb.control(new FormControl())
    });

    this.yellowCardBinouzeForm = this.fb.group({
      player: this.fb.control(new FormControl()),
      minute: this.fb.control(new FormControl()),
    });

    this.yellowCardOpponentForm = this.fb.group({
      opponent: this.fb.control(new FormControl()),
      player: this.fb.control(new FormControl()),
      minute: this.fb.control(new FormControl()),
    });

    this.subBinouzeForm = this.fb.group({
      playerIn: this.fb.control(new FormControl()),
      playerOut: this.fb.control(new FormControl()),
      minute: this.fb.control(new FormControl()),
    });

    this.subOpponentForm = this.fb.group({
      club: this.fb.control(new FormControl()),
      playerIn: this.fb.control(new FormControl()),
      playerOut: this.fb.control(new FormControl()),
      minute: this.fb.control(new FormControl()),
    });

    this.api.rpbinouzeService.getPlayersOfClub("FC Binouze").subscribe((players: []) => {
      this.players = players;
    });

    this.api.rpbinouzeService.getAllClubs().subscribe((clubs: []) => {
      this.clubs = clubs;
    });

    this.api.rpbinouzeService.getCompetitions().subscribe((competitions: []) => {
      this.competitions = competitions;
    });
  }

  sendGoalFCBinouze() {
    let passerId = this.scoreFCBinouzeForm.get('passer').value;
    console.log(typeof this.scoreFCBinouzeForm.get('passer').value);
    

    if (passerId instanceof Object) {
      passerId = -1;
    }

    this.api.rpbinouzeService.scoreFCBinouze(this.scoreFCBinouzeForm.get('scorer').value, passerId, this.scoreFCBinouzeForm.get('minute').value).subscribe();
  }

  sendGoalOpponent() {
    this.api.rpbinouzeService.scoreOpponent(this.scoreOpponentForm.get('opponentId').value, this.scoreOpponentForm.get('scorer').value, this.scoreOpponentForm.get('passer').value, this.scoreOpponentForm.get('minute').value).subscribe();
  }

  sendMatchBeginning() {
    this.api.rpbinouzeService.beginMatch(this.matchBeginningForm.get('homeId').value, this.matchBeginningForm.get('awayId').value, this.matchBeginningForm.get('competitionId').value, this.matchBeginningForm.get('stadium').value).subscribe();
  }

  sendMatchEnding() {
    this.api.rpbinouzeService.endMatch(this.matchEndingForm.get('homeId').value, this.matchEndingForm.get('awayId').value, this.matchEndingForm.get('scoreHome').value, this.matchEndingForm.get('scoreAway').value, this.matchEndingForm.get('competitionId').value).subscribe();
  }

  sendYellowCardBinouze() {
    this.api.rpbinouzeService.yellowCardBinouze(this.yellowCardBinouzeForm.get('player').value, this.yellowCardBinouzeForm.get('minute').value).subscribe();
  }

  sendYellowCardOpponent() {
    this.api.rpbinouzeService.yellowCardOpponent(this.yellowCardOpponentForm.get('opponent').value, this.yellowCardOpponentForm.get('player').value, this.yellowCardOpponentForm.get('minute').value).subscribe();
  }

  sendSubFCBinouze() {
    this.api.rpbinouzeService.substituteFCBinouze(this.subBinouzeForm.get('playerOut').value, this.subBinouzeForm.get('playerIn').value, this.subBinouzeForm.get('minute').value).subscribe();
  }

  sendSubOpponent() {
    this.api.rpbinouzeService.substituteOpponent(this.subOpponentForm.get('club').value, this.subOpponentForm.get('playerOut').value, this.subOpponentForm.get('playerIn').value, this.subOpponentForm.get('minute').value).subscribe();
  }
}
