import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { NewEntityComponent } from '@components/new-entity.component';

@NgModule({
  declarations: [
    NewEntityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [
    NewEntityComponent
  ]
})
export class NewEntityModule { }
