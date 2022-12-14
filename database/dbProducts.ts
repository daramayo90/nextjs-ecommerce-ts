import { db } from './';
import { Product } from '../models';
import { IProduct } from '../interfaces';

export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
   await db.connect();

   const product = await Product.findOne({ slug }).lean();

   await db.disconnect();

   if (!product) return null;

   return JSON.parse(JSON.stringify(product));
};

interface ProductSlug {
   slug: string;
}

export const getAllProductSlug = async (): Promise<ProductSlug[]> => {
   await db.connect();

   const slugs = await Product.find().select('slug -_id').lean();

   await db.disconnect();

   return slugs;
};

export const getProductsByTerm = async (searchTerm: string): Promise<IProduct[]> => {
   searchTerm = searchTerm.toString().toLowerCase();

   await db.connect();

   /** models: 'productSchema.index({ title: 'text', tags: 'text' });'*/
   const products = await Product.find({ $text: { $search: searchTerm } })
      .select('title images price inStock slug -_id')
      .lean();

   await db.disconnect();

   return products;
};

export const getProductsByGender = async (gender: string): Promise<IProduct[]> => {
   await db.connect();

   const products = await Product.find({ gender })
      .select('title images price inStock slug -_id')
      .lean();

   await db.disconnect();

   return products;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
   await db.connect();

   const products = await Product.find().lean();

   await db.disconnect();

   return JSON.parse(JSON.stringify(products));
};
