import type { NextApiRequest, NextApiResponse } from 'next'
import { type TimeEntry } from '../../lib/timeEntries'
import * as te from '../../lib/timeEntries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TimeEntry[] | string>
) {
  switch (req.method) {
    case 'GET':
      const userName = req.cookies.userName
      if (!userName) {
        return res.status(401).send('Unauthorized')
      }
      const projectId = req.query.projectId
      if (projectId) {
        return res.status(200).json(await te.listByProject(userName, Number(projectId)))
      }
      const start = req.query.start
      const end = req.query.end
      if (start && end) {
        return res.status(200).json(await te.listStartsInInterval(userName, new Date(start as string), new Date(end as string)))
      }

      return res.status(200).json(await te.list(userName))
    case 'POST':
      return res.status(201).json(await te.create(req.body))
    case 'PUT':
      const updated = await te.update(req.body)
      return res.status(updated.length > 0 ? 200 : 404).json(updated)
    case 'DELETE':
      const removed = await te.remove(req.body)
      return res.status(removed.length > 0 ? 204 : 404).end()
    default:
      return res.status(405).send('Method Not Allowed')
  }
}