import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-who-am-i-admin',
  templateUrl: './who-am-i-admin.component.html'
})

export class WhoAmIAdminComponent implements OnInit {
  
  heading = "Qui suis-je ? Panel administrateur";
  subheading = "Cette zone vous permet de gérer l'environnement du jeu 'Qui suis-je ?'";
  icon = "vsm-icon pe-7s-cup icon-gradient bg-warm-flame";

  seasons: any;
  newSeason: FormGroup = new FormGroup({
    name: new FormControl(),
    numberOfDays: new FormControl()
  });

  constructor(public api: ApiService, public modalService: NgbModal, private formBuilder: FormBuilder, public route: ActivatedRoute) {}


  ngOnInit() {
   this.api.whoAmIService.getAllWhoAmISeasons().subscribe((s) => {
    this.seasons = s;
    this.seasons.forEach(season => {
      this.api.whoAmIService.getPlayerCountForSeason(season.id).subscribe((t) => {
        season.numberOfPlayers = t;
      });
    });
   });
  }

  openCreateSeason(content) {
    this.modalService.open(content);
  }

  validateForm() {
    console.log(this.newSeason.controls.name.value);
    this.api.whoAmIService.createNewSeason(this.newSeason.controls.name.value, this.newSeason.controls.numberOfDays.value).subscribe((a) => {
      this.modalService.dismissAll();
    });
  }

}
