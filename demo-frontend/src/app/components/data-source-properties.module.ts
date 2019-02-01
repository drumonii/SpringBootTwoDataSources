import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataSourcePropertiesComponent } from '@components/data-source-properties.component';

@NgModule({
  declarations: [
    DataSourcePropertiesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DataSourcePropertiesComponent
  ]
})
export class DataSourcePropertiesModule { }
