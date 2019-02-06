import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PrimaryView } from './primary.view';
import { PrimaryRoutingModule } from './primary-routing.module';
import { PrimaryService } from './primary.service';

import { DataSourcePropertiesModule } from '@components/data-source-properties.module';

@NgModule({
  declarations: [
    PrimaryView
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimaryRoutingModule,
    DataSourcePropertiesModule
  ],
  providers: [
    PrimaryService
  ]
})
export class PrimaryModule { }
