import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DatasourceProperties } from '@models/datasource-properties';
import { ActuatorEnvResponse } from '@models/actuator-env-response';

@Injectable()
export class PrimaryService {

  constructor(private httpClient: HttpClient) {}

  getPrimaryDataSourceEnv(): Observable<DatasourceProperties> {
    return this.httpClient.get<ActuatorEnvResponse>('/env')
      .pipe(
        map(actuatorEnvResponse => this.extractProperties(actuatorEnvResponse))
      );
  }

  private extractProperties(actuatorEnvResponse: ActuatorEnvResponse): DatasourceProperties {
    const appConfigPropertySource = actuatorEnvResponse.propertySources
      .find(propertySource => propertySource.name === 'applicationConfig: [classpath:/application.yml]');
    const appConfigProperties = appConfigPropertySource.properties;
    return {
      jdbcUrl: appConfigProperties['primary.datasource.url'].value,
      username: appConfigProperties['primary.datasource.username'].value,
      dialect: appConfigProperties['primary.jpa.properties.hibernate.dialect'].value,
      flywayPath: appConfigProperties['primary.flyway.location'].value,
      showSql: appConfigProperties['primary.jpa.properties.hibernate.show_sql'].value,
      showStats: appConfigProperties['primary.jpa.properties.hibernate.generate_statistics'].value,
    };
  }

}
