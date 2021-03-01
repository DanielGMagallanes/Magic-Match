import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { PlayerService } from '../player.service';
import { PlayerViewModel } from '../player-view-model';
import { Observable, of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockPlayerService;
  let mockLoggedPlayer;

  let player: PlayerViewModel = {
    playerId: 'b9084d13-3a7a-4957-89bf-e7618e83e649',
    userName: 'tylercadena',
    password: 'revature',
    login: false,
    wins: 0,
    losses: 0,
    tokens: 0
  };

  beforeEach(async () => {
    mockPlayerService = jasmine.createSpyObj('UserService', ['LoginPlayer']);
    mockLoggedPlayer = mockPlayerService.LoginPlayer.and.returnValue(of(player));
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: PlayerService, useValue: mockPlayerService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call OnSubmit()', () => {
    component.loginPlayerViewModel.username = 'tylercadena';
    component.loginPlayerViewModel.password = 'revature';
    component.OnSubmit();
    expect(component.playerViewModel1.playerId).toBe('b9084d13-3a7a-4957-89bf-e7618e83e649');
    expect(mockLoggedPlayer.calls.any()).toBe(true);
  });
});
