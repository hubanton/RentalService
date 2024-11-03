import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Car, CarDocument} from "../models/car.model";
import {Customer, CustomerDocument} from "../models/customer.model";

@Injectable()
export class CarService {
    constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>,
                @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

    async create(car: Car): Promise<Car> {
        const newCar = new this.carModel(car);
        return newCar.save();
    }

    async findAll(): Promise<Car[]> {
        return this.carModel.find().exec();
    }

    async findOne(_id: string): Promise<Car> {
        return this.carModel.findOne({ _id }).exec();
    }

    async update(_id: string, car: Partial<Car>): Promise<Car> {
        return this.carModel.findOneAndUpdate({ _id }, car, { new: true }).exec();
    }

    async remove(_id: string): Promise<Car> {
        const carToDelete = await this.carModel.findById(_id).exec();

        if (!carToDelete) {
            throw new Error('Car not found');
        }

        if (carToDelete.rentedBy) {
            await this.customerModel.updateOne(
                { _id: carToDelete.rentedBy._id },
                { $pull: { rentedCars: carToDelete._id } }
            ).exec();
        }

        return this.carModel.findOneAndDelete({ _id }).exec();
    }

}
