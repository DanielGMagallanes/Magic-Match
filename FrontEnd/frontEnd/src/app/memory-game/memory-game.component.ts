import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css']
})
export class MemoryGameComponent implements OnInit {
  cards: any[] = [1,2,3,4,5,6,7,8,9,10];


  constructor() { }

  ngOnInit(): void {
  }

  onSelectCard(){
    console.log("clicked card number:  " + 2);
  }

}
