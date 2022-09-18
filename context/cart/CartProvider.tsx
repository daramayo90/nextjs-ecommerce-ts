import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

interface Props {
   children: ReactNode;
}
export interface CartState {
   isLoaded: boolean;
   cart: ICartProduct[];
   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;
   shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zipcode: string;
   city: string;
   country: string;
   phone: string;
}

const CART_INITIAL_STATE: CartState = {
   isLoaded: false,
   cart: [],
   numberOfItems: 0,
   subTotal: 0,
   tax: 0,
   total: 0,
   shippingAddress: undefined,
};

export const CartProvider: FC<Props> = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

   useEffect(() => {
      try {
         const cookieProducts: ICartProduct[] = JSON.parse(Cookie.get('cart')!) || [];
         dispatch({ type: '[Cart] - LoadCart from cookies', payload: cookieProducts });
      } catch (error) {
         dispatch({ type: '[Cart] - LoadCart from cookies', payload: [] });
      }
   }, []);

   // TODO: Tomar la info de la base de datos
   useEffect(() => {
      if (Cookie.get('address')) {
         const shippingAddress = {
            firstName: Cookie.get('firstName') || '',
            lastName: Cookie.get('lastName') || '',
            address: Cookie.get('address') || '',
            address2: Cookie.get('address2') || '',
            zipcode: Cookie.get('zipcode') || '',
            city: Cookie.get('city') || '',
            country: Cookie.get('country') || '',
            phone: Cookie.get('phone') || '', // TODO: Transformar el numero a string
         };

         dispatch({ type: '[Cart] - Load Address from Cookies', payload: shippingAddress });
      }
   }, []);

   useEffect(() => {
      if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart));
   }, [state.cart]);

   useEffect(() => {
      const numberOfItems = state.cart.reduce((prev, curr) => curr.quantity + prev, 0);
      const subTotal = state.cart.reduce((prev, curr) => curr.quantity * curr.price + prev, 0);
      const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
      const tax = subTotal * taxRate;
      const total = subTotal * (taxRate + 1);

      const orderSummary = {
         numberOfItems,
         subTotal,
         tax,
         total,
      };

      dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary });
   }, [state.cart]);

   const addProductToCart = (product: ICartProduct) => {
      const productInCart = state.cart.some(
         (p) => p._id === product._id && p.size === product.size,
      );

      if (!productInCart) {
         return dispatch({ type: '[Cart] - Update Products', payload: [...state.cart, product] });
      }

      const updatedProducts = state.cart.map((p) => {
         if (p._id === product._id && p.size === product.size) {
            p.quantity += product.quantity;
         }
         return p;
      });

      return dispatch({ type: '[Cart] - Update Products', payload: updatedProducts });
   };

   const updateCartQuantity = (product: ICartProduct) => {
      const products = state.cart.map((p) => {
         if (p._id !== product._id) return p;
         if (p.size !== product.size) return p;

         return product;
      });

      dispatch({ type: '[Cart] - Update Quantity', payload: products });
   };

   const removeCartProduct = (product: ICartProduct) => {
      const products = state.cart.filter(
         (p) => !(p._id === product._id && p.size === product.size),
      );
      dispatch({ type: '[Cart] - Remove Product', payload: products });
   };

   const updateAddress = (address: ShippingAddress) => {
      Cookie.set('firstName', address.firstName);
      Cookie.set('lastName', address.lastName);
      Cookie.set('address', address.address);
      Cookie.set('address2', address.address2 || '');
      Cookie.set('zipcode', address.zipcode);
      Cookie.set('city', address.city);
      Cookie.set('country', address.country);
      Cookie.set('phone', address.phone);
      dispatch({ type: '[Cart] - Update Shipping Address', payload: address });
   };

   return (
      <CartContext.Provider
         value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,
         }}>
         {children}
      </CartContext.Provider>
   );
};
