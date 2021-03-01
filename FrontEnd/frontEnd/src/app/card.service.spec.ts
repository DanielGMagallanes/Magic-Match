import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CardService } from './card.service';
import { CardModel } from './card-model';

describe('CardService', () => {
  let service: CardService;
  let httpTestingController: HttpTestingController;

  let dummyCardList = [
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
    },
    {
      id: 3,
      cardId: 1212,
      cardName: 'fawejroiewre',
      cardClass: 'ffdfdfdf',
      attackNumber: 7,
      defenseNumber: 1,
      inDeck: true,
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
      qty: 20,
      collectionID: '51fdd656-245b-4e55-b4fd-a3a1c35a9def'
    }
  ] as CardModel[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCards()', () => {
    service.getCards().subscribe(data => {
      expect(data).toBeTruthy(),
      fail
    });
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('should call searchForCard()', () => {
    service.searchForCard('fawejroiewre').subscribe(card =>
      expect(card).toBeTruthy(),
      fail
    );
    const req = httpTestingController.expectOne('https://magic-match-api.azurewebsites.net/api/MagicAPI/cardByName/fawejroiewre');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyCardList[0]);
  });
});
