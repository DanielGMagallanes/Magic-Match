import { Component, OnInit ,Input} from '@angular/core';
import { flattenDiagnosticMessageText } from 'typescript';
import { CardModel } from '../card-model';
import { ColletionViewModel } from '../colletion-view-model';
import { DataService } from '../data.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {
  @Input() playerid: string;
  collection: ColletionViewModel = new ColletionViewModel();
  view = false;
  cards: CardModel[];
  numberOfCards: any[] = [1,2,3,4,5,5,5,5,5,5,5,5,5,5];
  heroes: any[] = [1,2,3,4,5,5,5,5,5,5,5,5,5,5];


  constructor(private playerservice: PlayerService, private dataService: DataService) { }

  ngOnInit(): void {
    this.view = true;
    this.getCollections();
  }

  getCollections()
  {
    this.collection.collectionHolder = this.dataService.playerViewModel.playerId;
    this.playerservice.GetCollection(this.collection).subscribe(x => this.collection = x);
  }

  GetCards(){
    this.playerservice.GetCards(this.collection).subscribe(x => this.cards = x);
  }

}
