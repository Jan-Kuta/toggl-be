import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  if (req.method === 'POST') {
    if (!req.body.userName) {
      return res.status(400).send('Bad Request')
    }

    res.setHeader('Set-Cookie', `userName=${req.body.userName}; Path=/; HttpOnly; SameSite=Strict`)
    return res.status(200).json('ok')
  }

  return res.status(405).send('Method Not Allowed')
}