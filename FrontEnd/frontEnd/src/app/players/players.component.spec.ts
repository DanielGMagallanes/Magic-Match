import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PlayersComponent } from './players.component';
import { PlayerService } from '../player.service';
import { PlayerViewModel } from '../player-view-model';
import { Observable, of } from 'rxjs';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let mockPlayerService;
  let mockPlayerList;

  let players = [
    {
      playerId: 'b9084d13-3a7a-4957-89bf-e7618e83e649',
      userName: 'tylercadena',
      password: 'revature',
      login: false,
      wins: 0,
      losses: 0,
      tokens: 0
    },
    {
      playerId: '51fdd656-245b-4e55-b4fd-a3a1c35a9def',
      userName: 'billybob',
      password: 'revature',
      login: false,
      wins: 0,
      losses: 0,
      tokens: 0
    }
  ] as PlayerViewModel[];

  beforeEach(async () => {
    mockPlayerService = jasmine.createSpyObj('PlayerService', ['PlayerList']);
    mockPlayerList = mockPlayerService.PlayerList.and.returnValue(of(players));
    await TestBed.configureTestingModule({
      declarations: [PlayersComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: PlayerService, useValue: mockPlayerService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() to retrieve player list', () => {
    component.ngOnInit();
    expect(component.playerList[0].userName).toBe('tylercadena');
    expect(mockPlayerList.calls.any()).toBe(true);
  });
});
