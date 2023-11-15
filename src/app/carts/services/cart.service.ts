import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  createCart(model: any) {
    return this.http.post(environment.wajdiAPI + 'carts', model);
  }
  getAllCartByDateRange(param?: any) {
    let params = new HttpParams();
    params = params
      .append('firstDate', param?.start)
      .append('endDate', param?.end);
    return this.http.get(environment.wajdiAPI + 'carts', { params });
  }
}
