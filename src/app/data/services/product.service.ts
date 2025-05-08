import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService
{
  http : HttpClient = inject(HttpClient);
  baseApiUrl: string = 'https://api.escuelajs.co/api/v1/';

  constructor() { }

  getAllProducts(): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.baseApiUrl}products`);
  }

  getProductById(id: number): Observable<ProductInterface> {
    return this.http.get<ProductInterface>(`${this.baseApiUrl}products/${id}`);
  }
  
  getProductsByTitle(string: string) : Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(`${this.baseApiUrl}products/?title=${string}`);
  }


}
