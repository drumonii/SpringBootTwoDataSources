import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subscription } from 'rxjs';

import { DatasourceProperties } from '@models/datasource-properties';
import { DatatableRequest } from '@models/datatable-request';
import { NewEntityForm } from '@models/new-entity-form';
import { FlywayMigration } from '@models/flyway-response';
import { PaginatedResponse } from '@models/paginated-response';

import { PrimaryService } from './primary.service';
import { PrimaryEntity } from './primary-entity';

@Component({
  selector: 'app-primary',
  templateUrl: './primary.view.html',
  styleUrls: ['./primary.view.scss']
})
export class PrimaryView implements OnInit, OnDestroy {

  primaryDatasourceProperties$: Observable<DatasourceProperties>;
  primaryFlyway$: Observable<FlywayMigration[]>;

  errors: ValidationErrors;

  data$: Observable<PaginatedResponse<PrimaryEntity>>;

  private subscription = new Subscription();

  constructor(private primaryService: PrimaryService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getPrimaryDataSourceProperties();
    this.getPrimaryFlyway();
  }

  private getPrimaryDataSourceProperties(): void {
    this.primaryDatasourceProperties$ = this.primaryService.getPrimaryDataSourceEnv();
  }

  private getPrimaryFlyway(): void {
    this.primaryFlyway$ = this.primaryService.getPrimaryFlyway();
  }

  getPrimary(datatableRequest: DatatableRequest): void {
    this.data$ = this.primaryService.getPrimary(datatableRequest);
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
