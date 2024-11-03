import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Customer, CustomerDocument} from "../models/customer.model";
import {Car} from "../models/car.model";

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
                @InjectModel(Car.name) private carModel: Model<Car>) {
    }

    async create(customer: Customer): Promise<Customer> {
        const newCustomer = new this.customerModel(customer);
        return newCustomer.save();
    }

    async findAll(): Promise<Customer[]> {
        return this.customerModel.find().exec();
    }

    async findOne(_id: string): Promise<Customer> {
        return this.customerModel.findOne({_id}).exec();
    }

    async update(_id: string, customer: Partial<Customer>): Promise<Customer> {
        return this.customerModel.findOneAndUpdate({_id}, customer, {new: true}).exec();
    }

    async remove(_id: string): Promise<Customer> {
        const customer = await this.customerModel.findById(_id).populate('rentedCars').exec();

        if (customer) {
            await this.carModel.updateMany(
                { _id: { $in: customer.rentedCars } },
                { $set: { rented: false, rentalKilometers: null } }
            );

            return this.customerModel.findByIdAndDelete(_id).exec();
        }

        throw new Error('Customer not found');
    }
}
