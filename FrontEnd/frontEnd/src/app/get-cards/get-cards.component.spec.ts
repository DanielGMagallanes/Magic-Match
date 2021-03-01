import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetCardsComponent } from './get-cards.component';
import { CardService } from '../card.service';
import { of } from 'rxjs';

describe('GetCardsComponent', () => {
  let component: GetCardsComponent;
  let fixture: ComponentFixture<GetCardsComponent>;
  let mockCardService;
  let mockCardData;

  let cardList = [
    {}, {},
    {}, {}
  ] as any[];

  beforeEach(async () => {
    mockCardService = jasmine.createSpyObj('CardService', ['getCards']);
    mockCardData = mockCardService.getCards.and.returnValue(of(cardList));
    await TestBed.configureTestingModule({
      declarations: [ GetCardsComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: CardService, useValue: mockCardService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() and getCards()', () => {
    component.ngOnInit();
    expect(component.cards.length).toBeGreaterThanOrEqual(0);
    expect(mockCardData.calls.any()).toBe(true);
  });
});
