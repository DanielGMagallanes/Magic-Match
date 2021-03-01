import { Component , Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { LoginPlayerViewModel } from './login-player-view-model';
import { PlayerViewModel } from './player-view-model';
import { PlayerService } from './player.service';
import { DataService } from './data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontEnd';
  login = false;
  playerViewModel: PlayerViewModel = new PlayerViewModel();
  loginplayerview: LoginPlayerViewModel = new LoginPlayerViewModel();

 // @Input('Inplayer') viewModel: PlayerViewModel;
 constructor(private playerservice: PlayerService, private dataService: DataService) { }
  ngOnInit(): void {


  }
  LoginPlease()
  {
    this.login = true;
    this.dataService.playerViewModel = this.playerViewModel;
  }
  setPlayer(newItem: LoginPlayerViewModel) {
    this.playerservice.LoginPlayer(newItem).subscribe(x => this.playerViewModel = x);
    console.log("app compo ");
  }
}

// export class CardInfoFromSearch{
//   url = 'https://localhost:44301/api/MagicAPI/cardById/${search2}'
// }
