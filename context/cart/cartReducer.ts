import { ICartProduct } from '../../interfaces';
import { CartState, ShippingAddress } from './';

type CartActionType =
   | { type: '[Cart] - LoadCart from cookies'; payload: ICartProduct[] }
   | { type: '[Cart] - Update Products'; payload: ICartProduct[] }
   | { type: '[Cart] - Update Quantity'; payload: ICartProduct[] }
   | { type: '[Cart] - Remove Product'; payload: ICartProduct[] }
   | { type: '[Cart] - Load Address from Cookies'; payload: ShippingAddress }
   | { type: '[Cart] - Update Shipping Address'; payload: ShippingAddress }
   | {
        type: '[Cart] - Update Order Summary';
        payload: {
           numberOfItems: number;
           subTotal: number;
           tax: number;
           total: number;
        };
     };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
   switch (action.type) {
      case '[Cart] - LoadCart from cookies':
         return {
            ...state,
            isLoaded: true,
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

      case '[Cart] - Remove Product':
         return {
            ...state,
            cart: action.payload,
         };

      case '[Cart] - Update Order Summary':
         return {
            ...state,
            ...action.payload,
         };

      case '[Cart] - Load Address from Cookies':
      case '[Cart] - Update Shipping Address':
         return {
            ...state,
            shippingAddress: action.payload,
         };

      default:
         return state;
   }
};
