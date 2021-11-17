import {Component, HostListener, NgIterable, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../theme-options';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;
  public user = localStorage['user'];
  public collections: any | undefined;
  public player: any;

  constructor(public globals: ThemeOptions, private activatedRoute: ActivatedRoute, public api: ApiService, public router: Router) {

  }

  private newInnerWidth: number | undefined;
  private innerWidth: number | undefined;
  activeId = 'dashboardsMenu';

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  ngOnInit() {
    if (!localStorage['token']) {
      this.router.navigate(['/']);
    }

    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.api.collectionService.getPlayerCollections(localStorage['token']).subscribe((collections) => {
      this.collections = collections;
    });

    this.api.userService.getPlayer(localStorage['token']).subscribe((player) => {
      this.player = player;
      console.log(player);
      
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number }; }) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200 ) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }

  }

  getCollections() {
    return this.collections;
  }

  goToCollection(collectionId: string) {
    this.router.navigate(['/cards/' + collectionId]);
  }

  isUserConnected() {
    return localStorage['token'];
  }
}
