import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../lib/mongo';
import Product from '../../../model/Product';
import { ProductData } from '../../../model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductData[]>
): Promise<void> {
  const {
    method,
    query: { id },
  } = req;
  dbConnect();
  if (method === 'GET') {
    try {
      const product: ProductData[] | null = await Product.findById(id);
      if (product) res.status(200).json(product);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }

  if (method === 'PUT') {
    try {
      const product: ProductData[] | null = await Product.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      if (product) res.status(200).json(product);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
  if (method === 'DELETE') {
    try {
      const product: ProductData[] | null = await Product.findByIdAndDelete(id);
      if (product) res.status(200).json(product);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
}
