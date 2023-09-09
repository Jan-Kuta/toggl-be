import type { NextApiRequest, NextApiResponse } from 'next'
import { type Project } from '../../lib/projects'
import * as p from '../../lib/projects'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[] | string>
) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json(await p.list())
    case 'POST':
      return res.status(201).json(await p.create(req.body))
    case 'PUT':
      const updated = await p.update(req.body)
      return res.status(updated.length > 0 ? 200 : 404).json(updated)
    case 'DELETE':
      const removed = await p.remove(req.body)
      return res.status(removed.length > 0 ? 204 : 404).end()
    default:
      return res.status(405).send('Method Not Allowed')
  }
}
