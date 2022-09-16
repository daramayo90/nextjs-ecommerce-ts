import { ICartProduct } from '../../interfaces';
import { CartState } from './';

type CartActionType =
  | { type: '[Cart] - LoadCart from cookies'; payload: ICartProduct[] }
  | { type: '[Cart] - Update Products'; payload: ICartProduct[] }
  | { type: '[Cart] - Update Quantity'; payload: ICartProduct[] };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case '[Cart] - LoadCart from cookies':
      return {
        ...state,
        cart: [...action.payload],
      };

    case '[Cart] - Update Products':
      return {
        ...state,
        cart: [...action.payload],
      };

    case '[Cart] - Update Quantity':
      return {
        ...state,
        cart: [...action.payload],
      };

    default:
      return state;
  }
};
