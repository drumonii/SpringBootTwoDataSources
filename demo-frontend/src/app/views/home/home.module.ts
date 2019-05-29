import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { HomeView } from './home.view';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './home.service';

import { PageHeaderModule } from '@components/page-header.module';

@NgModule({
  declarations: [
    HomeView
  ],
  imports: [
    CommonModule,
    MatListModule,
    HomeRoutingModule,
    PageHeaderModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
