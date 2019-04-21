import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';

import { MatTableModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: BookListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    MatTableModule
  ]
})
export class BookRoutingModule { }
