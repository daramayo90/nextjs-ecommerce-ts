import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order, Product } from '../../../models';

type Data = { message: string } | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'POST':
         return createOrder(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}
const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   const { orderItems, total } = req.body as IOrder;

   // Verify an user is logged in
   const session: any = await getSession({ req });
   if (!session) return res.status(401).json({ message: 'Unauthorized' });

   // Create an array with the products of the client wants
   const productIds = orderItems.map((product) => product._id);

   await db.connect();

   const dbProducts = await Product.find({ _id: { $in: productIds } });

   try {
      // Validate if someone made modifications in the frontend
      const subTotal = orderItems.reduce((prev, current) => {
         const currentPrice = dbProducts.find((prod) => prod.id === current._id)!.price;
         if (!currentPrice) {
            throw new Error('Verify cart again, product does not exist');
         }
         return current.quantity * current.price + prev;
      }, 0);

      const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
      const backendTotal = subTotal * (taxRate + 1);

      if (total !== backendTotal) {
         throw new Error('The total does not add up to the amount');
      }

      // Everything is ok
      const userId = session.user._id;
      const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
      await newOrder.save();

      await db.disconnect();

      return res.status(201).json(newOrder);
   } catch (error) {
      await db.disconnect();
      console.log(error);
      res.status(400).json({ message: 'The total does not add up to the amount' });
   }
};
