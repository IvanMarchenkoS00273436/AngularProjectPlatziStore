import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../data/services/cart.service';
import { ProductService } from '../../data/services/product.service';
import { CartProduct } from '../../data/interfaces/cart.product.interface';
import { ProductInterface } from '../../data/interfaces/product.interface';
import { ProductComponent } from '../../common-ui/product/product.component';
import { inject } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ProductComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {
  cartService: CartService = inject(CartService);
  productService: ProductService = inject(ProductService);
  
  cartProducts: ProductInterface[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  
  totalPrice: number = 0;
  
  ngOnInit(): void {
    this.loadCartProducts();
  }
  
  loadCartProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    this.cartService.getCartProducts().pipe(
      switchMap((cartItems: CartProduct[]) => {
        if (cartItems.length === 0) {
          return of([]);
        }
        
        const productObservables: Observable<ProductInterface | null>[] = 
          cartItems.map(item => 
            this.productService.getProductById(item.productId).pipe(
              catchError(error => {
                console.error(`Error fetching product ${item.productId}:`, error);
                return of(null);
              })
            )
          );
        
        return forkJoin(productObservables);
      })
    ).subscribe({
      next: (products: (ProductInterface | null)[]) => {
        this.cartProducts = products.filter(product => product !== null) as ProductInterface[];
        this.calculateTotalPrice();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading cart products:', error);
        this.error = 'Failed to load cart products. Please try again later.';
        this.isLoading = false;
      }
    });
  }
  
  calculateTotalPrice(): void {
    this.totalPrice = this.cartProducts.reduce((total, product) => 
      total + product.price, 0);
  }
  
  onProductRemoved(): void {
    this.loadCartProducts();
  }
}
