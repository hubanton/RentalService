import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Customer, CustomerSchema} from "./models/customer.model";
import {Car, CarSchema} from "./models/car.model";
import {CarController} from "./controllers/car.controller";
import {CarService} from "./services/car.service";
import {CustomerController} from "./controllers/customer.controller";
import {CustomerService} from "./services/customer.service";
import {RentalController} from "./controllers/rental.controller";
import {RentalService} from "./services/rental.service";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/car_rental'),
        MongooseModule.forFeature([{name: Car.name, schema: CarSchema}]),
        MongooseModule.forFeature([{name: Customer.name, schema: CustomerSchema}]),
    ],
    controllers: [CarController, CustomerController, RentalController],
    providers: [CarService, CustomerService, RentalService],
})
export class AppModule {
}
