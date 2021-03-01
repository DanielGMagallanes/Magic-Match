import { isFormattedError } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-memory-action',
  templateUrl: './memory-action.component.html',
  styleUrls: ['./memory-action.component.css']
})
export class MemoryActionComponent implements OnInit {
  
  
 

  score = 0;
  numberFlip = 0;
  CardOne= {
    matched: false,
    cardId: '1',
    cardIndex: 0,
    state: 'defualt',
    imgUl: "./../assets/images/Image-1.jpg",

  };

  CardTwo= {
    matched: false,
    cardId: '1',
    cardIndex: 0,
    state: 'defualt',
    imgUl: "./../assets/images/Image-1.jpg",

  };
  
  // cardOneId = '0';
  // cardTwoId = '0';
 
/*
  imgUrl = "./../assets/images/Image-1.jpg";
  imgUrl2 = "./../assets/images/Image-2.jpg";
  imgUrl3 = "./../assets/images/Image-3.jpg";
  imgUrl4 = "./../assets/images/Image-4.jpg";
  imgUrl5 = "./../assets/images/magic.png";
  card = {
    matched: false,
    cardId: '1',

  }
  */
 
 card1 = {
   matched: false,
   cardId: '1',
   cardIndex: 0,
   state: 'defualt',
   imgUl: "./../assets/images/Image-1.jpg",
 }
 card2 = {
   matched: false,
   cardId: '2',
   cardIndex: 0,
   state: 'defualt',
   imgUl: "./../assets/images/Image-2.jpg",
 }
 card3 = {
   matched: false,
   cardId: '3',
   cardIndex: 0,
   state: 'defualt',
   imgUl: "./../assets/images/Image-3.jpg",
 }
 card4 = {
   matched: false,
   cardId: '4',
   cardIndex: 0,
   state: 'defualt',
   imgUl: "./../assets/images/Image-4.jpg",
 }

 card5 = {
   matched: false,
   cardId: '5',
   cardIndex: 0,
   state: 'defualt',
   imgUl: "./../assets/images/magic.png",
 }
 
  cards: any[] = [this.card1, this.card2, this.card3, this.card4, this.card5];
  cards2: any[] = [this.card1, this.card2, this.card3, this.card4, this.card5];

  
  
  constructor() { 
   
  }

  ngOnInit(): void {
    this.cards = this.cards.concat(this.cards2);
    this.cards = this.randomArrayShuffle(this.cards);
  }


  /*
   Method Name: clickedCard
   param: 
  */
  clickedCard(card: any, index: number){
      if(this.checkIfAlreadyMatched(card)){
        console.log("this card has been matched");
        return;
      }
     
    if (this.numberFlip == 2){

      console.log("comming card : " + card.matched);
      console.log("existing card : " + this.CardOne.matched);
      //flip card back if they were not matched
      if(this.CardOne.matched == false){
        let element = document.getElementById(String(this.CardOne.cardIndex));
        element.className = 'default';
        element = document.getElementById(String(this.CardTwo.cardIndex));
        element.className = 'default';
      }
 
       this.numberFlip = 0;
    }
    //check card state: 
    //flipp the first card
    if(this.numberFlip == 0){
      let element = document.getElementById(String(index));
      element.className = 'flip-card-inner';
      this.CardOne.cardIndex = index;
      this.CardOne.cardId = card.cardId;
      this.CardOne.matched = false;
      this.CardOne.state = 'flipped';
      //console.log("new card Id " + this.CardOne.cardId);
      //console.log("new card state " + this.CardOne.state);
      //console.log("new card  cardIndex " + this.CardOne.cardIndex);
      this.numberFlip++;
    }
    //check if not the same card
    if(this.numberFlip >= 1){
     // console.log(" incoming cardindex " + index + " and card previous card index is " + this.CardOne.cardIndex);
      if((index) != this.CardOne.cardIndex){
        //flip the second card
        let element = document.getElementById(String(index));
        element.className = 'flip-card-inner';
        this.numberFlip++;
        this.CardTwo.matched = false;
        this.CardTwo.cardIndex = index;
        this.CardTwo.cardId = card.cardId;
        this.CardTwo.state = 'flipped';

        //check if match
  
      }
      
    }
    if(this.numberFlip == 2){// check if they matched
        if(this.CardOne.cardId == this.CardTwo.cardId){
          for(var i = 0; i < this.cards.length; i++){
            if(card.cardId == this.cards[i].cardId){
              this.cards[i].matched = true;
            }
          }
          console.log("They are matched");
          this.CardOne.matched = true;
          this.CardOne.matched = true;
          //reset
          this.numberFlip = 0;
          this.score++;
        }else{ //

          console.log("They are not matched ");
        
        }

    }
    console.log("current clicked " + this.numberFlip);
    
  }
  
  /*
    Method Name: flippedCard
    param: 
    Definition: flip card which was cliked.
  */

  flippedCardBack(){

  }

  /*
    Method Name: checkCard
  */
  checkCard(){
    if(this.CardTwo.cardId == this.CardOne.cardId){
      console.log(" they are matched");
      // modified card
    }
  }
 /*
  flippedCard(cardIndex: string, cardId: string, matched: boolean){
    this.num = cardIndex;

    console.log("index number ===> " + cardIndex);
    if(this.numberFlip == 2){
      
      let element = document.getElementById(this.cardOne);
      element.className = 'none';
      element = document.getElementById(this.cardTwo);
      element.className = 'none';
      this.numberFlip = 0;
    }
    if(this.numberFlip == 0){ 
      this.cardOne = cardIndex;
      this.cardOneId = cardId;
    }
    if(this.numberFlip == 1) { 
      this.cardTwo = cardId;
      this.cardTwoId = cardId
    }
  
    //console.log("class id is :  " + this.num);
    let element = document.getElementById(cardIndex);
    element.className = 'flip-card-inner';
    this.numberFlip++;
    /*
      check if two card id is match

    */
  //  if(this.numberFlip == 2){
  //    this.checkForMatched(this.cardOne, this.cardTwo)

  //  }


  // }
  /*
    Method Name: checkForMatched
    param: two card id
    return: true or false
  */

  checkIfAlreadyMatched(card: any): boolean{
   // console.log("card 1 " +  this.cardOneId + " card2 " + this.cardTwoId);
   for(var i = 0; i < this.cards.length; i++){
      if(card.cardId == this.cards[i].cardId){
        if(this.cards[i].matched == true){
          return true;
        }
      }
   }
    

    return false;
  }


   /*
    Method Name: randomArrayShuffle
    Return: Shuffled array
  */
 
 randomArrayShuffle(array: string[]){
  var currentIndex = array.length, temporaryValue, randomIndex;
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;


  return array;
 }
  
}
