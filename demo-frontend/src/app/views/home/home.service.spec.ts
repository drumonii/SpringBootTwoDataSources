import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, RequestMatch } from '@angular/common/http/testing';

import { HomeService } from './home.service';

describe('HomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('getSpringBootVersion', () => {

    const requestMatch: RequestMatch = { method: 'GET', url: '/sb-version' };

    it('should GET the spring boot version', inject([HomeService, HttpTestingController],
      (service: HomeService, httpMock: HttpTestingController) => {
      const mockSpringBootVersionResponse = { "springBootVersion": "2.1.2.RELEASE" };

      service.getSpringBootVersion().subscribe(springBootVersion => {
        expect(springBootVersion).toEqual('2.1.2.RELEASE');
      });

      const testReq = httpMock.expectOne(requestMatch);

      testReq.flush(mockSpringBootVersionResponse);
    }));

  });
});
