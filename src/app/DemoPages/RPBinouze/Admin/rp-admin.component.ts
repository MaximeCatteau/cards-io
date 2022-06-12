import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-rp-admin',
  templateUrl: './rp-admin.component.html'
})
export class RpAdminComponent implements OnInit {

  public players: any;

  constructor(public api: ApiService, public router: Router) {

  }

  ngOnInit() {
    this.api.rpbinouzeService.getPlayersForAdmin().subscribe((players) => {
      this.players = players;    
    });
  }

  sendTestMessage(firstname, lastname, discordId) {

  }
}
