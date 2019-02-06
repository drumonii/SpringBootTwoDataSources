import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  newPrimaryForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(private primaryService: PrimaryService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getPrimaryDataSourceProperties();
  }

  private getPrimaryDataSourceProperties() {
    this.primaryDatasourceProperties$ = this.primaryService.getPrimaryDataSourceEnv();
  }

  submitNewPrimary(): void {
    if (this.newPrimaryForm.valid) {
      this.primaryService.savePrimary({ name: this.newPrimaryForm.get('name').value })
        .subscribe(response => {
          if (response.errors) {
            this.newPrimaryForm.setErrors(response.errors);
          } else {
            // TODO: Toast of new secondary added successfully
          }
        });
    }
  }

}
