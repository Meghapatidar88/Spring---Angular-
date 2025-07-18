import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BookComponent } from './book/book.component';
import { BooklistComponent } from './booklist/booklist.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
 { path: 'book', component: BookComponent },
  { path: '', redirectTo: 'book', pathMatch: 'full' }, // default route BookComponent

  
 {
  path: 'book/:id',
  component: BookComponent
},
 

  {path:'booklist',
    component:BooklistComponent
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
