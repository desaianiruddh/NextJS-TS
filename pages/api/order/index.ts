import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '../../../lib/mongo';
import Order from '../../../model/Order';
import { OrderData } from '../../../model';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<OrderData[]>
): Promise<void> => {
  const { method } = req;
  await dbConnect();
  if (method === 'GET') {
    try {
      const orders: OrderData[] = await Order.find();
      res.status(200).json(orders);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
  if (method === 'POST') {
    try {
      const order: OrderData[] = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
};

export default handler;
