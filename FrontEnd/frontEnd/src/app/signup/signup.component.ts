
import { Component, OnInit , Input } from '@angular/core';

import {User} from '../user'
import {PlayerService} from '../player.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LoginPlayerViewModel } from '../login-player-view-model';
//import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Input() loginPlayerViewModel: LoginPlayerViewModel = new LoginPlayerViewModel();


  constructor(private playerService: PlayerService, private location: Location) { }

  ngOnInit(): void {
  }
  onSubmit(){

    //console.log("firstName: " + this.user.firstName.trim());
    //console.log("last Name: " + this.user.lastName.trim());
   // console.log("Passwored: " + this.user.password.trim());
   // console.log("email: " +this.user.email.trim());
     //let aUser = {
    //  userName: this.loginPlayerViewModel.username,
    //  password: this.loginPlayerViewModel.password,
    //}
    if(!this.loginPlayerViewModel.username){ return;}
     //add user to database by calling user service
    //console.log( "ADDED PLAYER:  " + this.playerService.addUser(this.loginPlayerViewModel));
    this.playerService.addUser(this.loginPlayerViewModel);
    this.gotBack();

  }
  gotBack(): void{
    this.location.back();
  }

}
