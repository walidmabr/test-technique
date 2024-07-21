import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { CookieService } from 'ngx-cookie-service';
import { Inject } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>(this.getCartFromCookies());
  cart$ = this.cart.asObservable();
  quantity!: number;
  private cartItemCount = new BehaviorSubject<number>(this.getCartFromCookies().length);
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor(@Inject(CookieService) private cookieService: CookieService) {}

  private getCartFromCookies(): Product[] {
    const cart = this.cookieService.get('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartToCookies(cart: Product[]): void {
    this.cookieService.set('cart', JSON.stringify(cart));
  }

  addToCart(product: Product) {
    const currentCart = this.cart.getValue();
    const updatedCart = [...currentCart, product];
    this.cart.next(updatedCart);
    this.saveCartToCookies(updatedCart);
    this.cartItemCount.next(updatedCart.length);
  }


  removeFromCart(product: Product) {
    const currentCart = this.cart.getValue().filter(p => p.id !== product.id);
    this.cart.next(currentCart);
    this.saveCartToCookies(currentCart);
    this.cartItemCount.next(currentCart.length);
  }

  getCart(): Observable<Product[]> {
    return this.cart$;
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCount$;
  }
  updateQuantity(product: Product, quantity: number) {
    const currentCart = this.cart.getValue();
    const productIndex = currentCart.findIndex(item => item.id === product.id);

    if (productIndex > -1) {
      if (quantity <= 0) {
        this.removeFromCart(product);
      } else {
        this.quantity = quantity;
        this.cart.next([...currentCart]);
      }
    }
  }
}
