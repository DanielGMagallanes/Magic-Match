import { Injectable } from '@angular/core';
import { fullplayerview } from './fullplayerview';
import  {PlayerViewModel} from './player-view-model'


@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  sharedData: fullplayerview;
  playerViewModel: PlayerViewModel;

  constructor() { }
}
