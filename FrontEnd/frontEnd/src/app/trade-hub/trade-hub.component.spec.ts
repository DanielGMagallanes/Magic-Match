import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeHubComponent } from './trade-hub.component';

describe('TradeHubComponent', () => {
  let component: TradeHubComponent;
  let fixture: ComponentFixture<TradeHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
