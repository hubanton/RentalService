import {Component, OnInit} from '@angular/core';
import {Customer, CustomerCreation} from '../../models/customer.model';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;
  newCustomer: CustomerCreation;
  customerPlaceholder = {
    firstName: '',
    lastName: '',
    contact: '',
    rentedCars: []
  };
  isEditing = false;

  constructor(private customerService: CustomerService) {
    this.newCustomer = {...this.customerPlaceholder}
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.findAll().subscribe((data) => {
      this.customers = data;
    });
  }

  createCustomer(customer: CustomerCreation): void {
    this.customerService.create(customer).subscribe(() => {
      this.loadCustomers();
      this.newCustomer = {...this.customerPlaceholder}
    });
  }

  editCustomer(customer: Customer): void {
    this.selectedCustomer = {...customer};
    this.isEditing = true;
  }

  updateCustomer(customer: Partial<Customer> | null): void {
    if (this.selectedCustomer && customer) {
      this.customerService.update(this.selectedCustomer._id, customer).subscribe(() => {
        this.loadCustomers();
        this.isEditing = false;
        this.selectedCustomer = null;
        this.newCustomer = {...this.customerPlaceholder}
      });
    }
  }

  deleteCustomer(id: string): void {
    this.customerService.remove(id).subscribe(() => {
      this.loadCustomers();
    });
  }

  isFormValid(customer: CustomerCreation): boolean {
    return !!customer.firstName && !!customer.lastName && !!customer.contact;
  }
}
