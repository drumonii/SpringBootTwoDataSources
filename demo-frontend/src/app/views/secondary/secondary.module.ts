import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { SecondaryView } from './secondary.view';
import { SecondaryRoutingModule } from './secondary-routing.module';
import { SecondaryService } from './secondary.service';

import { DataSourcePropertiesModule } from '@components/data-source-properties.module';
import { DatatableModule } from '@components/datatable.module';
import { PageHeaderModule } from '@components/page-header.module';

@NgModule({
  declarations: [
    SecondaryView
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    SecondaryRoutingModule,
    DataSourcePropertiesModule,
    DatatableModule,
    PageHeaderModule
  ],
  providers: [
    SecondaryService
  ]
})
export class SecondaryModule { }
