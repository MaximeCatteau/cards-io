import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cpuUsage } from 'process';

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

    postNewDay: (token: any, league1: any, league2: any) => {
      const body = {
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
}
