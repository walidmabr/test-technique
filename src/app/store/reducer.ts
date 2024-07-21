import { createReducer, on, Action } from '@ngrx/store';
 import { addProduct, addQuantity, removeQuantity, deleteProduct, initializeProducts } from './store';
import { Product } from '../models/product.model';

export interface ProductState {
    products: Product[];
    totalPrice: number;
}

const initialState: ProductState = {
    products: [],
    totalPrice: 0
};

const calculateTotalPrice = (products: Product[]): number => {
    return products.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
};

const _productReducer = createReducer(
    initialState,
    on(addProduct, (state, { product }) => {
        const productWithDefaultQuantity = {
            ...product,
            quantity: product.quantity || 1
        };

        const existingProductIndex = state.products.findIndex(p => p.id === productWithDefaultQuantity.id);

        let updatedProducts;
        if (existingProductIndex !== -1) {
            updatedProducts = state.products.map((p, index) =>
                index === existingProductIndex
                    ? { ...p, quantity: (p.quantity || 0) + productWithDefaultQuantity.quantity }
                    : p
            );
        } else {
            updatedProducts = [...state.products, productWithDefaultQuantity];
        }

        return {
            ...state,
            products: updatedProducts,
            totalPrice: calculateTotalPrice(updatedProducts)
        };
    }),
    on(addQuantity, (state, { productId, quantity }) => {
        const updatedProducts = state.products.map(product =>
            product.id === productId
                ? { ...product, quantity: (product.quantity || 0) + quantity }
                : product
        );

        return {
            ...state,
            products: updatedProducts,
            totalPrice: calculateTotalPrice(updatedProducts)
        };
    }),
    on(removeQuantity, (state, { productId, quantity }) => {
        const updatedProducts = state.products.map(product => {
            if (product.id === productId) {
                const newQuantity = (product.quantity || 0) - quantity;
                if (newQuantity <= 0) {
                    return null;
                }
                return { ...product, quantity: newQuantity };
            }
            return product;
        }).filter(product => product !== null);

        return {
            ...state,
            products: updatedProducts as Product[],
            totalPrice: calculateTotalPrice(updatedProducts as Product[])
        };
    }),
    on(deleteProduct, (state, { productId }) => {
        const updatedProducts = state.products.filter(product => product.id !== productId);

        return {
            ...state,
            products: updatedProducts,
            totalPrice: calculateTotalPrice(updatedProducts)
        };
    }),
    on(initializeProducts, (state, { products }) => ({
        ...state,
        products,
        totalPrice: calculateTotalPrice(products)
    }))
);

export function productReducer(state: ProductState | undefined, action: Action) {
    return _productReducer(state, action);
}
