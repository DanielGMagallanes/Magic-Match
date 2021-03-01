import { Component, OnInit } from '@angular/core';
import {Card } from '../card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  card: Card = {
  id: 1,
  attackNumber: 2,
  defenseNumber: 3,
  inDeck: true,
  cardClass: "yes",
  cardName: 'Magic card',
  cardId: 8,
  collectionID: 'sdfsdf',
  qty: 5,
  imageURL: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png'

 };

 cards: Card[];
  constructor() { }

  ngOnInit(): void {
  }

}
