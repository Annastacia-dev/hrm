import { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
  const destinationURL = `${process.env.VITE_API_BASE_URL}${req.url}`;
  res.writeHead(307, { Location: destinationURL });
  res.end();
};
