import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {catchError, map, take} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CardModel } from './card-model';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private url = "https://api.magicthegathering.io/v1/cards";
  private url2 = "https://localhost:44301/api/MagicAPI/";
  private jsonUlr = "https://jsonplaceholder.typicode.com/posts";

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'POST, GET',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'

   })
  };

  constructor( private httpClient: HttpClient) { }

  getCards() {
    console.log(this.url);
    return this.httpClient.get(this.jsonUlr);
  }

  //Gets the name Parameter from the json in the api
  searchForCard(cardName: string): Observable<Card>{
    if(!isNaN(Number(cardName))){
      return this.httpClient.get<Card>(this.url2 + "cardById/" + Number(cardName), this.httpOptions);
    }
    else{
      return this.httpClient.get<Card>(this.url2 + "cardByName/" + cardName, this.httpOptions);
    }
  }

  /*
//To use JSONP, we have to first include the HttpClientJsonpModule in the
  getCards() : Observable <any>{
    return this.httpClient.jsonp(this.url, 'callback').pipe(

   );
}
 */

  /*
  getCards(): Observable<any[]>{
    console.log("Card service is called" +this.http.get<any>(this.url));
    return this.http.get<[any]>(this.jsonUlr);

            .pipe(map((data: any) => data.result ),
                  catchError(error => { return throwError('Its a Trap!')})
            );

  };

  */


   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };

  // }
  // /** Log a HeroService message with the MessageService */
  // private log(message: string) {
  //   console.log(message);
  // }

}
