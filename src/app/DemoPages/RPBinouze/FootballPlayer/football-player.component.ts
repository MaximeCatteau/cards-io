import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-football-player-card',
  templateUrl: './football-player.component.html'
})
export class FootballPlayerComponent implements OnInit {

  physicalAttributes = ['acceleration', 'verticalExtension', 'equilibrium', 'naturalPhysicAbilities', 'agility', 'endurance', 'endurance', 'power', 'speed'];
  mentalAttributes = ['aggressiveness', 'ballCalls', 'bravery', 'determination', 'collectiveGame', 'placement', 'gameView', 'anticipation', 
                      'concentration', 'decisionMaking', 'inspiration', 'leadership', 'coldBlood', 'gameVolume' ];
  technicalAttributes = ['centers', 'corners', 'dribbles', 'headers', 'passes', 'tackles', 'longShots', 'ballControl', 'freeKicks', 'finition', 'marking', 
                         'penalty', 'technique', 'longThrows', 'communication', 'ballCatches', 'fistClearances', 'handThrows', 'extension', 'inFeetExits', 
                         'reflexes', 'clearances', 'inboxExits', 'excentricity', 'oneVersusOne' ];

  footballPlayer;

  constructor(public api: ApiService, public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    this.route.url.subscribe((e) => {
      const footballPlayerId = e[2].path;
      this.api.rpbinouzeService.getFootballPlayerProfileById(footballPlayerId).subscribe((p) => {
        this.footballPlayer = p;
      });
    });
  }

  getInitialsUrl() {
    if (!this.footballPlayer) {
      return;
    }

    if (this.footballPlayer.number >= 10) {
      const left = this.footballPlayer.number.toString().charAt(0);
      const right = this.footballPlayer.number.toString().charAt(1);

      return "https://ui-avatars.com/api/?background=008038&color=fff&rounded=true&size=128&name=" + left + '+' + right;
    }

    return "https://ui-avatars.com/api/?background=008038&color=fff&rounded=true&size=128&name=" + this.footballPlayer.number;
  }

  displayNationalities() {
    if (!this.footballPlayer) {
      return;
    }

    let nationalities = "";

    nationalities += this.footballPlayer.mainNationality + " " + this.footballPlayer.mainNationalityFlag;

    if (this.footballPlayer.secondNationality) {
      nationalities += " / " + this.footballPlayer.secondNationality + " " + this.footballPlayer.secondNationalityFlag; 
    }

    return nationalities;
  }

  stringifyPostAndPosition() {
    if (!this.footballPlayer) {
      return;
    }

    let post = "";

    switch(this.footballPlayer.post) {
      case 'GOALKEEPER':
        post += "Gardien de but";
        return post;
      case 'DEFENDER':
        post += "Défenseur ";
        break;
      case 'MIDFIELDER':
        post += "Milieu ";
        break;
      case 'WINGER':
        post += 'Ailier ';
        break;
      case 'FORWARD':
        post += 'Buteur';
        return post;
    }

    switch(this.footballPlayer.position) {
      case 'CENTER':
        post += 'central';
        break;
      case 'CENTER_OFFENSIVE':
        post += 'offensif central';
        break;
      case 'LEFT':
        post += 'gauche';
        break;
      case 'RIGHT':
        post += 'droit';
        break;
    }

    return post;
  }

  isGoalKeeper() {
    if (!this.footballPlayer) {
      return;
    }

    return this.footballPlayer.post == 'GOALKEEPER';
  }

