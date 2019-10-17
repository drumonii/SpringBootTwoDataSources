import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, RequestMatch } from '@angular/common/http/testing';

import { ActuatorEnvResponse } from '@models/actuator-env-response';
import { ValidationResponse } from '@models/validation-response';
import { DatatableRequest } from '@models/datatable-request';
import { PaginatedResponse } from '@models/paginated-response';

import { PrimaryService } from './primary.service';
import { PrimaryForm } from './primary-form';
import { PrimaryEntity } from './primary-entity';

describe('PrimaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrimaryService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('getPrimaryDataSourceEnv', () => {

    const requestMatch: RequestMatch = { method: 'GET', url: '/env' };

    it('should GET the primary datasource env', inject([PrimaryService, HttpTestingController],
      (service: PrimaryService, httpMock: HttpTestingController) => {
      const mockActuatorEnvResponse: ActuatorEnvResponse = {
        "propertySources": [
          {
            "name": "applicationConfig: [classpath:/application.yml]",
            "properties": {
              "primary.datasource.url": {
                "value": "jdbc:h2:mem:primary",
                "origin": "class path resource [application.yml]:23:10"
              },
              "primary.datasource.username": {
                "value": "sa",
                "origin": "class path resource [application.yml]:24:15"
              },
              "primary.datasource.password": {
                "value": "******",
                "origin": "class path resource [application.yml]:25:14"
              },
              "primary.flyway.location": {
                "value": "classpath:db/migration/primary",
                "origin": "class path resource [application.yml]:27:15"
              },
              "primary.jpa.properties.hibernate.show_sql": {
                "value": true,
                "origin": "class path resource [application.yml]:32:19"
              },
              "primary.jpa.properties.hibernate.format_sql": {
                "value": true,
                "origin": "class path resource [application.yml]:33:21"
              },
              "primary.jpa.properties.hibernate.generate_statistics": {
                "value": true,
                "origin": "class path resource [application.yml]:34:30"
              },
              "primary.jpa.properties.hibernate.id.new_generator_mappings": {
                "value": true,
                "origin": "class path resource [application.yml]:35:36"
              },
              "primary.jpa.properties.hibernate.order_updates": {
                "value": true,
                "origin": "class path resource [application.yml]:36:24"
              },
              "primary.jpa.properties.hibernate.default_batch_fetch_size": {
                "value": 4,
                "origin": "class path resource [application.yml]:37:35"
              },
              "primary.jpa.properties.hibernate.max_fetch_depth": {
                "value": 2,
                "origin": "class path resource [application.yml]:38:26"
              },
              "primary.jpa.properties.hibernate.hbm2ddl.auto": {
                "value": "",
                "origin": "class path resource [application.yml]:39:22"
              }
            }
          }
        ]
      };

      service.getPrimaryDataSourceEnv().subscribe(datasourceProperties => {
        expect(datasourceProperties).toEqual({
          jdbcUrl: 'jdbc:h2:mem:primary',
          username: 'sa',
          flywayPath: 'classpath:db/migration/primary',
          showSql: true,
          showStats: true
        });
      });

      const testReq = httpMock.expectOne(requestMatch);

      testReq.flush(mockActuatorEnvResponse);
    }));

  });

  describe('savePrimary', () => {

    const requestMatch: RequestMatch = { method: 'POST', url: '/primary' };

    it('should POST new primary', inject([PrimaryService, HttpTestingController],
      (service: PrimaryService, httpMock: HttpTestingController) => {
      const newPrimaryForm: PrimaryForm = {
        name: 'Hello Primary World'
      };
      const mockValidationResponse: ValidationResponse<PrimaryEntity> = {
        data: {
          id: 1,
          name: newPrimaryForm.name
        }
      };

      service.savePrimary(newPrimaryForm).subscribe(validationResponse => {
        expect(validationResponse).toEqual(mockValidationResponse);
      });

      const testReq = httpMock.expectOne(requestMatch);
      expect(testReq.request.detectContentTypeHeader()).toBe('application/json');
      expect(testReq.request.body).toEqual(newPrimaryForm);

      testReq.flush(mockValidationResponse);
    }));

  });

  describe('getSecondary', () => {

    const mockRequest: DatatableRequest = {
      page: 0,
      size: 10,
      sorts: ['name,asc']
    };

    const requestMatch: RequestMatch = {
      method: 'GET',
      url: `/primary?page=${mockRequest.page}&size=${mockRequest.size}&sort=${mockRequest.sorts[0]}`
    };

    it('should GET secondary', inject([PrimaryService, HttpTestingController],
      (service: PrimaryService, httpMock: HttpTestingController) => {
      const mockPaginatedResponse: PaginatedResponse<PrimaryEntity> = {
        content: [
          {
            id: 1,
            name: 'Hello World!'
          }
        ],
        totalElements: 1
      };

      service.getPrimary(mockRequest).subscribe(paginatedResponse => {
        expect(paginatedResponse).toEqual(mockPaginatedResponse);
      });

      const testReq = httpMock.expectOne(requestMatch);

      testReq.flush(mockPaginatedResponse);
    }));

    it('should GET secondary with error', inject([PrimaryService, HttpTestingController],
      (service: PrimaryService, httpMock: HttpTestingController) => {
      service.getPrimary(mockRequest).subscribe(paginatedResponse => {
        expect(paginatedResponse).toEqual({
          content: [],
          totalElements: 0
        });
      });

      const testReq = httpMock.expectOne(requestMatch);

      testReq.error(new ErrorEvent('500'));
    }));
  });
});
