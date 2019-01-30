import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimaryView } from './primary.view';
import { PrimaryRoutingModule } from './primary-routing.module';

@NgModule({
  declarations: [
    PrimaryView
  ],
  imports: [
    CommonModule,
    PrimaryRoutingModule
  ]
})
export class PrimaryModule { }
