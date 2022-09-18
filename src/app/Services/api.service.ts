import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private baseUrl = 'http://localhost:8080/';
  
  private baseUrl = 'https://young-waters-05741.herokuapp.com/';

  constructor(public http: HttpClient) { }

  public cards = {
    getCards: () => {
      const get = this.http.get(this.baseUrl + 'cards');

      return get;
    },

    getAllPlayerCards: (token: any) => {
      const get = this.http.get(this.baseUrl + 'player/cards', { params: { token: token }});
      return get;
    },

    getPlayerCardsByCollection: (token: any, collectionId: any) => {
      const params = {
        token: token,
        collectionId: collectionId
      }
      const post = this.http.post(this.baseUrl + 'player/cards/collection', { }, { params: params });

      return post;
    },

    getDoublesForTradeCreation: (token: any) => {
      const post = this.http.post(this.baseUrl + 'player/cards/doubles', { }, { params: { token: token }});

      return post;
    },

    buyPack: (token: any, packNumber: any) => {
      const params = {
        token: token,
        packNumber: packNumber
      };
      
      const post = this.http.post(this.baseUrl + 'buy/pack', { }, { params: params });

      return post;
    }
  }

  public collectionService = {
    getPlayerCollections: (token: any) => {
      const post = this.http.post(this.baseUrl + 'collections/owned', {}, { headers: {'Access-Control-Allow-Origin': '*' },  params: { token: token }});

      return post;
    },

    getCollectionCardCount: (collectionId: any) => {
      const params = {
        collectionId: collectionId
      };

      const get = this.http.get(this.baseUrl + 'cards/collection/length', { headers: {'Access-Control-Allow-Origin': '*' },  params: params});

      return get;
    },

    getCollectionsNotAlreadyPaidByUser: (token: any) => {
      const post = this.http.post(this.baseUrl + 'collections/notAlreadyPaid', {}, { headers: {'Access-Control-Allow-Origin': '*' },  params: { token: token }});

      return post;
    },

    buyCollection: (token: any, collectionId: any) => {
      const params = {
        token: token,
        collectionId: collectionId
      };

      const post = this.http.post(this.baseUrl + 'collections/buy', { }, { params: params });

      return post;
    },

    getAllCollections: () => {
      const get = this.http.get(this.baseUrl + 'collections/all');

      return get;
    },

    getCollectionById: (collectionId: any) => {
      const get = this.http.get(this.baseUrl + 'collections', { params: { collectionId: collectionId }});

      return get;
    }
  }

  public userService = {
    signIn: (username: any, password: any) => {
      const body = {
        username: username,
        password: password
      };

      const post = this.http.post(this.baseUrl + 'signin', body, { headers: {'Access-Control-Allow-Origin': '*' }});

      return post;
    },
    signUp: (username: any, password: any) => {
      const body = {
        username: username,
        password: password
      };

      const post = this.http.post(this.baseUrl + 'signup', body, { headers: {'Access-Control-Allow-Origin': '*' }});

      return post;
    },
    logout: (token: any) => {
      const post = this.http.post(this.baseUrl + 'logout', {}, { params: { token: token }} );

      return post;
    },
    getPlayer: (token: any) => {
      const get = this.http.get(this.baseUrl + 'player', { headers: {'Access-Control-Allow-Origin': '*' },  params: { token: token }});

      return get;
    },

    getPlayers: (token: any) => {
      const get = this.http.get(this.baseUrl + 'players', { headers: {'Access-Control-Allow-Origin': '*' },  params: { token: token }});

      return get;
    },

    sendMoney: (token, userId, amount) => {
      const params = {
        token: token,
        userId: userId,
        amount: amount
      };

      const post = this.http.post(this.baseUrl + 'money', { }, { params: params });

      return post;
    },

    sendCode: (token, userId) => {
      const params = {
        token: token,
        userId: userId
      };

      const post = this.http.post(this.baseUrl + 'generate', { }, { params: params });

      return post;
    }
  }

  public codeService = {
    consumeCode: (token: any, code: any) => {
      const params = {
        token: token,
        code: code
      };

      const post = this.http.post(this.baseUrl + 'consume', { }, { params: params });

      return post;
    }
  }

  public tradeService = {
    getAllTradesInStepOne: () => {
      const get = this.http.get(this.baseUrl + 'trades/stepOne');

      return get;
    },

    getAllPlayerTrades: (token) => {
      const get = this.http.get(this.baseUrl + 'trades/player', { params: { token: token }});

      return get;
    },

    createTrade: (token, cardId) => {
      const params = {
        token: token,
        cardProposedId: cardId
      };

      const post = this.http.post(this.baseUrl + 'player/cards/trade/create', { }, { params: params});

      return post;
    },

    createProposition: (token, tradeId, cardId) => {
      const params = {
        token: token,
        tradeId: tradeId,
        traderCardId: cardId
      };
      const post = this.http.post(this.baseUrl + 'trades/proposition', { }, { params: params});

      return post;
    },

    getAllPlayerPropositions: (token) => {
      const get = this.http.get(this.baseUrl + 'trades/propositions', { params: { token: token }});

      return get;
    },

    makeTrade: (token, tradeId, tradePropositionId) => {
      const params = {
        token: token,
        tradeId: tradeId,
        tradePropositionId: tradePropositionId
      };

      const post = this.http.post(this.baseUrl + 'trades/trade/make', { }, { params: params });

      return post;
    },

    refuseTradeProposition: (tradePropositionId) => {
      const params = {
        tradePropositionId: tradePropositionId
      };

      const deleteRequest = this.http.delete(this.baseUrl + 'trades/proposition/refuse', { params: params });

      return deleteRequest;
    }
  }

  public profileService = {
    getCareer: (token: any) => {
      const get = this.http.get(this.baseUrl + 'career', { params: { token: token }});

      return get;
    },

    getCollectionsProgression: (token: any) => {
      const get = this.http.get(this.baseUrl + 'career/collections', { params: { token: token }});

      return get;
    },

    getProfileInfos: (token: any, playerId: any) => {
      const get = this.http.get(this.baseUrl + 'infos', { params: { token: token, userId: playerId }});

      return get;
    },

    changeTitle: (token: any, label: any) => {
      const post = this.http.post(this.baseUrl + 'title', { }, { params: { token: token, label: label }});

      return post;
    }
  }

  public logoService = {
    getLeague1Ladder: (token: any, seasonId: any) => {
      const get = this.http.get(this.baseUrl + 'logo/league/1', { params: { token: token, seasonId: seasonId }});

      return get;
    },
    
    getLeague2Ladder: (token: any, seasonId: any) => {
      const get = this.http.get(this.baseUrl + 'logo/league/2', { params: { token: token, seasonId: seasonId }});

      return get;
    },

    getLeague2aLadder: (token: any, seasonId: any) => {
      const get = this.http.get(this.baseUrl + 'logo/league/2/a', { params: { token: token, seasonId: seasonId }});

      return get;
    },

    getLeague2bLadder: (token: any, seasonId: any) => {
      const get = this.http.get(this.baseUrl + 'logo/league/2/b', { params: { token: token, seasonId: seasonId }});

      return get;
    },

    getDailyLadder: (token: any, seasonId) => {
      const params = {
        token: token,
        seasonId: seasonId
      };
      const get = this.http.get(this.baseUrl + 'logo/daily', { params: params });

      return get;
    },

    getSeasonSelected: (token: any, seasonId) => {
      const params = {
        token: token,
        seasonId: seasonId
      };

      const get = this.http.get(this.baseUrl + 'logo/season', { params: params });

      return get;
    },

    postNewDay: (token: any, seasonId: any, league1: any, league2: any) => {
      const body = {
        seasonId: seasonId,
        league1: league1,
        league2: league2
      }
      const post = this.http.post(this.baseUrl + 'logo/day', body, { params: { token: token }});

      return post;
    }
  }

  public ladderService = {
    getLadderByCollection: (collectionId: any) => {
      const get = this.http.get(this.baseUrl + "collection/ladder", { params: { collectionId: collectionId }});

      return get;
    },

    getGeneralLadder: () => {
      const get = this.http.get(this.baseUrl + "collection/ladder/general");

      return get;
    },
  }

  public whoAmIService = {
    getAllWhoAmISeasons: () => {
      const get = this.http.get(this.baseUrl + "who-am-i/seasons");

      return get;
    },

    getWhoAmISeason: (id) => {
      const get = this.http.get(this.baseUrl + "who-am-i/season", { params: { seasonId: id }});

      return get;
    },

    getPlayerCountForSeason: (seasonId) => {
      const get = this.http.get(this.baseUrl + "who-am-i/seasons/players/count", { params: { seasonId }});

      return get;
    },

    addSeasonPlayer: (discordId, seasonId) => {
      const post = this.http.post(this.baseUrl + "who-am-i/season/player/add", {}, { params: { discordId: discordId, seasonId: seasonId }});

      return post;
    },

    getDailyLadder: (token: any, seasonId) => {
      const params = {
        token: token,
        seasonId: seasonId
      };
      const get = this.http.get(this.baseUrl + 'who-am-i/daily', { params: params });

      return get;
    },

    getWhoAmILadder: (seasonId) => {
      const get = this.http.get(this.baseUrl + 'who-am-i/ladder', { params: { seasonId: seasonId }});

      return get;
    },

    postNewDay: (token: any, league) => {
      console.log(league);
      
      const body = {
        whoAmIPlayerResourceList: league
      };

      const post = this.http.post(this.baseUrl + "who-am-i/day", body, { params: { token: token }});

      return post;
    },

    createNewSeason: (seasonName, seasonDays) => {
      const body = {
        name: seasonName, 
        totalDays: seasonDays, 
        status: 'CREATED'
      };

      const post = this.http.post(this.baseUrl + "who-am-i/seasons/create", body);
      
      return post;
    }
  }

  public rpbinouzeService = {
    getPlayersOfClub: (clubName) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/players/club', { params: { clubName: clubName }});

      return get;
    },

    getPlayersForAdmin: () => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/admin/players');

      return get;
    },

    getFootballPlayerProfileById: (footballPlayerId) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/player', { params: { id: footballPlayerId }});
      
      return get;
    },

    updatePhysicalAbility: (updateResource) => {
      const body = {
        footballPlayerId: updateResource.footballPlayerId, 
        attributeUpdated: updateResource.attributeUpdated,
        acceleration: updateResource.acceleration,
        agility: updateResource.agility,
        endurance: updateResource.endurance,
        equilibrium: updateResource.equilibrium,
        naturalPhysicAbilities: updateResource.naturalPhysicAbilities,
        power: updateResource.power,
        speed: updateResource.speed,
        verticalExtension: updateResource.verticalExtension
      };
      
      const post = this.http.post(this.baseUrl + "rpbinouze/attributes/physical/update", body);

      return post;
    },

    updateMentalAbility: (updateResource) => {
      const body = {
        footballPlayerId: updateResource.footballPlayerId, 
        attributeUpdated: updateResource.attributeUpdated,
        aggressiveness: updateResource.aggressiveness,
        ballCalls: updateResource.ballCalls,
        bravery: updateResource.bravery,
        determination: updateResource.determination,
        collectiveGame: updateResource.collectiveGame,
        placement: updateResource.placement,
        gameView: updateResource.gameView,
        anticipation: updateResource.anticipation,
        concentration: updateResource.concentration,
        decisionMaking: updateResource.decisionMaking,
        inspiration: updateResource.inspiration,
        leadership: updateResource.leadership,
        coldBlood: updateResource.coldBlood,
        gameVolume: updateResource.gameVolume
      };
      
      const post = this.http.post(this.baseUrl + "rpbinouze/attributes/mental/update", body);

      return post;
    },

    updateFieldPlayerTechnicalAbility: (updateResource) => {
      const body = {
        footballPlayerId: updateResource.footballPlayerId, 
        attributeUpdated: updateResource.attributeUpdated,
        centers: updateResource.centers,
        corners: updateResource.corners,
        dribbles: updateResource.dribbles,
        headers: updateResource.headers,
        passes: updateResource.passes,
        tackles: updateResource.tackles,
        longShots: updateResource.longShots,
        ballControl: updateResource.ballControl,
        freeKicks: updateResource.freeKicks,
        finition: updateResource.finition,
        marking: updateResource.marking,
        penalty: updateResource.penalty,
        technique: updateResource.technique,
        longThrows: updateResource.longThrows
      };
      
      const post = this.http.post(this.baseUrl + "rpbinouze/attributes/technical/fieldplayer/update", body);

      return post;
    },

    updateGoalKeeperTechnicalAbility: (updateResource) => {
      const body = {
        footballPlayerId: updateResource.footballPlayerId, 
        attributeUpdated: updateResource.attributeUpdated,
        passes: updateResource.passes,
        ballControl: updateResource.ballControl,
        communication: updateResource.communication,
        ballCatches: updateResource.ballCatches,
        fistClearances: updateResource.fistClearances,
        handThrows: updateResource.handThrows,
        extension: updateResource.extension,
        inFeetExits: updateResource.inFeetExits,
        reflexes: updateResource.reflexes,
        clearances: updateResource.clearances,
        inboxExits: updateResource.inboxExits,
        excentricity: updateResource.excentricity,
        oneVersusOne: updateResource.oneVersusOne
      };
      
      const post = this.http.post(this.baseUrl + "rpbinouze/attributes/technical/goalkeeper/update", body);

      return post;
    },

    getMatchsForClub: (clubId) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/matchs', { params: { clubId: clubId }});

      return get;
    },

    getOtherClubs: () => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/clubs/allBut', { });

      return get;
    },

    getAllClubs: () => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/clubs/all', { });

      return get;
    },

    getCompetitions: () => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/competitions', { });

      return get;
    },

    createNewMatch: (createMatchResource) => {
      const body = {
        home: createMatchResource.home,
        away: createMatchResource.away,
        date: createMatchResource.date
      };

      const post = this.http.post(this.baseUrl + 'rpbinouze/match/create', body);

      return post;
    },

    getMatch: (matchId) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/match', { params: { matchId: matchId }});

      return get;
    },

    playMatch: (playMatchResource) => {
      const body = {
        id: playMatchResource.id,
        scoreHome: playMatchResource.scoreHome,
        scoreAway: playMatchResource.scoreAway,
        issue: playMatchResource.issue,
        strikers: playMatchResource.strikers,
        passers: playMatchResource.passers,
        manOfTheMatch: playMatchResource.manOfTheMatch,
        notes: playMatchResource.notes
      };

      const post = this.http.post(this.baseUrl + 'rpbinouze/match/play', body);

      return post;
    },
    
    scoreFCBinouze: (scorerId, passerId, minute) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/matchdeck/binouzeScore', { params: { scorerId: scorerId, passerId: passerId, minute: minute }});

      return get;
    },

    scoreOpponent: (opponentId, scorerId, passerId, minute) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/matchdeck/opponentScore', { params: { opponentId: opponentId, scorer: scorerId, passer: passerId, minute: minute }});

      return get;
    },

    beginMatch: (homeId, awayId, competitionId, stadium) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/matchdeck/beginMatch', { params: { homeId: homeId, awayId: awayId, competitionId: competitionId, stadium: stadium }});

      return get;
    },

    endMatch: (homeId, awayId, scoreHome, scoreAway, competitionId) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/matchdeck/endMatch', { params: { homeId: homeId, awayId: awayId, scoreHome: scoreHome, scoreAway: scoreAway, competitionId: competitionId }});

      return get;
    },

    yellowCardBinouze: (playerId, minute) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/matchdeck/yellowCardBinouze', { params: { playerId: playerId, minute: minute }});

      return get;
    },

    yellowCardOpponent: (clubId, playerName, minute) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/matchdeck/yellowCardOpponent', { params: { clubId: clubId, playerName: playerName, minute: minute }});

      return get;
    },

    substituteFCBinouze: (playerOutId, playerInId, minute) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/matchdeck/subBinouze', { params: { playerOutId: playerOutId, playerInId: playerInId, minute: minute }});

      return get;
    },

    substituteOpponent: (clubId, playerOut, playerIn, minute) => {
      const get = this.http.get(this.baseUrl + 'rpbinouze/matchdeck/subOpponent', { params: { clubId: clubId, playerOut: playerOut, playerIn: playerIn, minute: minute }});

      return get;
    }
  }
}
