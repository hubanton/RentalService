export interface CustomerCreation {
  firstName: string;
  lastName: string;
  contact: string;
  rentedCars: string[];
}

export interface Customer extends CustomerCreation {
  _id: string;
}
