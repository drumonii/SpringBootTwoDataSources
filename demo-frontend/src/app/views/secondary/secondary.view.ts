import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DatasourceProperties } from '@models/datasource-properties';
import { DatatableRequest } from '@models/datatable-request';
import { NewEntityForm } from '@models/new-entity-form';
import { FlywayMigration } from '@models/flyway-response';

import { SecondaryService } from './secondary.service';
import { SecondaryEntity } from './secondary-entity';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.view.html',
  styleUrls: ['./secondary.view.scss']
})
export class SecondaryView implements OnInit, OnDestroy {

  secondaryDatasourceProperties$: Observable<DatasourceProperties>;
  secondaryFlyway$: Observable<FlywayMigration[]>;

  errors: ValidationErrors;

  data$: Observable<SecondaryEntity[]>;
  resultsLength: number;
  isLoadingResults: boolean;

  private subscription = new Subscription();

  constructor(private secondaryService: SecondaryService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getSecondaryDataSourceProperties();
  }

  private getSecondaryDataSourceProperties(): void {
    this.secondaryDatasourceProperties$ = this.secondaryService.getSecondaryDataSourceEnv();
    this.secondaryFlyway$ = this.secondaryService.getSecondaryFlyway();
  }

  getSecondary(datatableRequest: DatatableRequest): void {
    this.isLoadingResults = true;
    this.data$ = this.secondaryService.getSecondary(datatableRequest)
      .pipe(
        finalize(() => this.isLoadingResults = false),
        map((paginatedResponse) => {
          this.resultsLength = paginatedResponse.totalElements;
          return paginatedResponse.content;
        })
      );
  }

  submitNewSecondary(form: NewEntityForm): void {
    this.subscription.add(this.secondaryService.saveSecondary(form)
      .subscribe(response => {
        if (response.errors) {
          this.errors = response.errors;
        } else {
          this.snackBar.open(`Successfully saved new Entity: '${response.data.name}'`, '', {
            duration: 3000
          });
          this.getSecondary({ page: 0, size: 10, sorts: ['name,asc'] });
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
