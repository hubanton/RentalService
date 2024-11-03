import { Injectable, NotFoundException } from '@nestjs/common';
import { CarService } from './car.service';
import { CustomerService } from './customer.service';
import { Car } from '../models/car.model';

@Injectable()
export class RentalService {
    constructor(
        private readonly carService: CarService,
        private readonly customerService: CustomerService,
    ) {}

    async assignCustomerToCar(customerId: string, carId: string, kilometers: number): Promise<Car> {
        const car = await this.carService.findOne(carId);
        const customer = await this.customerService.findOne(customerId);

        if (!car) {
            throw new NotFoundException('Car not found');
        }
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        car.rentedBy = customer;
        car.rentalKilometers = kilometers;
        customer.rentedCars.push(carId)

        await this.carService.update(carId, car);
        await this.customerService.update(customerId, customer)

        return car;
    }

    async removeRental(carId: string): Promise<Car> {
        const car = await this.carService.findOne(carId);
        if (!car) {
            throw new NotFoundException('Car not found');
        }

        const customer = car.rentedBy;

        customer.rentedCars = customer.rentedCars.filter((car) => car != carId)
        await this.customerService.update(customer._id as string, customer);


        car.rentedBy = null;
        car.rentalKilometers = 0;
        await this.carService.update(carId, car);


        return car;
    }

    async getRentedCars(): Promise<Car[]> {
        const cars = await this.carService.findAll();
        return cars.filter(car => car.rentedBy !== null && car.rentedBy !== undefined);
    }

    async getAvailableCars(): Promise<Car[]> {
        const cars = await this.carService.findAll();
        return cars.filter(car => car.rentedBy === null || car.rentedBy === undefined);
    }
}