  improve(capacity) {
    switch(capacity) {
      case 'acceleration':
        this.footballPlayer.physicalAttributes.acceleration += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'verticalExtension':
        this.footballPlayer.physicalAttributes.verticalExtension += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'equilibrium':
        this.footballPlayer.physicalAttributes.equilibrium += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'naturalPhysicAbilities':
        this.footballPlayer.physicalAttributes.naturalPhysicAbilities += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'agility':
        this.footballPlayer.physicalAttributes.agility += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'endurance':
        this.footballPlayer.physicalAttributes.endurance += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'power':
        this.footballPlayer.physicalAttributes.power += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'speed':
        this.footballPlayer.physicalAttributes.speed += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'centers':
        this.footballPlayer.technicalAttributes.centers += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'corners':
        this.footballPlayer.technicalAttributes.corners += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'ballControl':
        this.footballPlayer.technicalAttributes.ballControl += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'freeKicks':
        this.footballPlayer.technicalAttributes.freeKicks += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'dribbles':
        this.footballPlayer.technicalAttributes.dribbles += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'headers':
        this.footballPlayer.technicalAttributes.headers += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'finition':
        this.footballPlayer.technicalAttributes.finition += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'marking':
        this.footballPlayer.technicalAttributes.marking += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'passes':
        this.footballPlayer.technicalAttributes.passes += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'tackles':
        this.footballPlayer.technicalAttributes.tackles += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'penalty':
        this.footballPlayer.technicalAttributes.penalty += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'technique':
        this.footballPlayer.technicalAttributes.technique += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'longShots':
        this.footballPlayer.technicalAttributes.longShots += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'longThrows':
        this.footballPlayer.technicalAttributes.longThrows += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'aggressiveness':
        this.footballPlayer.mentalAttributes.aggressiveness += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'ballCalls':
        this.footballPlayer.mentalAttributes.ballCalls += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'bravery':
        this.footballPlayer.mentalAttributes.bravery += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'determination':
        this.footballPlayer.mentalAttributes.determination += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'collectiveGame':
        this.footballPlayer.mentalAttributes.collectiveGame += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'placement':
        this.footballPlayer.mentalAttributes.placement += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'gameView':
        this.footballPlayer.mentalAttributes.gameView += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'anticipation':
        this.footballPlayer.mentalAttributes.anticipation += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'concentration':
        this.footballPlayer.mentalAttributes.concentration += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'decisionMaking':
        this.footballPlayer.mentalAttributes.decisionMaking += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'inspiration':
        this.footballPlayer.mentalAttributes.inspiration += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'leadership':
        this.footballPlayer.mentalAttributes.leadership += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'coldBlood':
        this.footballPlayer.mentalAttributes.coldBlood += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'gameVolume':
        this.footballPlayer.mentalAttributes.gameVolume += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'communication':
        this.footballPlayer.technicalAttributes.communication += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'ballCatches':
        this.footballPlayer.technicalAttributes.ballCatches += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'fistClearances':
        this.footballPlayer.technicalAttributes.fistClearances += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'handThrows':
        this.footballPlayer.technicalAttributes.handThrows += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'extension':
        this.footballPlayer.technicalAttributes.extension += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'inFeetExits':
        this.footballPlayer.technicalAttributes.inFeetExits += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'reflexes':
        this.footballPlayer.technicalAttributes.reflexes += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'clearances':
        this.footballPlayer.technicalAttributes.clearances += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'inboxExits':
        this.footballPlayer.technicalAttributes.inboxExits += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'excentricity':
        this.footballPlayer.technicalAttributes.excentricity += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
      case 'oneVersusOne':
        this.footballPlayer.technicalAttributes.oneVersusOne += 1;
        this.footballPlayer.pointsToSet -= 1;
        break;
    }

    setTimeout(() => {
      if (this.physicalAttributes.includes(capacity)) {
        this.updatePhysicalAttribute(capacity);
      } else if (this.mentalAttributes.includes(capacity)) {
        this.updateMentalAttribute(capacity);
      } else if (this.technicalAttributes.includes(capacity) && !this.isGoalKeeper()) {
        this.updateFieldPlayerTechnicalAttribute(capacity);
      } else if (this.technicalAttributes.includes(capacity) && this.isGoalKeeper()) {
        this.updateGoalKeeperTechnicalAttribute(capacity);
      }
    }, 300);
  }

