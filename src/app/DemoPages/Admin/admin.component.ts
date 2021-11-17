import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'ng2-charts';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  public options = {
    layout: {
      padding: {
        left: 0,
        right: 8,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          display: false,
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  };

  public players: any;

  constructor(public api: ApiService, public router: Router) {

  }

  ngOnInit() {
    this.api.userService.getPlayers(localStorage['token']).subscribe((players) => {
      this.players = players;    
    });
  }

  sendMoney(userId, amount) {
    this.api.userService.sendMoney(localStorage['token'], userId, amount).subscribe((player) => {
      const find = this.players.find((p) => p.id == userId);
      const index = this.players.indexOf(find);

      this.players[index].cashCard = this.players[index].cashCard + amount; 
    });
  }

  sendCode(userId) {
    this.api.userService.sendCode(localStorage['token'], userId).subscribe((code) => {
      
    });
  }
}
