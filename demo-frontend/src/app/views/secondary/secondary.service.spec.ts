import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, RequestMatch } from '@angular/common/http/testing';

import { ActuatorEnvResponse } from '@models/actuator-env-response';
import { ValidationResponse } from '@models/validation-response';
import { DatatableRequest } from '@models/datatable-request';
import { PaginatedResponse } from '@models/paginated-response';

import { SecondaryService } from './secondary.service';
import { SecondaryEntity } from './secondary-entity';
import { SecondaryForm } from './secondary-form';

describe('SecondaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecondaryService]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  describe('getSecondaryDataSourceEnv', () => {

    const requestMatch: RequestMatch = { method: 'GET', url: '/env' };

    it('should GET the secondary datasource env', inject([SecondaryService, HttpTestingController],
      (service: SecondaryService, httpMock: HttpTestingController) => {
      const mockActuatorEnvResponse: ActuatorEnvResponse = {
        "propertySources": [
          {
            "name": "applicationConfig: [classpath:/application.yml]",
            "properties": {
              "secondary.datasource.url": {
                "value": "jdbc:h2:mem:secondary",
                "origin": "class path resource [application.yml]:44:10"
              },
              "secondary.datasource.username": {
                "value": "sa",
                "origin": "class path resource [application.yml]:45:15"
              },
              "secondary.datasource.password": {
                "value": "******",
                "origin": "class path resource [application.yml]:46:14"
              },
              "secondary.flyway.location": {
                "value": "classpath:db/migration/secondary",
                "origin": "class path resource [application.yml]:48:15"
              },
              "secondary.jpa.properties.hibernate.show_sql": {
                "value": false,
                "origin": "class path resource [application.yml]:53:19"
              },
              "secondary.jpa.properties.hibernate.format_sql": {
                "value": false,
                "origin": "class path resource [application.yml]:54:21"
              },
              "secondary.jpa.properties.hibernate.generate_statistics": {
                "value": false,
                "origin": "class path resource [application.yml]:55:30"
              },
              "secondary.jpa.properties.hibernate.id.new_generator_mappings": {
                "value": true,
                "origin": "class path resource [application.yml]:56:36"
              },
              "secondary.jpa.properties.hibernate.order_updates": {
                "value": true,
                "origin": "class path resource [application.yml]:57:24"
              },
              "secondary.jpa.properties.hibernate.default_batch_fetch_size": {
                "value": 4,
                "origin": "class path resource [application.yml]:58:35"
              },
              "secondary.jpa.properties.hibernate.max_fetch_depth": {
                "value": 2,
                "origin": "class path resource [application.yml]:59:26"
              },
              "secondary.jpa.properties.hibernate.hbm2ddl.auto": {
                "value": "",
                "origin": "class path resource [application.yml]:60:22"
              }
            }
          }
        ]
      };

      service.getSecondaryDataSourceEnv().subscribe(datasourceProperties => {
        expect(datasourceProperties).toEqual({
          jdbcUrl: 'jdbc:h2:mem:secondary',
          username: 'sa',
          flywayPath: 'classpath:db/migration/secondary',
          showSql: false,
          showStats: false
        });
      });

      const testReq = httpMock.expectOne(requestMatch);

      testReq.flush(mockActuatorEnvResponse);
    }));

  });

  describe('saveSecondary', () => {

    const requestMatch: RequestMatch = { method: 'POST', url: '/secondary' };

    it('should POST new secondary', inject([SecondaryService, HttpTestingController],
      (service: SecondaryService, httpMock: HttpTestingController) => {
      const newSecondaryForm: SecondaryForm = {
        name: 'Hello Secondary World'
      };
      const mockValidationResponse: ValidationResponse<SecondaryEntity> = {
        data: {
          id: 1,
          name: newSecondaryForm.name
        }
      };

      service.saveSecondary(newSecondaryForm).subscribe(validationResponse => {
        expect(validationResponse).toEqual(mockValidationResponse);
      });

      const testReq = httpMock.expectOne(requestMatch);
      expect(testReq.request.detectContentTypeHeader()).toBe('application/json');
      expect(testReq.request.body).toEqual(newSecondaryForm);

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
      url: `/secondary?page=${mockRequest.page}&size=${mockRequest.size}&sort=${mockRequest.sorts[0]}`
    };

    it('should GET secondary', inject([SecondaryService, HttpTestingController],
      (service: SecondaryService, httpMock: HttpTestingController) => {
      const mockPaginatedResponse: PaginatedResponse<SecondaryEntity> = {
        content: [
          {
            id: 1,
            name: 'Hello World!'
          }
        ],
        totalElements: 1
      };

      service.getSecondary(mockRequest).subscribe(paginatedResponse => {
        expect(paginatedResponse).toEqual(mockPaginatedResponse);
      });

      const testReq = httpMock.expectOne(requestMatch);

      testReq.flush(mockPaginatedResponse);
    }));

    it('should GET secondary with error', inject([SecondaryService, HttpTestingController],
      (service: SecondaryService, httpMock: HttpTestingController) => {
      service.getSecondary(mockRequest).subscribe(paginatedResponse => {
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
