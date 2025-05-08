import { Component } from '@angular/core';
import { ProductsListComponent } from '../../common-ui/products-list/products-list.component';
import { ProductInterface } from '../../data/interfaces/product.interface';
import { SearchBarComponent } from '../../common-ui/search-bar/search-bar.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductsListComponent, SearchBarComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})

export class CatalogComponent {
  products: ProductInterface[] = [];
  searching: boolean = false;

  onSearchResults(results: ProductInterface[]): void {
    this.products = results;
    this.searching = true;
  }
}
