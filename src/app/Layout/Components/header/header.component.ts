import {Component, HostBinding} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ThemeOptions} from '../../../theme-options';
import { ApiService } from 'src/app/Services/api.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user = localStorage['user'];
  userCash = localStorage['userCash'];

  constructor(public globals: ThemeOptions, public api: ApiService) {
  }

  ngOnInit() {
  }

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  isActive: boolean | undefined;

  @select('config') public config$: any | undefined;
}
