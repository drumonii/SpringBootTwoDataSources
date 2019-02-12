import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { DatasourceProperties } from '@models/datasource-properties';
import { DatatableRequest } from '@models/datatable-request';

import { SecondaryService } from './secondary.service';
import { SecondaryEntity } from './secondary-entity';

@Component({
  selector: 'app-secondary',
  templateUrl: './secondary.view.html',
  styleUrls: ['./secondary.view.scss']
})
export class SecondaryView implements OnInit {

  secondaryDatasourceProperties$: Observable<DatasourceProperties>;

  newSecondaryForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  data$: Observable<SecondaryEntity[]>;
  resultsLength: number;
  isLoadingResults: boolean;

  constructor(private secondaryService: SecondaryService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getSecondaryDataSourceProperties();
  }

  private getSecondaryDataSourceProperties() {
    this.secondaryDatasourceProperties$ = this.secondaryService.getSecondaryDataSourceEnv();
  }

  getSecondary(datatableRequest: DatatableRequest) {
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

  submitNewSecondary(): void {
    if (this.newSecondaryForm.valid) {
      this.secondaryService.saveSecondary({ name: this.newSecondaryForm.get('name').value })
        .subscribe(response => {
          if (response.errors) {
            this.newSecondaryForm.setErrors(response.errors);
          } else {
            this.snackBar.open(`Successfully saved new Entity: '${response.data.name}'`, '', {
              duration: 3000
            });
            this.newSecondaryForm.reset();
            this.getSecondary({ page: 0, size: 10, sorts: ['name,asc'] });
          }
        });
    }
  }

}
