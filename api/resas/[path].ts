import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path } = req.query;
  const RESAS_API_KEY = process.env.RESAS_API_KEY || '';
  const END_POINT = 'https://opendata.resas-portal.go.jp';

  const response = await fetch(`${END_POINT}/api/v1/` + path, {
    headers: {
      'X-API-KEY': RESAS_API_KEY,
    },
  });
  return res.status(response.status).json(await response.json());
}
