import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DatasourceProperties } from '@models/datasource-properties';
import { DatatableRequest } from '@models/datatable-request';

import { PrimaryService } from './primary.service';
import { PrimaryEntity } from './primary-entity';

@Component({
  selector: 'app-primary',
  templateUrl: './primary.view.html',
  styleUrls: ['./primary.view.scss']
})
export class PrimaryView implements OnInit {

  primaryDatasourceProperties$: Observable<DatasourceProperties>;

  newPrimaryForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  data$: Observable<PrimaryEntity[]>;
  resultsLength: number;
  isLoadingResults: boolean;

  constructor(private primaryService: PrimaryService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {}

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

  submitNewPrimary(): void {
    if (this.newPrimaryForm.valid) {
      this.primaryService.savePrimary({ name: this.newPrimaryForm.get('name').value })
        .subscribe(response => {
          if (response.errors) {
            this.newPrimaryForm.setErrors(response.errors);
          } else {
            this.snackBar.open(`Successfully saved new Entity: '${response.data.name}'`, '', {
              duration: 3000
            });
            this.newPrimaryForm.reset();
            this.getPrimary({ page: 0, size: 10, sorts: ['name,asc'] });
          }
        });
    }
  }

}
