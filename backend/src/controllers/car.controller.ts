import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import {CarService} from "../services/car.service";
import {Car} from "../models/car.model";

@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Post()
    async create(@Body() car: Car): Promise<Car> {
        return this.carService.create(car);
    }

    @Get()
    async findAll(): Promise<Car[]> {
        return this.carService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Car> {
        return this.carService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() car: Partial<Car>): Promise<Car> {
        return this.carService.update(id, car);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Car> {
        return this.carService.remove(id);
    }
}
