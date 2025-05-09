import { Component } from '@angular/core';
import { ProductInterface } from '../../data/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { ProductService } from '../../data/services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../data/services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent {
  product? : ProductInterface;
  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  productId: number = +this.route.snapshot.params['id'];
  cartService: CartService = inject(CartService);

  constructor() {
    this.productService
      .getProductById(this.productId)
      .subscribe((product) => { this.product = product; })
  }

  addToCart(productId: number): void {
      console.log('Adding product to cart', productId);
      if (productId) {
        this.cartService.addToCart(productId).subscribe({
          next: () => console.log('Product added to cart'),
          error: (error) => console.error('Error adding product to cart', error)
        });
      }
    }
}
