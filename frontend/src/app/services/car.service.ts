import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Car, CarCreation} from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:3000/cars';

  constructor(private http: HttpClient) {}

  create(car: CarCreation): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  findAll(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  findOne(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  update(id: string, car: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car);
  }

  remove(id: string): Observable<Car> {
    return this.http.delete<Car>(`${this.apiUrl}/${id}`);
  }
}
