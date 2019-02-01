import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { DatasourceProperties } from '@models/datasource-properties';

import { SecondaryService } from './secondary.service';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.view.html',
  styleUrls: ['./secondary.view.scss']
})
export class SecondaryView implements OnInit {

  secondaryDatasourceProperties$: Observable<DatasourceProperties>;

  constructor(private secondaryService: SecondaryService) {}

  ngOnInit() {
    this.getSecondaryDataSourceProperties();
  }

  private getSecondaryDataSourceProperties() {
    this.secondaryDatasourceProperties$ = this.secondaryService.getSecondaryDataSourceEnv();
  }

}
