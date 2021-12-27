import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.component.html',
  styles: []
})
export class LadderComponent implements OnInit {
  
  heading = "Classement : ";
  subheading = "Consulter votre classement par rapport aux autres joueurs";
  icon = "vsm-icon pe-7s-cup icon-gradient bg-warm-flame";

  isLoading = true;
  collectionId: string | undefined;
  collection: any;
  ladder: any;

  constructor(public api: ApiService, public route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.route.url.subscribe((e) => {
      this.heading = "Classement : ";
      this.collectionId = e[1].path;
      if (this.collectionId == "0") {
        this.heading += "Général";
        this.api.ladderService.getGeneralLadder().subscribe((l) => {
          console.log(l);
          this.ladder = l;
        });
      } else {
        this.api.collectionService.getCollectionById(this.collectionId).subscribe((collection) => {
          this.collection = collection;
          this.heading += this.collection.name;
          this.api.ladderService.getLadderByCollection(this.collectionId).subscribe((l) => {
            console.log(l);
            this.ladder = l;
          });
        });
      }
    });
  }

  
}
