import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlywayDatatableComponent } from '@components/flyway-datatable.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FlywayDatatableComponent
  ],
  declarations: [
    FlywayDatatableComponent
  ]
})
export class FlywayDatatableModule { }
