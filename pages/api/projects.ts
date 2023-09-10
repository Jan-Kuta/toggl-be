import type { NextApiRequest, NextApiResponse } from 'next'
import { type Project } from '../../lib/projects'
import * as p from '../../lib/projects'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | string>
) {
  const userName = req.query.userName
  if (!userName) {
    return res.status(401).send('Unauthorized')
  }

  switch (req.method) {
    case 'GET':
      return res.status(200).json(await p.list())
    case 'POST':
      return res.status(201).json(await p.create({...req.body, userName}))
    case 'PUT':
      if (req.body.userName !== userName) {
        return res.status(401).send('Unauthorized')
      }
      const updated = await p.update(req.body)
      return res.status(updated.length > 0 ? 200 : 404).json(updated)
    case 'DELETE':
      if (req.body.userName !== userName) {
        return res.status(401).send('Unauthorized')
      }
      const removed = await p.remove(req.body)
      return res.status(removed.length > 0 ? 204 : 404).end()
    case 'OPTIONS':
      return res.status(200).json('ok')
    default:
      return res.status(405).send('Method Not Allowed')
  }
}
