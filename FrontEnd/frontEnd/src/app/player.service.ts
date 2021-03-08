import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { fullplayerview } from './fullplayerview';
import { LoginPlayerViewModel } from './login-player-view-model';
import { PlayerViewModel } from './player-view-model';
import { ColletionViewModel } from './colletion-view-model';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerViewModel: PlayerViewModel = new PlayerViewModel();
  loginPlayerViewModel: LoginPlayerViewModel = new LoginPlayerViewModel();
  playerview :fullplayerview = new fullplayerview(); 
   //private userUrlRemote = "https://magic-match-api.azurewebsites.net/api/";
   private userUrlRemote = "https://localhost:44301/api/";
  //private jsonUlr = "https://jsonplaceholder.typicode.com/posts";

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'

   })
  };
  constructor(private http: HttpClient) {

   }
 /* Get users from the server */
 getUsers(): Observable<any[]> {
   //console.log("get player:   " + this.http.get<any[]>(this.userUrl));
   return this.http.get<any[]>(this.userUrlRemote + 'player/GetPlayers')
   .pipe(
     tap(_ => this.log('get users')),
     catchError(this.handleError<any[]>('getUsers', []))
   );
 }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - get user by id
 * @param result - return a user
 */
getUserById(id: string): Observable<any>{
  const url = `${this.userUrlRemote}${id}`;
  return this.http.get<any>(url)
      .pipe(
        tap(_ => this.log(`etched hero id={id}`)),
        catchError(this.handleError<any>(`getuser id =${id}` ))
      );
}

 /** PUT: update the hero on the server */
updateUser(user: fullplayerview): Observable<any> {
  const body = JSON.stringify(user);
  console.log("Send over server to save:  " + body);
  return this.http.put(this.userUrlRemote+'player/EditPlayer', body, this.httpOptions).pipe(
    //tap(_ => this.log(`updated user id=${user.id}`)),
    catchError(this.handleError<any>('updateUser'))
  );
}
/** POST: add a new hero to the server */
addUser(user: LoginPlayerViewModel): void{
  const headers ={ 'content-type': 'application/json'}
  const body = JSON.stringify(user);
  console.log(body);
  this.http.post<any>(this.userUrlRemote + 'player/CreatePlayer',
  body, this.httpOptions).subscribe(x => this.playerview= x);
  console.log(this.playerview);
    //.pipe(
      //tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
 //     catchError(this.handleError<any>('add user'))
 // );

}

  /** DELETE: delete the hero from the server */
  deleteUser(user: PlayerViewModel): Observable<PlayerViewModel> {
    const body = JSON.stringify(user);
    const url = this.userUrlRemote + "DeletePlayer";

    return this.http.delete<PlayerViewModel>(url, this.httpOptions).pipe(
      catchError(this.handleError<PlayerViewModel>('deleteHero'))
    );
  }

  LoginPlayer(loginPlayerViewModel: LoginPlayerViewModel): Observable<PlayerViewModel> {
    //use http to post the player and get back the playerviewmodel
    //this.http.post<PlayerViewModel>(this.userUrlLocal + 'login', loginPlayerViewModel, this.httpOptions).subscribe(x=>this.playerViewModel = x);
    return this.http.post<PlayerViewModel>(this.userUrlRemote + 'player/login', loginPlayerViewModel, this.httpOptions);
  }
  getPlayer():PlayerViewModel{
    return this.playerViewModel;
  }

  GetCollection(collection: ColletionViewModel): Observable<ColletionViewModel> {
    return this.http.post<ColletionViewModel>(this.userUrlRemote + 'collection/collections', collection, this.httpOptions);
    //return this.http.request('get', 'https://localhost:44301/api/collection/collections', { body: collection });
  }

  GetCards(collection: ColletionViewModel): Observable<Card[]> {
    return this.http.post<Card[]>(this.userUrlRemote + 'collection/GetCardsInCollection', collection, this.httpOptions);
  }

  PlayerList(): Observable<PlayerViewModel[]> {
    return this.http.get<PlayerViewModel[]>(this.userUrlRemote + 'player/getplayers', this.httpOptions);
  }

  getCard(url: string): Observable<Card> {
    return this.http.get<Card>(url, this.httpOptions);
  }


 /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

 /** Log a HeroService message with the MessageService */
 private log(message: string) {
  //this.messageService.add(`HeroService: ${message}`);
}

}
