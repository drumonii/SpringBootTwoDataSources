import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { PrimaryView } from './primary.view';
import { PrimaryRoutingModule } from './primary-routing.module';
import { PrimaryService } from './primary.service';

import { DataSourcePropertiesModule } from '@components/data-source-properties.module';
import { DatatableModule } from '@components/datatable.module';
import { NewEntityModule } from '@components/new-entity.module';
import { PageHeaderModule } from '@components/page-header.module';
import { FlywayDatatableModule } from '@components/flyway-datatable.module';

@NgModule({
  declarations: [
    PrimaryView
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    PrimaryRoutingModule,
    DataSourcePropertiesModule,
    DatatableModule,
    NewEntityModule,
    PageHeaderModule,
    FlywayDatatableModule
  ],
  providers: [
    PrimaryService
  ]
})
export class PrimaryModule { }
