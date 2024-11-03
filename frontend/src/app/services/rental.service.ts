import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private readonly apiUrl = 'http://localhost:3000/rentals'; // Adjust the base URL if necessary

  constructor(private http: HttpClient) {}

  assignCustomerToCar(carId: string, customerId: string, kilometers: number): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/${carId}`, { customerId, kilometers });
  }

  removeRental(carId: string): Observable<Car> {
    return this.http.delete<Car>(`${this.apiUrl}/${carId}`);
  }

  getRentedCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/rented`);
  }

  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/available`);
  }
}
