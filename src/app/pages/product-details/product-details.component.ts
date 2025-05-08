import { Component } from '@angular/core';
import { ProductInterface } from '../../data/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { ProductService } from '../../data/services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor() {
    this.productService
      .getProductById(this.productId)
      .subscribe((product) => { this.product = product; })
  }
}
