import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player.service';


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  card : Card;
  numId: number;
  private sub: any;
  private url = "https://localhost:44301/api/collection/GetCard/";
  constructor(private route: ActivatedRoute,private playerservice: PlayerService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.numId = +params['id']; // (+) converts string 'id' to a number
   });

   this.playerservice.getCard(""+this.url+this.numId+"").subscribe(x => this.card = x);
  }

}
