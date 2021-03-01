import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
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
import { LoginPlayerViewModel } from './login-player-view-model';
import { PlayerViewModel } from './player-view-model';
import { PlayerService } from './player.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockPlayerService;
  let mockPlayerViewModel;

  let playerList = [
    {
      playerId: 'b9084d13-3a7a-4957-89bf-e7618e83e649',
      userName: 'tylercadena',
      password: 'revature',
      login: false,
      wins: 0,
      losses: 0,
      tokens: 0
    }
  ] as PlayerViewModel[];

  beforeEach(async () => {
    mockPlayerService = jasmine.createSpyObj('PlayerService', ['LoginPlayer']);
    mockPlayerViewModel = mockPlayerService.LoginPlayer.and.returnValue(of(playerList[0]));
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CardsComponent,
        NavBarComponent,
        MatchHistoryComponent,
        PlayersComponent,
        CardDetailsComponent,
        CardCollectionComponent,
        MemoryGameComponent
      ],
      imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: PlayerService, useValue: mockPlayerService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should run LoginPlease()', () => {
    component.LoginPlease();
    expect(component.login).toBe(true);
  });

  it('should run setPlayer()', () => {
    const viewModel: LoginPlayerViewModel = {
      username: 'tylercadena',
      password: 'revature'
    };
    component.setPlayer(viewModel);
    expect(component.playerViewModel.playerId).toBe('b9084d13-3a7a-4957-89bf-e7618e83e649');
    expect(mockPlayerViewModel.calls.any()).toBe(true);
  });
});
