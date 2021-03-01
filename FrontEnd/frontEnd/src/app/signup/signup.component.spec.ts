import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Location } from '@angular/common';
import { PlayerService } from '../player.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockPlayerService;
  let mockLocation;

  beforeEach(async () => {
    mockPlayerService = jasmine.createSpyObj('PlayerService', ['addUser']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SignupComponent],
      providers: [
        { provide: PlayerService, useValue: mockPlayerService },
        { provide: Location, useValue: mockLocation }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit()', () => {
    component.loginPlayerViewModel.username = 'tylercadena';
    component.loginPlayerViewModel.password = 'revature';
    component.onSubmit();
    expect(component.loginPlayerViewModel).toBeTruthy();
  });
});
