import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse<string>) => {
  const token: string | undefined = process.env.TOKEN;
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      if (token) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', token, {
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
          })
        );
        res.status(200).json('Succesfull');
      }
    } else {
      res.status(400).json('Wrong Credentials!');
    }
  }
};

export default handler;
