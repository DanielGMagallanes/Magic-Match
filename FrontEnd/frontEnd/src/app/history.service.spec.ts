import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HistoryService } from './history.service';
import { tap } from 'rxjs/operators';

describe('HistoryService', () => {
  let service: HistoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HistoryService
      ]
    });
    service = TestBed.inject(HistoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not return undefined', () => {
    const matches = service.getMatchHistory();
    matches.subscribe(m => {
      expect(m).toBeTruthy();
    });
  });
});
