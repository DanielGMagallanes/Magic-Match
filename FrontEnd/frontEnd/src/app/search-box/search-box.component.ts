import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from '../card.service';
import { CardModel } from '../card-model';
import { Card } from '../card'

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  card : CardModel;
  submitted : boolean = false;
  cardName: string;
  view: boolean = false;
  
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  OnSubmit(): void{
    console.log("searchForCard is called "+this.cardName);
    this.cardService.searchForCard(this.cardName).subscribe(data => this.card = data);

    this.submitted = true;
    this.view = true;
   
  }

}
