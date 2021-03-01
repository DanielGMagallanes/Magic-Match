import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardService } from '../card.service'

@Component({
  selector: 'app-get-cards',
  templateUrl: './get-cards.component.html',
  styleUrls: ['./get-cards.component.css']
})
export class GetCardsComponent implements OnInit {
  cards: any = [];
  subscription: Subscription;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    
    this.getCards();
  }
  /*
    get cards from third party Api: get first 20 cards.
  */
  getCards(){
    console.log("getCards is called");
    this.cardService.getCards().subscribe(data => {
      this.cards = data;
      console.log("getcards: " + this.cards);
    })
  }
}
