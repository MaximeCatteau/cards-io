import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ApiService } from 'src/app/Services/api.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  playerCareer: any;
  collectionProgression: any;
  playerInfos: any;

  selectTitle = new FormGroup({
    title: new FormControl('')
  });

  currentTitle: any;
  currentColor: any;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    }
  };
  // Total cards
  public totalCardsPieChartLabels: Label[] = ['Cartes récupérées', 'Total de cartes à récupérer'];
  public totalCardsPieChartData: number[] = [10, 118];

  // Collections completed
  public collectionsCompletedPieChartLabels: Label[] = ['Collections complétées', 'Total de collections à compléter'];
  public collectionsCompletedPieChartData: number[] = [0, 18];

  // Collections to get
  public collectionsToGetPieChartLabels: Label[] = ['Collections récupérées', 'Total de collections à récupérer'];
  public collectionsToGetPieChartData: number[] = [7, 18];

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.1)', 'rgba(0,0,255,0.1)'],
    },
  ];

  constructor(public api: ApiService, public router: Router) {

  }

  ngOnInit() {
    this.api.profileService.getCareer(localStorage['token']).subscribe((career) => {
      this.playerCareer = career;
      this.setTotalCardsData();
      this.api.profileService.getProfileInfos(localStorage['token'], this.playerCareer.playerId).subscribe((infos) => {
        this.playerInfos = infos;
        this.currentColor = this.playerInfos.selectedTitleColor;
        this.currentTitle = this.playerInfos.selectedTitle;
      });
    });

    this.api.profileService.getCollectionsProgression(localStorage['token']).subscribe((progression) => {
      this.collectionProgression = progression;
    });
  }

  setTotalCardsData() {
    this.totalCardsPieChartData = [this.playerCareer.totalCards, this.playerCareer.totalCardsToGet];
  }

  changeTitle() {
    this.currentTitle = this.selectTitle.value['title'];
    this.api.profileService.changeTitle(localStorage['token'], this.selectTitle.value['title']).subscribe((t: any) => {
      this.currentColor = t.color;
    });
  }
}
