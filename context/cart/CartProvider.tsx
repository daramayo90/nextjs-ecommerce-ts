import { FC, ReactNode, useReducer } from 'react';
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

  return (
    <CartContext.Provider value={{ ...state, addProductToCart }}>{children}</CartContext.Provider>
  );
};