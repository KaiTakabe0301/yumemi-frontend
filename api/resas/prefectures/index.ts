import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const RESAS_API_KEY = process.env.RESAS_API_KEY || '';
  const END_POINT = 'https://opendata.resas-portal.go.jp';

  const response = await fetch(`${END_POINT}/api/v1/prefectures`, {
    headers: {
      'X-API-KEY': RESAS_API_KEY,
    },
  });
  return res.status(response.status).json(await response.json());
}
