import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { addQuantity, deleteProduct, removeQuantity, storeInterface } from '../../store/store';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { selectTotalPrice } from '../../store/totalPrice';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  quantity: number = 1
  products: Product[] = [];
  totalPrice$!: Observable<number>;
  shippingFee: number = 5;
  totalWithShipping$!: Observable<number>;

  constructor(private store: Store<storeInterface>) {
    this.store.select(state => state.products.products).subscribe(products => this.products = products);
    this.totalPrice$ = this.store.select(selectTotalPrice);
    this.totalWithShipping$ = this.totalPrice$.pipe(
      map(totalPrice => totalPrice + this.shippingFee)
    );
  }
  ngOnInit() {

  }

  removeFromCart(id: number) {
    this.store.dispatch(deleteProduct({ productId: id }));
  }

  increaseQuantity(id: number) {
    this.store.dispatch(addQuantity({ productId: id, quantity: 1 }));
  }

  decreaseQuantity(id: number) {
    this.store.dispatch(removeQuantity({ productId: id, quantity: 1 }));

  }

  getTotalPrice(cartItems: Product[]): number {
    const shippingCost = 5;
    const productTotal = cartItems.reduce((total, item) => total + (item.price * this.quantity), 0);
    return productTotal;
  }

  confirmOrder() {
    console.log('Order confirmed!');
  }
 
}
