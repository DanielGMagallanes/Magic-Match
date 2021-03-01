import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { PlayerService } from './player.service';
import { PlayerViewModel } from './player-view-model';
import { LoginPlayerViewModel } from './login-player-view-model';
import { CardModel } from './card-model';
import { ColletionViewModel } from './colletion-view-model';

describe('PlayerService', () => {
  let service: PlayerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlayerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    let dummyPlayers: PlayerViewModel[];

    beforeEach(() => {
      dummyPlayers = [
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
    });

    it('should call PlayerLogin()', () => {
      service.LoginPlayer({ username: 'billybob', password: 'revature' }).subscribe(player =>
        expect(player.playerId).not.toEqual('51fdd656-245b-4e55-b4fd-a3a1c35a9def'),
        fail
      );
      const req = httpTestingController.expectOne('https://magic-match-api.azurewebsites.net/api/player/login');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyPlayers);
    });

    it('should call getPlayer()', () => {
      expect(service.getPlayer()).toBeTruthy();
    });

    it('should call PlayerList()', () => {
      service.PlayerList().subscribe(list =>
        expect(list.length).toBeGreaterThan(0),
        fail
      );
      const req = httpTestingController.expectOne('https://magic-match-api.azurewebsites.net/api/player/getplayers');
      expect(req.request.method).toEqual('GET');
      req.flush(dummyPlayers);
    });
  });

  describe('#cards & collections', () => {
    let dummyCards: CardModel[];
    let dummyCollections: ColletionViewModel[];
    beforeEach(() => {
      dummyCards = [
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
          id: 332,
          cardId: 1,
          cardName: 'jjjjjjjjjjj',
          cardClass: '4wrwe',
          attackNumber: 99,
          defenseNumber: 7,
          inDeck: true,
          imageURL: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
          qty: 1232,
          collectionID: '51fdd656-245b-4e55-b4fd-a3a1c35a9def'
        }
      ] as CardModel[];
      dummyCollections = [
        {
          collectionHolder: '51fdd656-245b-4e55-b4fd-a3a1c35a9def',
          collectionId: 'f9be7b37-aba8-4b3d-8e8e-2f3ae26894b1',
          quantity: 7
        },
        {
          collectionHolder: 'f9be7b37-aba8-4b3d-8e8e-2f3ae26894b1',
          collectionId: '51fdd656-245b-4e55-b4fd-a3a1c35a9def',
          quantity: 5
        }
      ] as ColletionViewModel[];
    });

    it('should call GetCollection()', () => {
      service.GetCollection(dummyCollections[0]).subscribe(collection =>
        expect(collection).toBeTruthy(),
        fail
      );
      const req = httpTestingController.expectOne('https://magic-match-api.azurewebsites.net/api/collection/collections');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyCollections);
    });

    it('should call GetCards()', () => {
      service.GetCards(dummyCollections[0]).subscribe(cards =>
        expect(cards.length).toBeGreaterThan(0),
        fail
      );
      const req = httpTestingController.expectOne('https://magic-match-api.azurewebsites.net/api/collection/GetCardsInCollection');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyCards);
    });
  });

  describe('#getUsers', () => {
    let dummyPlayers: PlayerViewModel[];
    beforeEach(() => {
      dummyPlayers = [
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
        },
        {
          playerId: 'f9be7b37-aba8-4b3d-8e8e-2f3ae26894b1',
          userName: 'janedoe',
          password: 'revature',
          login: false,
          wins: 0,
          losses: 0,
          tokens: 0
        }
      ] as PlayerViewModel[];
    });

    it('should return an Observable<PlayerViewModel[]>', () => {
      service.getUsers().subscribe(players =>
        expect(players).toEqual(dummyPlayers),
        fail
      );
      const req = httpTestingController.expectOne('https://magic-match-api.azurewebsites.net/api/player/GetPlayers');
      expect(req.request.method).toEqual('GET');
      req.flush(dummyPlayers);
    });

    it('should convert 404 to empty Player', () => {
      service.getUsers().subscribe(players =>
        expect(players.length).toEqual(0, 'should convert 404 error into empty Player'),
        fail
      );
      const req = httpTestingController.expectOne('https://magic-match-api.azurewebsites.net/api/player/GetPlayers');
      const msg = '404 Error';
      req.flush(msg, { status: 404, statusText: 'Not found' });
    });
  });

  describe('#getUserById', () => {
    let dummyPlayers: PlayerViewModel[];
    beforeEach(() => {
      dummyPlayers = [
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
          playerId: 'f9be7b37-aba8-4b3d-8e8e-2f3ae26894b1',
          userName: 'janedoe',
          password: 'revature',
          login: false,
          wins: 0,
          losses: 0,
          tokens: 0
        }
      ] as PlayerViewModel[];
    });

    it('should return Observable<any>', () => {
      service.getUserById('f9be7b37-aba8-4b3d-8e8e-2f3ae26894b1').subscribe(player =>
        expect(player).toBeTruthy(),
        fail
      );
      const req = httpTestingController.expectOne('https://magic-match-api.azurewebsites.net/api/f9be7b37-aba8-4b3d-8e8e-2f3ae26894b1');
      expect(req.request.method).toEqual('GET');
      req.flush(dummyPlayers[0]);
    });
  });

  describe('#addUser', () => {
    let dummyPlayer: LoginPlayerViewModel;

    beforeEach(() => {
      dummyPlayer = {
        username: 'billy',
        password: 'revature'
      } as LoginPlayerViewModel;
    });

    it('should return void', () => {
      service.addUser(dummyPlayer);
      const req = httpTestingController.expectOne('https://magic-match-api.azurewebsites.net/api/player/CreatePlayer');
      expect(req.request.method).toEqual('POST');
      req.flush(dummyPlayer);
    });
  });

  describe('#updateUser', () => {
    let dummyPlayer: PlayerViewModel;

    beforeEach(() => {
      dummyPlayer = {
        playerId: 'b9084d13-3a7a-4957-89bf-e7618e83e649',
        userName: 'billy',
        password: 'revature',
        login: false,
        wins: 0,
        losses: 0,
        tokens: 0
      } as PlayerViewModel;
    });

    it('should return Observable<any>', () => {
      service.updateUser({
        playerId: dummyPlayer.playerId,
        userName: dummyPlayer.userName,
        password: 0,
        losses: dummyPlayer.losses,
        wins: dummyPlayer.wins,
        tokens: dummyPlayer.tokens,
        login: false,
        collection: {}
      }).subscribe(player =>
        expect(player).toBeTruthy(),
        fail
      );
      const url = 'https://magic-match-api.azurewebsites.net/api/player/EditPlayer';
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      req.flush(dummyPlayer);
    });
  });

  describe('#deleteUser', () => {
    let dummyPlayer: PlayerViewModel;
    const testName: string = 'billy';

    beforeEach(() => {
      dummyPlayer = {
        playerId: 'b9084d13-3a7a-4957-89bf-e7618e83e649',
        userName: 'billy',
        password: 'revature',
        login: false,
        wins: 0,
        losses: 0,
        tokens: 0
      } as PlayerViewModel;
    });

    it('should return an Observable<any>', () => {
      service.deleteUser(dummyPlayer).subscribe(player =>
        expect(player.userName).toEqual(testName),
        fail
      );
      const url = 'https://magic-match-api.azurewebsites.net/api/DeletePlayer';
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(dummyPlayer);
    });
  });
});
