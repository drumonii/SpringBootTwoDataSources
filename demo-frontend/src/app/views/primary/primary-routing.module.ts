import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrimaryView } from './primary.view';

const routes: Routes = [
  { path: '', component: PrimaryView }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimaryRoutingModule { }
