import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeView } from './home.view';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';

@NgModule({
  declarations: [
    HomeView
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
