import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';

import { SecondaryView } from './secondary.view';
import { SecondaryRoutingModule } from './secondary-routing.module';
import { SecondaryService } from './secondary.service';

import { DataSourcePropertiesModule } from '@components/data-source-properties.module';
import { DatatableModule } from '@components/datatable.module';
import { NewEntityModule } from '@components/new-entity.module';
import { PageHeaderModule } from '@components/page-header.module';

@NgModule({
  declarations: [
    SecondaryView
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    SecondaryRoutingModule,
    DataSourcePropertiesModule,
    DatatableModule,
    NewEntityModule,
    PageHeaderModule
  ],
  providers: [
    SecondaryService
  ]
})
export class SecondaryModule { }
