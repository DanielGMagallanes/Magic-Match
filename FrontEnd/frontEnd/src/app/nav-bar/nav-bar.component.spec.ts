import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerViewModel } from '../player-view-model';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call IWannaLogIn()', () => {
    component.login1 = false;
    component.IWannaLogIn();
    expect(component.login1).toBe(true);
  });

  it('should call IWannaLogOut()', () => {
    component.login1 = true;
    component.IWannaLogOut();
    expect(component.login1).toBe(false);
  });

  it('should call addPlayer() and BackUpPlayer()', () => {
    component.playerviewModel = null;
    component.addPlayer({
      playerId: 'b9084d13-3a7a-4957-89bf-e7618e83e649',
      userName: 'tylercadena',
      password: 'revature',
      login: false,
      wins: 0,
      losses: 0,
      tokens: 0
    });
    expect(component.playerviewModel.playerId).toBe('b9084d13-3a7a-4957-89bf-e7618e83e649');
  });
});
