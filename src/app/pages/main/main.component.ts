import { Component } from '@angular/core';
import { ProductService } from '../../data/services/product.service';
import { inject } from '@angular/core';
import { ProductInterface } from '../../data/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent {
  title: string = 'Platzi Store Angular final project';
  productService: ProductService = inject(ProductService);
  topthreeProducts: ProductInterface[] = [];
  
  constructor() {
    this.productService.getAllProducts().subscribe((val: ProductInterface[]) => {
      this.topthreeProducts = val.slice(0, 3);
    });
  }
}
