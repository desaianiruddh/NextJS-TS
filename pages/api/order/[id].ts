import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../lib/mongo';
import Order from '../../../model/Order';
import { OrderData } from '../../../model';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<OrderData[]>
): Promise<void> => {
  const {
    method,
    query: { id },
  } = req;
  await dbConnect();
  if (method === 'GET') {
    try {
      const order: OrderData[] | null = await Order.findById(id);
      if (order) res.status(200).json(order);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
  if (method === 'PUT') {
    try {
      const order: OrderData[] | null = await Order.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      if (order) res.status(200).json(order);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
};

export default handler;
