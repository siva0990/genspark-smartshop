import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products = signal<any[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (items) => {
        this.products.set(items);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.errorMessage.set('Could not fetch products. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  handleProductClick(productId: number) {
    this.router.navigate(['/products', productId]);
  }
}
