import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { DatasourceProperties } from '@models/datasource-properties';

import { PrimaryService } from './primary.service';

@Component({
  selector: 'app-primary',
  templateUrl: './primary.view.html',
  styleUrls: ['./primary.view.scss']
})
export class PrimaryView implements OnInit {

  primaryDatasourceProperties$: Observable<DatasourceProperties>;

  constructor(private primaryService: PrimaryService) {}

  ngOnInit() {
    this.getPrimaryDataSourceProperties();
  }

  private getPrimaryDataSourceProperties() {
    this.primaryDatasourceProperties$ = this.primaryService.getPrimaryDataSourceEnv();
  }

}
