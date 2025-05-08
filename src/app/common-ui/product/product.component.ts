import { Component, Input } from '@angular/core';
import { ProductInterface } from '../../data/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  @Input() product?: ProductInterface;
}
