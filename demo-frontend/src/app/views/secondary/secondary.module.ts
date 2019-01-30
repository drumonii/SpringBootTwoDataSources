import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondaryView } from './secondary.view';
import { SecondaryRoutingModule } from './secondary-routing.module';

@NgModule({
  declarations: [
    SecondaryView
  ],
  imports: [
    CommonModule,
    SecondaryRoutingModule
  ]
})
export class SecondaryModule { }
