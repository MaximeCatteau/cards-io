import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-who-am-i',
  templateUrl: './who-am-i.component.html'
})

export class WhoAmIComponent implements OnInit {
  
  heading = "Qui suis-je ?";
  subheading = "Cette zone vous permet de consulter les résultats du jeu du Qui suis-je ?";
  icon = "vsm-icon pe-7s-cup icon-gradient bg-warm-flame";

  isLoading = true;

  player: any;
  seasonId: any;
  season: any;
  ladder: any = [];
  dailyLadder: any;
  currentDay: any = null;

  type: string = 'PLAYER';

  // FIELDS FORM
  leagueForm: FormGroup = new FormGroup({});

  newPlayer: FormGroup = new FormGroup({
    discordId: new FormControl()
  });

  constructor(public api: ApiService, public modalService: NgbModal, private formBuilder: FormBuilder, public route: ActivatedRoute) {}


  ngOnInit() {
    this.api.userService.getPlayer(localStorage['token']).subscribe((player) => {
      this.player = player;
    });

    this.route.url.subscribe((e) => {
      this.seasonId = e[2].path;
      this.api.whoAmIService.getWhoAmISeason(this.seasonId).subscribe((s: any) => {
        this.season = s;
        this.heading += " - " + s.name;
        this.api.whoAmIService.getDailyLadder(localStorage['token'], this.seasonId).subscribe((ladder) => {
          this.dailyLadder = ladder;
          const f = this.dailyLadder.find((d) => {
            return d.day == this.season.currentDay;
          });
      
          this.currentDay = f;
          this.currentDay.league = this.sortCurrentDayLeague(this.currentDay.league);
        });
      });

      this.api.whoAmIService.getWhoAmILadder(this.seasonId).subscribe((ladder) => {
        this.ladder = ladder;
        this.sortLadder();
        this.isLoading = false;
      });
    });

    this.leagueForm = this.formBuilder.group({
      players: new FormArray([])
    });
  }

  // FORM FIELDS ACCESS
  get f1() {
    return this.leagueForm.controls;
  }
  
  get t1() {
    return this.f1.players as FormArray;
  }

  openModal(content, type) {
    this.type = type;
    this.modalService.open(content);
  }

  addNewPlayer(){
    this.api.whoAmIService.addSeasonPlayer(this.newPlayer.controls.discordId.value, this.seasonId).subscribe((wp) => {
      this.modalService.dismissAll();
    });
  }

  sortLadder() {
    this.ladder.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) {
        return -1;
      } else if (a.totalPoints < b.totalPoints) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  getCurrentDay() {
    return this.currentDay;
  }

  getPlayerNames() {
    let playerNames = [];

    this.ladder.forEach(p => {
      playerNames.push(p.playerName);
    });

    return playerNames;
  }

  addPlayerField() {
    this.t1.push(this.formBuilder.group({
      whoAmIPlayerName: [this.getPlayerNames()[0], Validators.required],
      points: [0, Validators.required]
    }));
  }

  validateForm() {
    this.api.whoAmIService.postNewDay(localStorage['token'], this.f1.players.value).subscribe((whoAmIDay) => {
      this.modalService.dismissAll();
    });
  }

  sortCurrentDayLeague(league) {
    const sort = league.sort((a, b) => a.points <= b.points);

    return sort;
  }

  changeCurrentDay(direction) {
    if (direction == 'RIGHT') {
      if (this.season.currentDay == this.currentDay.day) {
        this.currentDay = this.dailyLadder[this.dailyLadder.length - 1];
      } else {
        const find = this.dailyLadder.find((d) => d.day == this.currentDay.day);
        const index = this.dailyLadder.indexOf(find);
        this.currentDay = this.dailyLadder[index-1];
      }
    } else if (direction == 'LEFT') {
      if (this.currentDay.day == 1) {
        this.currentDay = this.dailyLadder[0];
      } else {
        const find = this.dailyLadder.find((d) => d.day == this.currentDay.day);
        const index = this.dailyLadder.indexOf(find);
        this.currentDay = this.dailyLadder[index+1];
      }
    }

    this.currentDay.league = this.sortCurrentDayLeague(this.currentDay.league);
  }
}
