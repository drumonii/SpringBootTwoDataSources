import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

import { PrimaryView } from './primary.view';
import { PrimaryRoutingModule } from './primary-routing.module';
import { PrimaryService } from './primary.service';

import { DataSourcePropertiesModule } from '@components/data-source-properties.module';
import { DatatableModule } from '@components/datatable.module';
import { PageHeaderModule } from '@components/page-header.module';

@NgModule({
  declarations: [
    PrimaryView
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    PrimaryRoutingModule,
    DataSourcePropertiesModule,
    DatatableModule,
    PageHeaderModule
  ],
  providers: [
    PrimaryService
  ]
})
export class PrimaryModule { }
