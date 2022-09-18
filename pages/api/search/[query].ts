import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = { message: string } | IProduct[];

/** Search by Slug & Title */
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case 'GET':
         return searchProducts(req, res);

      default:
         return res.status(400).json({ message: 'Bad request' });
   }
}

const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
   let { query = '' } = req.query;

   if (query.length === 0) return res.status(400).json({ message: 'Specify the query' });

   query = query.toString().toLowerCase();

   await db.connect();

   /** models: 'productSchema.index({ title: 'text', tags: 'text' });'*/
   const products = await Product.find({ $text: { $search: query } })
      .select('title images price inStock slug -_id')
      .lean();

   await db.disconnect();

   res.status(200).json(products);
};
