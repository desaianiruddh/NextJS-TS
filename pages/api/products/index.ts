import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../lib/mongo';
import Product from '../../../model/Product';
import { ProductData } from '../../../model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData[]>
): Promise<void> {
  const { method, cookies } = req;
  const token = cookies.token;
  dbConnect();
  if (method === 'GET') {
    try {
      const products: ProductData[] = await Product.find();
      res.status(200).json(products);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
  if (method === 'POST') {
    try {
      const product: ProductData[] = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
}
