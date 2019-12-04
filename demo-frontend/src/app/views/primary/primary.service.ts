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

import { PrimaryForm } from './primary-form';
import { PrimaryEntity } from './primary-entity';

@Injectable()
export class PrimaryService {

  constructor(private httpClient: HttpClient) {}

  getPrimaryDataSourceEnv(): Observable<DatasourceProperties> {
    return this.httpClient.get<ActuatorEnvResponse>('/env')
      .pipe(
        map(actuatorEnvResponse => this.extractProperties(actuatorEnvResponse))
      );
  }

  savePrimary(form: PrimaryForm): Observable<ValidationResponse<PrimaryEntity>> {
    return this.httpClient.post<ValidationResponse<PrimaryEntity>>('/primary', form);
  }

  getPrimary(request: DatatableRequest): Observable<PaginatedResponse<PrimaryEntity>> {
    let params = new HttpParams()
      .append('page', request.page.toString(10))
      .append('size', request.size.toString(10));
    for (const sort of request.sorts) {
      params = params.append('sort', sort);
    }
    const options = {
      params
    };
    return this.httpClient.get<PaginatedResponse<PrimaryEntity>>('/primary', options)
      .pipe(
        catchError(() => of({
          content: [],
          totalElements: 0
        }))
      );
  }

  getPrimaryFlyway(): Observable<FlywayMigration[]> {
    return this.httpClient.get<FlywayResponse>('/flyway')
      .pipe(
        map(response => response.contexts.application.flywayBeans.primaryFlyway.migrations)
      );
  }

  private extractProperties(actuatorEnvResponse: ActuatorEnvResponse): DatasourceProperties {
    const appConfigPropertySource = actuatorEnvResponse.propertySources
      .find(propertySource => propertySource.name === 'applicationConfig: [classpath:/application.yml]');
    const appConfigProperties = appConfigPropertySource.properties;
    return {
      jdbcUrl: appConfigProperties['primary.datasource.url'].value,
      username: appConfigProperties['primary.datasource.username'].value,
      flywayPath: appConfigProperties['primary.flyway.location'].value,
      showSql: appConfigProperties['primary.jpa.properties.hibernate.show_sql'].value,
      showStats: appConfigProperties['primary.jpa.properties.hibernate.generate_statistics'].value,
    };
  }

}
