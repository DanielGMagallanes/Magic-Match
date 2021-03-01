import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardCollectionComponent } from './card-collection.component';
import { PlayerService } from '../player.service';
import { DataService } from '../data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ColletionViewModel } from '../colletion-view-model';
import { PlayerViewModel } from '../player-view-model';
import { CardModel } from '../card-model';
import { of } from 'rxjs';
import { fullplayerview } from '../fullplayerview';

describe('CardCollectionComponent', () => {
  let component: CardCollectionComponent;
  let fixture: ComponentFixture<CardCollectionComponent>;
  let mockPlayerService;
  let mockCollection;
  let mockCards;

  let cardList = [
    {
      id: 0,
      cardId: 898,
      cardName: 'dfsfsdf',
      cardClass: 'sfdsdfsf',
      attackNumber: 0,
      defenseNumber: 0,
      inDeck: false,
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
      qty: 1,
      collectionID: 'b9084d13-3a7a-4957-89bf-e7618e83e649'
    }
  ] as CardModel[];

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

  let collectionList = [
    {
      collectionHolder: 'b9084d13-3a7a-4957-89bf-e7618e83e649',
      collectionId: 'b9084d13-3a7a-4957-89bf-e7618e83e649',
      quantity: 98
    }
  ] as ColletionViewModel[];

  let mockDataService: DataService = {
    playerViewModel: playerList[0],
    sharedData: new fullplayerview()
  };

  beforeEach(async () => {
    mockPlayerService = jasmine.createSpyObj('PlayerService', ['GetCollection', 'GetCards']);
    mockCollection = mockPlayerService.GetCollection.and.returnValue(of(collectionList[0]));
    mockCards = mockPlayerService.GetCards.and.returnValue(of(cardList));
    await TestBed.configureTestingModule({
      declarations: [ CardCollectionComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: PlayerService, useValue: mockPlayerService },
        { provide: DataService, useValue: mockDataService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() and getCollections()', () => {
    component.ngOnInit();
    expect(component.view).toBe(true);
    expect(component.collection.collectionHolder).toBe('b9084d13-3a7a-4957-89bf-e7618e83e649');
    expect(component.collection.collectionId).toBeTruthy();
    expect(mockCollection.calls.any()).toBe(true);
  });

  it('should call GetCards()', () => {
    component.collection.collectionHolder = 'b9084d13-3a7a-4957-89bf-e7618e83e649';
    component.GetCards();
    expect(component.cards[0].cardId).toBe(898);
    expect(mockCards.calls.any()).toBe(true);
  });
});
