import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatProgressBarModule, MatSortModule, MatTableModule } from '@angular/material';

import { DatatableComponent } from '@components/datatable.component';

@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatTableModule
  ],
  exports: [
    DatatableComponent
  ]
})
export class DatatableModule { }
