import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addProduct, storeInterface } from '../../../store/store';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product:any;
  productId:any
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private store: Store<storeInterface>
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.loadProductById(this.productId)
    }
  }
  loadProductById(product:number) {
    this.productService.getProductById(product).subscribe((data: any) => {
      this.product = data;
    });
  }
  addToCart(product: Product): void {
    this.store.dispatch(addProduct({ product }));
  }
}
