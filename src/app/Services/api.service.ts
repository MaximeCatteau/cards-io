import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/';
  //private baseUrl = 'https://young-waters-05741.herokuapp.com/';

  constructor(public http: HttpClient) { }

  public cards = {
    getCards: () => {
      const get = this.http.get(this.baseUrl + 'cards');

      return get;
    },

    getAllPlayerCards: (username: any) => {
      const get = this.http.get(this.baseUrl + 'player/cards', { params: { playerName: username }});
      return get;
    },

    getPlayerCardsByCollection: (username: any, collectionId: any) => {
      const body = {
        username: username,
        password: ''
      };

      const params = {
        collectionId: collectionId
      } 

      const post = this.http.post(this.baseUrl + 'player/cards/collection', body, { params: params });

      return post;
    }
  }

  public collectionService = {
    getPlayerCollections: (username: any) => {
      const body = {
        username: username,
        password: ''
      };

      const post = this.http.post(this.baseUrl + 'collections/owned', body);

      return post;
    },

    getCollectionCardCount: (collectionId: any) => {
      const params = {
        collectionId: collectionId
      };

      const get = this.http.get(this.baseUrl + 'cards/collection/length', { params: params });

      return get;
    },

    getCollectionsNotAlreadyPaidByUser: (username: any) => {
      const body = {
        username: username,
        password: ''
      };

      const post = this.http.post(this.baseUrl + 'collections/notAlreadyPaid', body);

      return post;
    },

    buyCollection: (username: any, collectionId: any) => {
      const body = {
        username: username,
        password: ''
      };

      const params = {
        collectionId: collectionId
      };

      const post = this.http.post(this.baseUrl + 'collections/buy', body, { params: params });

      return post;
    }
  }

  public userService = {
    signIn: (username: any, password: any) => {
      const body = {
        username: username,
        password: password
      };

      const post = this.http.post(this.baseUrl + 'signin', body);

      return post;
    },
    signUp: (username: any, password: any) => {
      const body = {
        username: username,
        password: password
      };

      const post = this.http.post(this.baseUrl + 'signup', body);

      return post;
    }
  }

  public codeService = {
    consumeCode: (username: any, code: any) => {
      const body = {
        username: username,
        password: ''
      };

      const params = {
        code: code
      };

      const post = this.http.post(this.baseUrl + 'consume', body, { params: params });

      return post;
    }
  }
}
