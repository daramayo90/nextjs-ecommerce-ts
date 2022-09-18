import { IUser } from './';

export interface IOrder {
   _id?: string;
   user?: IUser | string;
   orderItems: IOrderItem[];
   shippingAddress: ShippingAddress;
   paymentResult?: string;

   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;

   isPaid: boolean;
   paidAt?: string;
}

export interface IOrderItem {
   _id: string;
   title: string;
   slug: string;
   size: string;
   image: string;
   quantity: number;
   price: number;
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
