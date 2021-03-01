import { Component, OnInit } from '@angular/core';
import { PlayerViewModel } from '../player-view-model';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  playerList: PlayerViewModel[];
  selectedPlayer: PlayerViewModel = new PlayerViewModel();


  constructor(private playerService: PlayerService) { }


  ngOnInit(): void {
    this.playerService.PlayerList().subscribe(x => this.playerList = x);
  }

}