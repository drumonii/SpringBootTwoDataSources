import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SpringBootVersionHolder } from '@models/spring-boot-version-holder';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient) {}

  getSpringBootVersion(): Observable<string> {
    return this.httpClient.get<SpringBootVersionHolder>('/sb-version')
      .pipe(
        map(springBootVersionHolder => springBootVersionHolder.springBootVersion)
      );
  }

}
