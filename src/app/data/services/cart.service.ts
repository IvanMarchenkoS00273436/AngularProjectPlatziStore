import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProduct } from '../interfaces/cart.product.interface';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  http: HttpClient = inject(HttpClient);
  cookieService: CookieService = inject(CookieService);
  baseApiUrl: string = 'https://4xs7lciuu1.execute-api.us-east-1.amazonaws.com/main/';
  
  private readonly USER_ID_COOKIE = 'userId';
  private userId: string;

  constructor() {
    this.userId = this.getUserIdFromCookieOrCreate();
    console.log('User ID:', this.userId);
  }

  private getUserIdFromCookieOrCreate(): string {
    if (this.cookieService.check(this.USER_ID_COOKIE)) {
      return this.cookieService.get(this.USER_ID_COOKIE);
    }
    
    const newUserId = uuidv4();
    
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    
    this.cookieService.set(
      this.USER_ID_COOKIE,
      newUserId,
      expirationDate,
      '/', 
      undefined,
      false, 
      'Lax'
    );
    
    return newUserId;
  }

  getUserId(): string {
    return this.userId;
  }

  getCartProducts(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(`${this.baseApiUrl}products_in_cart/${this.userId}`);
  }

  addToCart(productId: number): Observable<any> {
    const cartProduct: CartProduct = {
      userId: this.userId,
      productId: productId
    };
    
    return this.http.post<any>(`${this.baseApiUrl}products_in_cart`, cartProduct);
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseApiUrl}products_in_cart/${this.userId}/${productId}`);
  }
}
