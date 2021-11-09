import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {ThemeOptions} from '../../../../../theme-options';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  @Input() username: any;
  @Input() userCash: any;

  constructor(public globals: ThemeOptions, public router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
