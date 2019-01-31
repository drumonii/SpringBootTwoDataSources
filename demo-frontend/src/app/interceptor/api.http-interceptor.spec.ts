import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, RequestMatch } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { ApiHttpInterceptor } from './api.http-interceptor';

describe('BasePathHttpInterceptor', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ApiHttpInterceptor,
        multi: true
      }]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should prepend the base path', inject([HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
    http.get('/some-url').subscribe(res => {
      expect(res).toBeTruthy();
    });

    const requestMatch: RequestMatch = { method: 'GET', url: '/api/some-url' };

    const testReq = httpMock.expectOne(requestMatch);
    testReq.flush({});
  }));

});
