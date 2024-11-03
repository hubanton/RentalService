import { Component, OnInit } from '@angular/core';
import {Car, CarCreation} from "../../models/car.model";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  selectedCar: Car | null = null;
  newCar: CarCreation;
  placeholderCar = {
    make: '',
    type: '',
    year: 2024,
    licenseNumber: ''
  };
  isEditing = false;

  constructor(private carService: CarService) {
    this.newCar = {...this.placeholderCar}
  }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.findAll().subscribe((data) => {
      this.cars = data;
    });
  }

  createCustomer(car: CarCreation): void {
    this.carService.create(car).subscribe(() => {
      this.loadCars();
    });
  }

  editCar(car: Car): void {
    this.selectedCar = {...car};
    this.isEditing = true;
  }

  updateCar(car: Partial<Car> | null): void {
    if (this.selectedCar && car) {
      this.carService.update(this.selectedCar._id, car).subscribe(() => {
        this.loadCars();
        this.isEditing = false;
        this.selectedCar = null;
        this.newCar = {...this.placeholderCar}
      });
    }
  }

  deleteCar(id: string): void {
    this.carService.remove(id).subscribe(() => {
      this.loadCars();
    });
  }

  isFormValid(car: CarCreation): boolean {
    return !!car.make && !!car.type && !!car.year && !!car.licenseNumber;
  }
}
