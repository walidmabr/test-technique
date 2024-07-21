import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';
 
export interface storeInterface {
    products: ProductState;
}

interface ProductState {
    products: Product[];
    totalPrice: number;  
}

const initialState: ProductState = {
    products: [],
    totalPrice: 0  // Initial value
};

export const ADD_PRODUCT = '[Product] Add Product';
export const ADD_QUANTITY = '[Product] Add Quantity';
export const REMOVE_QUANTITY = '[Product] Remove Quantity';
export const DELETE_PRODUCT = '[Product] Delete Product';
export const INITIALIZE_PRODUCTS = '[Product] Initialize Products';  

export const addProduct = createAction(
    ADD_PRODUCT,
    props<{ product: Product }>()
);

export const addQuantity = createAction(
    ADD_QUANTITY,
    props<{ productId: number, quantity: number }>()
);

export const removeQuantity = createAction(
    REMOVE_QUANTITY,
    props<{ productId: number, quantity: number }>()
);

export const deleteProduct = createAction(
    DELETE_PRODUCT,
    props<{ productId: number }>()
);

export const initializeProducts = createAction(
    INITIALIZE_PRODUCTS,
    props<{ products: Product[] }>()   
);
