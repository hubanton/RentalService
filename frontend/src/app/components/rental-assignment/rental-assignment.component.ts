import { Component, OnInit } from '@angular/core';
import {Customer} from '../../models/customer.model';
import {Car} from "../../models/car.model";
import {CarService} from "../../services/car.service";
import {RentalService} from "../../services/rental.service";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'car',
  templateUrl: './rental-assignment.component.html',
  styleUrls: ['./rental-assignment.component.scss']
})
export class RentalAssignmentComponent implements OnInit {
  isEditing = false;

  selectedCar: Car | null = null;

  availableCars: Car[] = [];
  availableCustomers: Customer[] = [];
  alreadyRentedCars: Car[] = []

  selectedCarId: string | null = null;
  selectedCustomerId: string | null = null;
  kilometers: number | null = null;

  constructor(private rentalService: RentalService, private customerService: CustomerService, private carService: CarService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.rentalService.getAvailableCars().subscribe((availableCars) => this.availableCars = availableCars);
    this.rentalService.getRentedCars().subscribe((rentedCars) => {this.alreadyRentedCars = rentedCars;});
    this.customerService.findAll().subscribe((customers) => {this.availableCustomers = customers;});
  }

  editRental(car: Car): void {
    this.selectedCar = car;
    this.isEditing = true;
  }

  deleteRental(id: string): void  {
    this.rentalService.removeRental(id).subscribe(() => {
      this.rentalService.getRentedCars().subscribe((rentedCars) => {this.alreadyRentedCars = rentedCars;});
      this.rentalService.getAvailableCars().subscribe((availableCars) => this.availableCars = availableCars);
    })
  }

  updateRental(car: Partial<Car> | null): void {
    if (this.selectedCar && car) {
      this.carService.update(this.selectedCar._id, car).subscribe(() => {
        this.rentalService.getRentedCars().subscribe((rentedCars) => {this.alreadyRentedCars = rentedCars;});
        this.isEditing = false;
        this.selectedCar = null;
      });
    }
  }

  createRental(carId: string, customerId: string, kilometer: number) {
    this.rentalService.assignCustomerToCar(carId, customerId, kilometer).subscribe(() => {
      this.rentalService.getRentedCars().subscribe((rentedCars) => {this.alreadyRentedCars = rentedCars;});
      this.rentalService.getAvailableCars().subscribe((availableCars) => this.availableCars = availableCars);
      this.isEditing = false;
      this.selectedCar = null;
      this.selectedCarId = null;
      this.selectedCustomerId = null;
      this.kilometers = null
    })
  }
}
