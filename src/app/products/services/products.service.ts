import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(environment.wajdiAPI + 'products');
  }

  getCategories(): Observable<any> {
    return this.http.get(environment.wajdiAPI + 'products/categories');
  }

  getProductByCategorie(keyword: string) {
    return this.http.get(environment.wajdiAPI + 'products/category/' + keyword);
  }

  getProductById(id: any) {
    return this.http.get(environment.wajdiAPI + 'products/' + id);
  }
}
