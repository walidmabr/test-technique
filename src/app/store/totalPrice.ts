import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './reducer';
 
export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectTotalPrice = createSelector(
    selectProductState,
    (state: ProductState) => state.totalPrice
);
