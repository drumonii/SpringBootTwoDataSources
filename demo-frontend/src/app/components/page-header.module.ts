import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderComponent } from '@components/page-header.component';

@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class PageHeaderModule { }
