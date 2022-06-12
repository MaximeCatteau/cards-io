import { LowerCasePipe } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-rp-player-card',
  templateUrl: './rp-player-card.component.html'
})
export class RPPlayerCardComponent implements OnInit {

  @Input()
  player: any;

  constructor(public api: ApiService, public router: Router) {

  }

  ngOnInit() {
  }

  getInitialsUrl() {
    if (this.player.number >= 10) {
      const left = this.player.number.toString().charAt(0);
      const right = this.player.number.toString().charAt(1);

      return "https://ui-avatars.com/api/?background=008038&color=fff&rounded=true&name=" + left + '+' + right;
    }

    return "https://ui-avatars.com/api/?background=008038&color=fff&rounded=true&name=" + this.player.number;
  }

  stringifyPostAndPosition() {
    let post = "";

    switch(this.player.post) {
      case 'GOALKEEPER':
        post += "Gardien de but";
        return post;
      case 'DEFENDER':
        post += "Défenseur ";
        break;
      case 'MIDFIELDER':
        post += "Milieu ";
        break;
      case 'WINGER':
        post += 'Ailier ';
        break;
      case 'FORWARD':
        post += 'Buteur';
        return post;
    }

    switch(this.player.position) {
      case 'CENTER':
        post += 'central';
        break;
      case 'CENTER_OFFENSIVE':
        post += 'offensif central';
        break;
      case 'LEFT':
        post += 'gauche';
        break;
      case 'RIGHT':
        post += 'droit';
        break;
    }

    return post;
  }

  goToFootballPlayerProfile(footballPlayerId: string) {
    console.log(footballPlayerId);
    
    this.router.navigate(['/rpbinouze/player/' + footballPlayerId]);
  }
}
