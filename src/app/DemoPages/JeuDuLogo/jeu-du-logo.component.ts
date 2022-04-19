import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-jeu-du-logo',
  templateUrl: './jeu-du-logo.component.html'
})

export class JeuDuLogoComponent implements OnInit {
  
  heading = "Jeu du logo";
  subheading = "Cette zone vous permet de consulter les résultats du Jeu du Logo";
  icon = "vsm-icon pe-7s-cup icon-gradient bg-warm-flame";

  isLoading = true;

  player: any;

  league1Ladder: any;
  league2Ladder: any;
  league2aLadder: any;
  league2bLadder: any;
  dailyLadder: any;
  season: any;
  seasonId: any;
  currentDay: any = null;

  // FIELDS FORM
  league1Form: FormGroup = new FormGroup({});
  league2Form: FormGroup = new FormGroup({});

  constructor(public api: ApiService, public modalService: NgbModal, private formBuilder: FormBuilder, public route: ActivatedRoute, public discordService: DiscordService) {}


  ngOnInit() {
    this.api.userService.getPlayer(localStorage['token']).subscribe((player) => {
      this.player = player;
    });

    this.route.url.subscribe((e) => {
      this.seasonId = e[1].path;
      this.api.logoService.getSeasonSelected(localStorage['token'], this.seasonId).subscribe((season) => {
        this.season = season;
        this.heading = "Jeu du Logo - " + this.season.name;
        this.api.logoService.getDailyLadder(localStorage['token'], this.seasonId).subscribe((ladder) => {
          this.dailyLadder = ladder;
          const f = this.dailyLadder.find((d) => {
            return d.day == this.season.currentDay;
          });
      
          this.currentDay = f;
          this.currentDay.league1 = this.sortCurrentDayLeague(this.currentDay.league1);
          this.currentDay.league2 = this.sortCurrentDayLeague(this.currentDay.league2);
          this.currentDay.league2a = this.sortCurrentDayLeague(this.currentDay.league2a);
          this.currentDay.league2b = this.sortCurrentDayLeague(this.currentDay.league2b);
        });
      });

      this.api.logoService.getLeague1Ladder(localStorage['token'], this.seasonId).subscribe((ladder) => {

        this.league1Ladder = ladder;
      });
  
      this.api.logoService.getLeague2Ladder(localStorage['token'], this.seasonId).subscribe((ladder) => {
        this.league2Ladder = ladder;
      });

      this.api.logoService.getLeague2aLadder(localStorage['token'], this.seasonId).subscribe((ladder) => {
        this.league2aLadder = ladder;
      });

      this.api.logoService.getLeague2bLadder(localStorage['token'], this.seasonId).subscribe((ladder) => {
        this.league2bLadder = ladder;
        this.isLoading = false;
      });
    });

    this.league1Form = this.formBuilder.group({
      players: new FormArray([])
    });

    this.league2Form = this.formBuilder.group({
      players: new FormArray([])
    });
  }

  // FORM FIELDS ACCESS
  get f1() {
    return this.league1Form.controls;
  }

  get f2() {
    return this.league2Form.controls;
  }
  
  get t1() {
    return this.f1.players as FormArray;
  }

  get t2() {
    return this.f2.players as FormArray;
  }

  addPlayerField(league) {
    if (league == 1) {
      this.t1.push(this.formBuilder.group({
        playerName: [this.getLeagueOnePlayerNames()[0], Validators.required],
        points: [0, Validators.required],
        isFastest: [false, Validators.required]
      }));
      
      
    } else if (league == 2) {
      this.t2.push(this.formBuilder.group({
        playerName: [this.getLeagueTwoPlayerNames()[0], Validators.required],
        points: [0, Validators.required],
        isFastest: [false, Validators.required]
      }));
    }
  }

  getLeagueOnePlayerNames() {
    let playerNames = [];

    this.league1Ladder.forEach(p => {
      playerNames.push(p.logoPlayerName);
    });

    return playerNames;
  }

  getLeagueTwoPlayerNames() {
    let playerNames = [];

    if (this.hasGroups()) {
      this.league2aLadder.forEach(p => {
        playerNames.push(p.logoPlayerName);
      });

      this.league2bLadder.forEach(p => {
        playerNames.push(p.logoPlayerName);
      });
    } else {
      this.league2Ladder.forEach(p => {
        playerNames.push(p.logoPlayerName);
      });
    }

    return playerNames;
  }

  getCurrentDay() {
    return this.currentDay;
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

    this.currentDay.league1 = this.sortCurrentDayLeague(this.currentDay.league1);
    this.currentDay.league2 = this.sortCurrentDayLeague(this.currentDay.league2);
  }

  sortCurrentDayLeague(league) {
    const sort = league.sort((a, b) => a.points <= b.points);

    return sort;
  }

  openCreateDay(content) {
    this.modalService.open(content);
  }

  validateForm(){
    this.api.logoService.postNewDay(localStorage['token'], this.f1.players.value, this.f2.players.value).subscribe((logoDay) => {
      this.modalService.dismissAll();
    });
  }

  hasGroups() {
    return this.league2aLadder != null && this.league2aLadder.length > 0
  }
}
