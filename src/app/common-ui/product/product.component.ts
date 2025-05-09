import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../data/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../data/services/cart.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  @Input() product?: ProductInterface;
  @Input() context: 'catalog' | 'cart' = 'catalog';

  cartService: CartService = inject(CartService);

  addToCart(productId: number): void {
    console.log('Adding product to cart', productId);
    if (productId) {
      this.cartService.addToCart(productId).subscribe({
        next: () => console.log('Product added to cart'),
        error: (error) => console.error('Error adding product to cart', error)
      });
    }
  }
  
  removeFromCart(productId: number): void {
    if (productId) {
      this.cartService.removeFromCart(productId).subscribe({
        next: () => console.log('Product removed from cart'),
        error: (error) => console.error('Error removing product from cart', error)
      });
    }
  }
}
