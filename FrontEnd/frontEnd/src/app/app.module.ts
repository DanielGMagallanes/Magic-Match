  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHistoryComponent } from './match-history/match-history.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayersComponent } from './players/players.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardCollectionComponent } from './card-collection/card-collection.component';
import { MemoryGameComponent } from './memory-game/memory-game.component';
//import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { GetCardsComponent } from './get-cards/get-cards.component';
import { MemoryActionComponent } from './memory-action/memory-action.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { TradeHubComponent } from './trade-hub/trade-hub.component';


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    NavBarComponent,
    MatchHistoryComponent,
    PlayersComponent,
    CardDetailsComponent,
    CardCollectionComponent,
    MemoryGameComponent,
    SignupComponent,
    LoginComponent,
    GetCardsComponent,
    MemoryActionComponent,
    SearchBoxComponent,
    TradeHubComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    HttpClientJsonpModule,
   
    //NbCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
