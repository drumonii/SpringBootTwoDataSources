import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DatasourceProperties } from '@models/datasource-properties';
import { DatatableRequest } from '@models/datatable-request';
import { NewEntityForm } from '@models/new-entity-form';

import { PrimaryService } from './primary.service';
import { PrimaryEntity } from './primary-entity';

@Component({
  selector: 'app-primary',
  templateUrl: './primary.view.html',
  styleUrls: ['./primary.view.scss']
})
export class PrimaryView implements OnInit, OnDestroy {

  primaryDatasourceProperties$: Observable<DatasourceProperties>;

  errors: ValidationErrors;

  data$: Observable<PrimaryEntity[]>;
  resultsLength: number;
  isLoadingResults: boolean;

  private subscription = new Subscription();

  constructor(private primaryService: PrimaryService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getPrimaryDataSourceProperties();
  }

  private getPrimaryDataSourceProperties() {
    this.primaryDatasourceProperties$ = this.primaryService.getPrimaryDataSourceEnv();
  }

  getPrimary(datatableRequest: DatatableRequest) {
    this.isLoadingResults = true;
    this.data$ = this.primaryService.getPrimary(datatableRequest)
      .pipe(
        finalize(() => this.isLoadingResults = false),
        map((paginatedResponse) => {
          this.resultsLength = paginatedResponse.totalElements;
          return paginatedResponse.content;
        })
      );
  }

  submitNewPrimary(form: NewEntityForm): void {
    this.subscription.add(this.primaryService.savePrimary(form)
      .subscribe(response => {
        if (response.errors) {
          this.errors = response.errors;
        } else {
          this.snackBar.open(`Successfully saved new Entity: '${response.data.name}'`, '', {
            duration: 3000
          });
          this.getPrimary({ page: 0, size: 10, sorts: ['name,asc'] });
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
