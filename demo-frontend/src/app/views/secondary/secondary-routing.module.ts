import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondaryView } from './secondary.view';

const routes: Routes = [
  { path: '', component: SecondaryView }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecondaryRoutingModule { }
