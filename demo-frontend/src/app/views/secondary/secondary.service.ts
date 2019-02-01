import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DatasourceProperties } from '@models/datasource-properties';
import { ActuatorEnvResponse } from '@models/actuator-env-response';

@Injectable()
export class SecondaryService {

  constructor(private httpClient: HttpClient) {}

  getSecondaryDataSourceEnv(): Observable<DatasourceProperties> {
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
      jdbcUrl: appConfigProperties['secondary.datasource.url'].value,
      username: appConfigProperties['secondary.datasource.username'].value,
      dialect: appConfigProperties['secondary.jpa.properties.hibernate.dialect'].value,
      flywayPath: appConfigProperties['secondary.flyway.location'].value,
      showSql: appConfigProperties['secondary.jpa.properties.hibernate.show_sql'].value,
      showStats: appConfigProperties['secondary.jpa.properties.hibernate.generate_statistics'].value,
    };
  }

}