  canImprove(capacity) {
    if (!this.footballPlayer) {
      return;
    }

    if (this.footballPlayer.pointsToSet <= 0) {
      return false;
    }

    switch(capacity) {
      case 'centers':
        if (this.footballPlayer.technicalAttributes.centers >= 20) {
          return false;
        }
        return true;
      case 'corners':
        if (this.footballPlayer.technicalAttributes.corners >= 20) {
          return false;
        }
        return true;
      case 'ballControl':
      if (this.footballPlayer.technicalAttributes.ballControl >= 20) {
        return false;
      }
      return true;
    case 'dribbles':
      if (this.footballPlayer.technicalAttributes.dribbles >= 20) {
        return false;
      }
      return true;
    case 'freeKicks':
      if (this.footballPlayer.technicalAttributes.freeKicks >= 20) {
        return false;
      }
      return true;
    case 'finition':
      if (this.footballPlayer.technicalAttributes.finition >= 20) {
        return false;
      }
      return true;
    case 'headers':
      if (this.footballPlayer.technicalAttributes.headers >= 20) {
        return false;
      }
      return true;
    case 'passes':
      if (this.footballPlayer.technicalAttributes.passes >= 20) {
        return false;
      }
      return true;
    case 'marking':
      if (this.footballPlayer.technicalAttributes.marking >= 20) {
        return false;
      }
      return true;
    case 'penalty':
      if (this.footballPlayer.technicalAttributes.penalty >= 20) {
        return false;
      }
      return true;
    case 'tackles':
      if (this.footballPlayer.technicalAttributes.tackles >= 20) {
        return false;
      }
      return true;
    case 'longShots':
      if (this.footballPlayer.technicalAttributes.longShots >= 20) {
        return false;
      }
      return true;
    case 'technique':
      if (this.footballPlayer.technicalAttributes.technique >= 20) {
        return false;
      }
      return true;
    case 'longThrows':
      if (this.footballPlayer.technicalAttributes.longThrows >= 20) {
        return false;
      }
      return true;
    case 'acceleration':
      if (this.footballPlayer.physicalAttributes.acceleration >= 20) {
        return false;
      }
      return true;
    case 'verticalExtension':
      if (this.footballPlayer.physicalAttributes.verticalExtension >= 20) {
        return false;
      }
      return true;
    case 'equilibrium':
      if (this.footballPlayer.physicalAttributes.equilibrium >= 20) {
        return false;
      }
      return true;
    case 'naturalPhysicAbilities':
      if (this.footballPlayer.physicalAttributes.naturalPhysicAbilities >= 20) {
        return false;
      }
      return true;
    case 'agility':
      if (this.footballPlayer.physicalAttributes.agility >= 20) {
        return false;
      }
      return true;
    case 'endurance':
      if (this.footballPlayer.physicalAttributes.endurance >= 20) {
        return false;
      }
      return true;
    case 'power':
      if (this.footballPlayer.physicalAttributes.power >= 20) {
        return false;
      }
      return true;
    case 'speed':
      if (this.footballPlayer.physicalAttributes.speed >= 20) {
        return false;
      }
      return true;
    case 'aggressiveness':
      if (this.footballPlayer.mentalAttributes.aggressiveness >= 20) {
        return false;
      }
      return true;
    case 'ballCalls':
      if (this.footballPlayer.mentalAttributes.ballCalls >= 20) {
        return false;
      }
      return true;
    case 'bravery':
      if (this.footballPlayer.mentalAttributes.bravery >= 20) {
        return false;
      }
      return true;
    case 'determination':
      if (this.footballPlayer.mentalAttributes.determination >= 20) {
        return false;
      }
      return true;
    case 'collectiveGame':
      if (this.footballPlayer.mentalAttributes.collectiveGame >= 20) {
        return false;
      }
      return true;
    case 'placement':
      if (this.footballPlayer.mentalAttributes.placement >= 20) {
        return false;
      }
      return true;
    case 'gameView':
      if (this.footballPlayer.mentalAttributes.gameView >= 20) {
        return false;
      }
      return true;
    case 'anticipation':
      if (this.footballPlayer.mentalAttributes.anticipation >= 20) {
        return false;
      }
      return true;
    case 'concentration':
      if (this.footballPlayer.mentalAttributes.concentration >= 20) {
        return false;
      }
      return true;
    case 'decisionMaking':
      if (this.footballPlayer.mentalAttributes.decisionMaking >= 20) {
        return false;
      }
      return true;
    case 'inspiration':
      if (this.footballPlayer.mentalAttributes.inspiration >= 20) {
        return false;
      }
      return true;
    case 'leadership':
      if (this.footballPlayer.mentalAttributes.leadership >= 20) {
        return false;
      }
      return true;
    case 'coldBlood':
      if (this.footballPlayer.mentalAttributes.coldBlood >= 20) {
        return false;
      }
      return true;
    case 'gameVolume':
      if (this.footballPlayer.mentalAttributes.gameVolume >= 20) {
        return false;
      }
      return true;
    }
    
    return true;
  }

