import {Component, HostListener, NgIterable, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../theme-options';
import {Observable} from 'rxjs';
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
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.api.collectionService.getPlayerCollections(this.user).subscribe((collections) => {
      this.collections = collections;
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
}
