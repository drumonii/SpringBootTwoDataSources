import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  newSecondaryForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(private secondaryService: SecondaryService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getSecondaryDataSourceProperties();
  }

  private getSecondaryDataSourceProperties() {
    this.secondaryDatasourceProperties$ = this.secondaryService.getSecondaryDataSourceEnv();
  }

  submitNewSecondary(): void {
    if (this.newSecondaryForm.valid) {
      this.secondaryService.saveSecondary({ name: this.newSecondaryForm.get('name').value })
        .subscribe(response => {
          if (response.errors) {
            this.newSecondaryForm.setErrors(response.errors);
          } else {
            // TODO: Toast of new secondary added successfully
          }
        });
    }
  }

}
