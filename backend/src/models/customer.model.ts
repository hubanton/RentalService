import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {Car} from "./car.model";
export type CustomerDocument = Customer & Document;


@Schema()
export class Customer extends Document {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true })
    contact: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Car' }], default: [] })
    rentedCars: string[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
