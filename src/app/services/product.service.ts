import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products`).pipe(
      map((response: any) => response.products)
    );
  }
  searchProduct(search: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products/search?q=${search}`).pipe(
      map((response: any) => response.products)
    );
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/${id}`);
  }
}
