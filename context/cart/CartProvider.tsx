import { FC, ReactNode, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

interface Props {
  children: ReactNode;
}
export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
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

  useEffect(() => {
    if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id && p.size === product.size);

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
    const products = state.cart.filter((p) => !(p._id === product._id && p.size === product.size));
    dispatch({ type: '[Cart] - Remove Product', payload: products });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addProductToCart, updateCartQuantity, removeCartProduct }}>
      {children}
    </CartContext.Provider>
  );
};
