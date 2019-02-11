import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SecondaryView } from './secondary.view';
import { SecondaryRoutingModule } from './secondary-routing.module';
import { SecondaryService } from './secondary.service';

import { DataSourcePropertiesModule } from '@components/data-source-properties.module';
import { DatatableModule } from '@components/datatable.module';

@NgModule({
  declarations: [
    SecondaryView
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SecondaryRoutingModule,
    DataSourcePropertiesModule,
    DatatableModule
  ],
  providers: [
    SecondaryService
  ]
})
export class SecondaryModule { }