  updatePhysicalAttribute(attribute) {
    const attributes = {
      footballPlayerId: this.footballPlayer.id,
      attributeUpdated: attribute,
      acceleration: this.footballPlayer.physicalAttributes.acceleration,
      verticalExtension: this.footballPlayer.physicalAttributes.verticalExtension,
      equilibrium: this.footballPlayer.physicalAttributes.equilibrium,
      naturalPhysicAbilities: this.footballPlayer.physicalAttributes.naturalPhysicAbilities,
      agility: this.footballPlayer.physicalAttributes.agility,
      endurance: this.footballPlayer.physicalAttributes.endurance,
      power: this.footballPlayer.physicalAttributes.power,
      speed: this.footballPlayer.physicalAttributes.speed
    }

    this.api.rpbinouzeService.updatePhysicalAbility(attributes).subscribe(() => {});
  }

  updateMentalAttribute(attribute) {
    const attributes = {
      footballPlayerId: this.footballPlayer.id, 
      attributeUpdated: attribute,
      aggressiveness: this.footballPlayer.mentalAttributes.aggressiveness,
      ballCalls: this.footballPlayer.mentalAttributes.ballCalls,
      bravery: this.footballPlayer.mentalAttributes.bravery,
      determination: this.footballPlayer.mentalAttributes.determination,
      collectiveGame: this.footballPlayer.mentalAttributes.collectiveGame,
      placement: this.footballPlayer.mentalAttributes.placement,
      gameView: this.footballPlayer.mentalAttributes.gameView,
      anticipation: this.footballPlayer.mentalAttributes.anticipation,
      concentration: this.footballPlayer.mentalAttributes.concentration,
      decisionMaking: this.footballPlayer.mentalAttributes.decisionMaking,
      inspiration: this.footballPlayer.mentalAttributes.inspiration,
      leadership: this.footballPlayer.mentalAttributes.leadership,
      coldBlood: this.footballPlayer.mentalAttributes.coldBlood,
      gameVolume: this.footballPlayer.mentalAttributes.gameVolume
    }

    this.api.rpbinouzeService.updateMentalAbility(attributes).subscribe(() => {});
  }

  updateFieldPlayerTechnicalAttribute(attribute) {
    const attributes = {
      footballPlayerId: this.footballPlayer.id, 
      attributeUpdated: attribute,
      centers: this.footballPlayer.technicalAttributes.centers,
      corners: this.footballPlayer.technicalAttributes.corners,
      dribbles: this.footballPlayer.technicalAttributes.dribbles,
      headers: this.footballPlayer.technicalAttributes.headers,
      passes: this.footballPlayer.technicalAttributes.passes,
      tackles: this.footballPlayer.technicalAttributes.tackles,
      longShots: this.footballPlayer.technicalAttributes.longShots,
      ballControl: this.footballPlayer.technicalAttributes.ballControl,
      freeKicks: this.footballPlayer.technicalAttributes.freeKicks,
      finition: this.footballPlayer.technicalAttributes.finition,
      marking: this.footballPlayer.technicalAttributes.marking,
      penalty: this.footballPlayer.technicalAttributes.penalty,
      technique: this.footballPlayer.technicalAttributes.technique,
      longThrows: this.footballPlayer.technicalAttributes.longThrows
    }

    this.api.rpbinouzeService.updateFieldPlayerTechnicalAbility(attributes).subscribe(() => {});
  }

  updateGoalKeeperTechnicalAttribute(attribute) {
    const attributes = {
      footballPlayerId: this.footballPlayer.id, 
      attributeUpdated: attribute,
      passes: this.footballPlayer.technicalAttributes.passes,
      ballControl: this.footballPlayer.technicalAttributes.ballControl,
      communication: this.footballPlayer.technicalAttributes.communication,
      ballCatches: this.footballPlayer.technicalAttributes.ballCatches,
      fistClearances: this.footballPlayer.technicalAttributes.fistClearances,
      handThrows: this.footballPlayer.technicalAttributes.handThrows,
      extension: this.footballPlayer.technicalAttributes.extension,
      inFeetExits: this.footballPlayer.technicalAttributes.inFeetExits,
      reflexes: this.footballPlayer.technicalAttributes.reflexes,
      clearances: this.footballPlayer.technicalAttributes.clearances,
      inboxExits: this.footballPlayer.technicalAttributes.inboxExits,
      excentricity: this.footballPlayer.technicalAttributes.excentricity,
      oneVersusOne: this.footballPlayer.technicalAttributes.oneVersusOne
    }

    this.api.rpbinouzeService.updateGoalKeeperTechnicalAbility(attributes).subscribe(() => {});
  }
}
