import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Customer } from './customer.model';

export type CarDocument = Car & Document;

@Schema()
export class Car extends Document {
    @Prop({ required: true })
    make: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    licenseNumber: string;

    @Prop({ required: true })
    year: number;

    @Prop({ type: Customer, required: false })
    rentedBy?: Customer;

    @Prop({ required: false })
    rentalKilometers?: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
