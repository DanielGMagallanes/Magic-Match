import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { PlayerViewModel } from '../player-view-model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  playerviewModel: PlayerViewModel = new PlayerViewModel();
  @Input() login1: boolean = false;
  @Input() playerViewModel: PlayerViewModel; 
  @Output() playerEvent = new EventEmitter<PlayerViewModel>();
  
  IWannaLogIn():void{
    this.login1=true;
    console.log("in nav bar IwannaLogIn works");
  }

  IWannaLogOut():void{
    this.login1=false;
    console.log("in nav bar IwannaLogOut works");
  }
  addPlayer(newItem: PlayerViewModel) {
    this.playerviewModel = newItem;
    this.BackUpPlayer(newItem);
    console.log("in the add player "); 
  }

  BackUpPlayer(playerLogedin: PlayerViewModel)
  {
    this.playerEvent.emit(this.playerViewModel);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
