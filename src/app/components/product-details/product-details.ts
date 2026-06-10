import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  product = signal<any>(null);
  loading = signal(true);
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (item) => {
          this.product.set(item);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(`Failed to load product details for ${id}:`, err);
          this.errorMessage.set('Could not fetch details for this product. It may not exist.');
          this.loading.set(false);
        }
      });
    } else {
      this.errorMessage.set('No product ID specified in the route.');
      this.loading.set(false);
    }
  }
}
