import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html'
})
export class ClubPageComponent implements OnInit {

  players: any;
  goalkeepers: [];
  defenders: [];
  midfielders: [];
  forwards: [];
  matchs: [];

  constructor(public api: ApiService, public router: Router, public route: ActivatedRoute, public modalService: NgbModal) {

  }

  ngOnInit() {
    this.route.url.subscribe((e) => {
      const clubId = e[2].path;
      this.api.rpbinouzeService.getMatchsForClub(clubId).subscribe((m: []) => {
        this.matchs = m;
      });
    });

    this.api.rpbinouzeService.getPlayersOfClub('FC Binouze').subscribe((p: []) => {
      this.players = p;
      this.parseByPost();
      this.sortByNumber();
    });
  }

  parseByPost() {
    this.goalkeepers = this.players.filter(p => p.post == 'GOALKEEPER');
    this.defenders = this.players.filter(p => p.post == 'DEFENDER');
    this.midfielders = this.players.filter(p => p.post == 'MIDFIELDER');
    this.forwards = this.players.filter(p => p.post == 'FORWARD' || p.post == 'WINGER');
  }

  sortByNumber() {
    this.goalkeepers.sort((a, b) => a['number'] - b['number']);
    this.defenders.sort((a, b) => a['number'] - b['number']);
    this.midfielders.sort((a, b) => a['number'] - b['number']);
    this.forwards.sort((a, b) => a['number'] - b['number']);
  }

  openCreateMatch(content) {
    this.modalService.open(content);
  }
}
