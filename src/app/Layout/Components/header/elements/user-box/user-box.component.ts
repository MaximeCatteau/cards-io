import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  username: any;
  userCash: any;


  constructor(public globals: ThemeOptions, public router: Router, private api: ApiService) {
  }

  ngOnInit() {
    this.username = localStorage['user'];
    this.userCash = localStorage['userCash'];
  }

  logout() {
    this.api.userService.logout(localStorage['token']).subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
