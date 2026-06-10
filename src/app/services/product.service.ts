import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl)
      .pipe(
        map(response => response.products),
        catchError(error => {
          console.error('Error fetching products from DummyJSON:', error);
          return throwError(() => error);
        })
      );
  }

  getProductById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching product ${id} from DummyJSON:`, error);
          return throwError(() => error);
        })
      );
  }
}
