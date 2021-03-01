import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Card } from '../card';
import { CardService } from '../card.service';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let mockCardService;
  let mockCard;

  let cardList = [
    {
      id: 1,
      attackNumber: 2,
      defenseNumber: 3,
      inDeck: true,
      cardClass: "yes",
      cardName: 'Magic card',
      cardId: 8,
      collectionID: 'sdfsdf',
      qty: 5,
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png'
    }
  ] as Card[];

  beforeEach(async () => {
    mockCardService = jasmine.createSpyObj('CardService', ['searchForCard']);
    mockCard = mockCardService.searchForCard.and.returnValue(of(cardList[0]));
    await TestBed.configureTestingModule({
      declarations: [ SearchBoxComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: CardService, useValue: mockCardService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call OnSubmit()', () => {
    component.OnSubmit();
    expect(component.card.cardName).toBe('Magic card');
    expect(component.submitted).toBe(true);
    expect(mockCard.calls.any()).toBe(true);
  });
});
