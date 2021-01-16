import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DatasourceProperties } from '@models/datasource-properties';
import { ActuatorEnvResponse } from '@models/actuator-env-response';
import { ValidationResponse } from '@models/validation-response';
import { DatatableRequest } from '@models/datatable-request';
import { PaginatedResponse } from '@models/paginated-response';
import { FlywayMigration, FlywayResponse } from '@models/flyway-response';

import { SecondaryForm } from './secondary-form';
import { SecondaryEntity } from './secondary-entity';

@Injectable()
export class SecondaryService {

  constructor(private httpClient: HttpClient) {}

  getSecondaryDataSourceEnv(): Observable<DatasourceProperties> {
    return this.httpClient.get<ActuatorEnvResponse>('/env')
      .pipe(
        map(actuatorEnvResponse => this.extractProperties(actuatorEnvResponse))
      );
  }

  saveSecondary(form: SecondaryForm): Observable<ValidationResponse<SecondaryEntity>> {
    return this.httpClient.post<ValidationResponse<SecondaryEntity>>('/secondary', form);
  }

  getSecondary(request: DatatableRequest): Observable<PaginatedResponse<SecondaryEntity>> {
    let params = new HttpParams()
      .append('page', request.page.toString(10))
      .append('size', request.size.toString(10));
    for (const sort of request.sorts) {
      params = params.append('sort', sort);
    }
    const options = {
      params
    };
    return this.httpClient.get<PaginatedResponse<SecondaryEntity>>('/secondary', options)
      .pipe(
        catchError(() => of({
          content: [],
          totalElements: 0
        }))
      );
  }

  getSecondaryFlyway(): Observable<FlywayMigration[]> {
    return this.httpClient.get<FlywayResponse>('/flyway')
      .pipe(
        map(response => response.contexts.application.flywayBeans.secondaryFlyway.migrations)
      );
  }

  private extractProperties(actuatorEnvResponse: ActuatorEnvResponse): DatasourceProperties {
    const appConfigPropertySource = actuatorEnvResponse.propertySources
      .find(propertySource => propertySource.name === `Config resource 'class path resource [application.yml]' via location 'optional:classpath:/'`);
    const appConfigProperties = appConfigPropertySource.properties;
    return {
      jdbcUrl: appConfigProperties['secondary.datasource.url'].value,
      username: appConfigProperties['secondary.datasource.username'].value,
      flywayPath: appConfigProperties['secondary.flyway.location'].value,
      showSql: appConfigProperties['secondary.jpa.properties.hibernate.show_sql'].value,
      showStats: appConfigProperties['secondary.jpa.properties.hibernate.generate_statistics'].value,
    };
  }

}
