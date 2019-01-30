import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: './views/home/home.module#HomeModule' },
  { path: 'primary', loadChildren: './views/primary/primary.module#PrimaryModule' },
  { path: 'secondary', loadChildren: './views/secondary/secondary.module#SecondaryModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
