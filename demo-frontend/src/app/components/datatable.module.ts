import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

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
