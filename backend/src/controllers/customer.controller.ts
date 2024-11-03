import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer.model";

@Controller('customers') // Base route for customers
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    async create(@Body() customer: Customer): Promise<Customer> {
        return this.customerService.create(customer);
    }

    @Get()
    async findAll(): Promise<Customer[]> {
        return this.customerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Customer> {
        return this.customerService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() customer: Partial<Customer>): Promise<Customer> {
        return this.customerService.update(id, customer);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Customer> {
        return this.customerService.remove(id);
    }
}
