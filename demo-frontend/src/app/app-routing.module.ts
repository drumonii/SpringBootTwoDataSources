import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'primary', loadChildren: () => import('./views/primary/primary.module').then(m => m.PrimaryModule) },
  { path: 'secondary', loadChildren: () => import('./views/secondary/secondary.module').then(m => m.SecondaryModule) },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
