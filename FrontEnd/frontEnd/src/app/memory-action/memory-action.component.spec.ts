import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryActionComponent } from './memory-action.component';

describe('MemoryActionComponent', () => {
  let component: MemoryActionComponent;
  let fixture: ComponentFixture<MemoryActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoryActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    let prev = component.cards.length;
    component.ngOnInit();
    expect(component.cards.length).toBeGreaterThan(prev);
  });

  it('should call clickedCard()', () => {
    let flips = 4;
    while (flips >= 0) {
      component.numberFlip = flips;
      component.clickedCard(
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), flips
      );
      flips--;
    }
    expect(component.cards.length).toBeGreaterThan(0);
  });

  it('should call checkCard()', () => {
    component.CardOne = {
      cardId: 'sdfd',
      cardIndex: 0,
      imgUl: "./../assets/images/Image-2.jpg",
      matched: false,
      state: 'blah'
    };
    component.CardTwo = (x => x)(component.CardOne);
    component.checkCard();
    expect(component).toBeTruthy();
  });

  it('should call checkIfAlreadyMatched()', () => {
    expect(component.checkIfAlreadyMatched(
      { cardId: '' }
    )).toBe(false);
  });

  it('should shuffle array', () => {
    //http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    let str0: string[] = [];
    let str1: string[] = [];
    let amount = (Math.random() * 40) + 1;
    for (let i = 0; i < amount; ++i) {
      const s = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      str0.push(s);
      str1.push(s);
    }
    let comparisonAttempts = 10;
    while (comparisonAttempts > 0) {
      str0 = component.randomArrayShuffle(str0);
      if (str0 !== str1) {
        break;
      }
      --comparisonAttempts;
    }
    if (comparisonAttempts <= 0) {
      expect(true).toBe(
        false,
        'The chances of this failing are ridiculous. Run one more time before coming to any conclusions'
      );
    } else {
      expect(str0).not.toEqual(str1);
    }
  });
});
