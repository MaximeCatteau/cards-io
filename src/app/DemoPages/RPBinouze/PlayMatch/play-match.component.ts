import { LowerCasePipe } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-play-match',
  templateUrl: './play-match.component.html'
})
export class PlayMatchComponent implements OnInit {

  match: any;

  tableForm: FormGroup;

  players: any;

  get matchReport() {
    return this.tableForm.get('matchReport') as FormArray;
  }

  constructor(public api: ApiService, public route: ActivatedRoute, public router: Router, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.tableForm = this.fb.group({
      homeScore: this.fb.control(new FormControl()),
      awayScore: this.fb.control(new FormControl()),
      matchReport: this.fb.array([])
    });

    this.route.url.subscribe((e) => {
      const matchId = e[2].path;
      this.api.rpbinouzeService.getMatch(matchId).subscribe((m) => {
        this.match = m;
        this.api.rpbinouzeService.getPlayersOfClub("FC Binouze").subscribe((players: []) => {
          this.players = players;

          for (let i = 0; i < players.length; i++) {
            this.matchReport.push(
              this.fb.group({
                playerId: new FormControl(),
                timePlayed: new FormControl(),
                goalScored: new FormControl(),
                assists: new FormControl(),
                note: new FormControl(),
                isManOfTheMatch: new FormControl()
              })
            );
          }
        });
      });
    });
  }

  playMatch() {
    const playMatchResource = this.buildPlayMatchResource(this.tableForm.get('homeScore').value, this.tableForm.get('awayScore').value, this.tableForm.get('matchReport').value);
  
    this.api.rpbinouzeService.playMatch(playMatchResource).subscribe((m) => {
      console.log("[ MATCH PLAYED ]");
      console.log(m);
    });
  }

  buildPlayMatchResource(homeScore, awayScore, matchReport) {
    let playMatchResource = {};

    playMatchResource['id'] = this.match.id;
    playMatchResource['scoreHome'] = homeScore;
    playMatchResource['scoreAway'] = awayScore;
    playMatchResource['issue'] = this.determineIssue(homeScore, awayScore);
    playMatchResource['strikers'] = this.buildStrikers(matchReport);
    playMatchResource['passers'] = this.buildPassers(matchReport);
    playMatchResource['manOfTheMatch'] = this.getManOfTheMatch(matchReport);
    playMatchResource['notes'] = this.buildMatchNotes(matchReport);

    console.log(playMatchResource);
    

    return playMatchResource;
  }

  determineIssue(homeScore, awayScore) {
    if (homeScore > awayScore) {
      return "ONE";
    } else if (homeScore < awayScore) {
      return "TWO";
    } else {
      return "N";
    }
  }

  buildStrikers(matchReport) {
    const onlyStrikers = matchReport.filter(p => p.goalScored > 0);
    let strikers = [];

    onlyStrikers.forEach(report => {
      for (let i = 0; i < report.goalScored; i++) {
        const player = this.players.find(p => p.id == report.playerId);

        strikers.push({ 
          id: player.id,
          firstname: player.firstname,
          lastname: player.lastname
        });
      }
    });

    return strikers;
  }

  buildPassers(matchReport) {
    const onlyPassers = matchReport.filter(p => p.assists > 0);
    let passers = [];

    onlyPassers.forEach(report => {
      for (let i = 0; i < report.assists; i++) {
        const player = this.players.find(p => p.id == report.playerId);

        passers.push({ 
          id: player.id,
          firstname: player.firstname,
          lastname: player.lastname
        });
      }
    });

    return passers;
  }

  getManOfTheMatch(matchReport) {
    let line = matchReport.filter(m => m.isManOfTheMatch == true);

    console.log(line);

    if (line) {
      const player = this.players.find(p => p.id == line[0].playerId);
    
      const manOfTheMatch = {
        id: player.id,
        firstname: player.firstname,
        lastname: player.lastname
      }

      return manOfTheMatch;
    }

    return null;
  }

  buildMatchNotes(matchReport) {
    let notes = [];

    matchReport.forEach(report => {
      notes.push({
        footballPlayerId: report.playerId,
        matchNote: report.note
      });
    });

    return notes;
  }
}
