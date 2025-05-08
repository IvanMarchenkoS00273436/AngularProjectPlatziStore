import { Component, inject } from '@angular/core';
import { ProductService } from '../../data/services/product.service';
import { ProductInterface } from '../../data/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Input } from '@angular/core';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, ProductComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})

export class ProductsListComponent {
  @Input() products: ProductInterface[] = [];
  @Input() loadProducts: boolean = true;

  productService: ProductService = inject(ProductService);
  isLoading: boolean = false;

  ngOnInit() {
    if (this.loadProducts) {
      this.isLoading = true;
      this.productService.getAllProducts().subscribe({
        next: (products: ProductInterface[]) => {
          this.products = products;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.isLoading = false;
        }
      });
    }
  }
}
