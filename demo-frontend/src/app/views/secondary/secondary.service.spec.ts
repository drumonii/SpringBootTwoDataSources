import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, RequestMatch } from '@angular/common/http/testing';

import { ActuatorEnvResponse } from '@models/actuator-env-response';
import { ValidationResponse } from '@models/validation-response';
import { DatatableRequest } from '@models/datatable-request';
import { PaginatedResponse } from '@models/paginated-response';
import { FlywayResponse } from '@models/flyway-response';

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
        'propertySources': [
          {
            'name': "Config resource 'class path resource [application.yml]' via location 'optional:classpath:/'",
            'properties': {
              'secondary.datasource.url': {
                'value': 'jdbc:h2:mem:secondary',
                'origin': 'class path resource [application.yml] - 58:10'
              },
              'secondary.datasource.username': {
                'value': 'sa',
                'origin': 'class path resource [application.yml] - 59:15'
              },
              'secondary.datasource.password': {
                'value': '******',
                'origin': 'class path resource [application.yml] - 60:14'
              },
              'secondary.flyway.location': {
                'value': 'classpath:db/migration/secondary',
                'origin': 'class path resource [application.yml] - 62:15'
              },
              'secondary.jpa.properties.hibernate.show_sql': {
                'value': false,
                'origin': 'class path resource [application.yml] - 66:19'
              },
              'secondary.jpa.properties.hibernate.format_sql': {
                'value': false,
                'origin': 'class path resource [application.yml] - 67:21'
              },
              'secondary.jpa.properties.hibernate.generate_statistics': {
                'value': false,
                'origin': 'class path resource [application.yml] - 68:30'
              },
              'secondary.jpa.properties.hibernate.id.new_generator_mappings': {
                'value': true,
                'origin': 'class path resource [application.yml] - 69:36'
              },
              'secondary.jpa.properties.hibernate.order_updates': {
                'value': true,
                'origin': 'class path resource [application.yml] - 70:24'
              },
              'secondary.jpa.properties.hibernate.default_batch_fetch_size': {
                'value': 4,
                'origin': 'class path resource [application.yml] - 71:35'
              },
              'secondary.jpa.properties.hibernate.max_fetch_depth': {
                'value': 2,
                'origin': 'class path resource [application.yml] - 72:26'
              },
              'secondary.jpa.properties.hibernate.hbm2ddl.auto': {
                'value': '',
                'origin': 'class path resource [application.yml] - 73:22'
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

  describe('getPrimaryFlyway', () => {

    const requestMatch: RequestMatch = { method: 'GET', url: '/flyway' };

    it('should GET the secondary flyway', inject([SecondaryService, HttpTestingController],
      (service: SecondaryService, httpMock: HttpTestingController) => {
      const mockFlywayResponse: FlywayResponse = {
        contexts: {
          application: {
            flywayBeans: {
              primaryFlyway: {
                migrations: []
              },
              secondaryFlyway: {
                migrations: [
                  {
                    script: 'V1438646131__SECONDARY_MODEL.sql',
                    state: 'SUCCESS',
                    executionTime: 1
                  },
                  {
                    script: 'V1438824709__SECONDARY_MODEL_INSERT.sql',
                    state: 'SUCCESS',
                    executionTime: 3
                  }
                ]
              }
            }
          }
        }
      };

      service.getSecondaryFlyway().subscribe(migrations => {
        expect(migrations).toEqual(mockFlywayResponse.contexts.application.flywayBeans.secondaryFlyway.migrations);
      });

      const testReq = httpMock.expectOne(requestMatch);

      testReq.flush(mockFlywayResponse);
    }));

  });
});
