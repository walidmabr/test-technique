import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { addProduct, storeInterface } from '../../../store/store';
import { Store } from '@ngrx/store';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  page = 1;
  pageSize = 8;
  searchTerm: string = '';
  loading: boolean = true;
  skeletons: number[] = Array(this.pageSize);
  searchInputSubject = new Subject<string>();

  constructor(
    private productService: ProductService,
    private store: Store<storeInterface>
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadProducts();
      this.loading = false;
    }, 2000);
    this.searchInputSubject
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchName => {
        const data = {
          contactName: searchName.trim().toLowerCase(),
        };
        console.log('%centreprises.component.ts line:203 data search', 'color: #007acc;', data);
        return  this.productService.searchProduct(searchName.trim().toLowerCase()).pipe();
      }),
    )
    .subscribe((res: any) => {
      this.products = res;
      this.updatePaginatedProducts();
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.updatePaginatedProducts();
    });
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchInputSubject.next(filterValue);
  }
  // onSearch(event: Event): void {
  //   const target = event.target as HTMLInputElement;
  //   const value = target?.value;
  //   if (value) {
  //     this.searchTerm = value;
  //     this.productService.searchProduct(this.searchTerm).subscribe(res => {
  //       this.products = res;
  //       this.updatePaginatedProducts();
  //     });
  //   }
  // }

  onPageChange(page: number) {
    this.page = page;
    this.updatePaginatedProducts();
  }

  addToCart(product: Product): void {
    this.store.dispatch(addProduct({ product }));
  }

  isNewProduct(createdAt: string): boolean {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const diffTime = Math.abs(currentDate.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  }

  private updatePaginatedProducts() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }
}
