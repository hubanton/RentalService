import {Customer} from "./customer.model";

export interface CarCreation {
  make: string;
  type: string;
  licenseNumber: string;
  year: number;
  rentedBy?: Customer;
  rentalKilometers?: number;
}

export interface Car extends CarCreation {
  _id: string;
}
