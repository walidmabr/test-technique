import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { Product } from './models/product.model';
import { Store } from '@ngrx/store';
import { storeInterface } from './store/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, RouterModule, SharedModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: any;

  title = 'product-management-app-test';
  products: Product[] = [];
  constructor(private store: Store<storeInterface>) {
    this.store.select(state => state.products.products).subscribe(products => this.products = products);
  }

  get cartItemCount(): number {
    return 5; 
  }
}
