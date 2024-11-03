import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import {RentalAssignmentComponent} from "./components/rental-assignment/rental-assignment.component";

const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'cars', component: CarComponent },
  { path: 'assignment', component: RentalAssignmentComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' }, // Redirect to customers by default
  { path: '**', redirectTo: '/customers' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
