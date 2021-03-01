import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  //https://localhost:44301/api/player/CreatePlayer  
  readonly aipUrl = "https://localhost:44301/api/player/getplayers";

  constructor(  private http: HttpClient,) { }
  getMatchHistory(): Observable<any[]> {
    return this.http.get<any>(this.aipUrl);
  }
}
