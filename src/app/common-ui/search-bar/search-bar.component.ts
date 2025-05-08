import { Component } from '@angular/core';
import { ProductService } from '../../data/services/product.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { ProductInterface } from '../../data/interfaces/product.interface';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})

export class SearchBarComponent {
  @Output() searchResults: EventEmitter<ProductInterface[]> = new EventEmitter<ProductInterface[]>();
  searchTerm: string = '';
  productService: ProductService = inject(ProductService);
  isLoading: boolean = false;

  search(): void {
    if (this.searchTerm.trim()) {
      this.isLoading = true;
      this.productService.getProductsByTitle(this.searchTerm)
        .subscribe({
          next: (results) => {
            this.searchResults.emit(results);
            this.isLoading = false;
            console.log('Search results:', results);
          },
          error: (error) => {
            console.error('Error searching products:', error);
            this.isLoading = false;
          }
        });
    }
  }
  
  clearSearch(): void {
    this.searchTerm = '';
    this.productService.getAllProducts()
      .subscribe(products => this.searchResults.emit(products));
  }
}