import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { RentalService } from '../services/rental.service';
import { Car } from '../models/car.model';

@Controller('rentals')
export class RentalController {
    constructor(private readonly rentalService: RentalService) {}

    @Post(':carId')
    async assignCustomerToCar(
        @Param('carId') carId: string,
        @Body('customerId') customerId: string,
        @Body('kilometers') kilometers: number,
    ): Promise<Car> {
        return this.rentalService.assignCustomerToCar(customerId, carId, kilometers);
    }

    @Delete(':carId')
    async removeRental(@Param('carId') carId: string): Promise<Car> {
        return this.rentalService.removeRental(carId);
    }

    @Get('rented')
    async getRentedCars(): Promise<Car[]> {
        return this.rentalService.getRentedCars();
    }

    @Get('available')
    async getAvailableCars(): Promise<Car[]> {
        return this.rentalService.getAvailableCars();
    }
}
