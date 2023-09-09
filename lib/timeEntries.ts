import sql from './db'

export interface TimeEntry{
  id: number
  task: string
  start: Date
  end?: Date
  userName: string
  projectId: number
  projectName?: string
}

export async function listByProject(userName: string, projectId: number) {
  return await sql<TimeEntry[]>`
    SELECT t.id, t.task, t.start, t.end, t.project_id, p.project_name FROM time_entries t INNER JOIN projects p on time_entries.project_id = projects.id WHERE user_name=${userName} AND project_id=${projectId}
    ORDER BY start DESC
  `
}

export async function listStartsInInterval(userName: string, start: Date, end: Date) {
  return await sql<TimeEntry[]>`
    SELECT t.id, t.task, t.start, t.end, t.project_id, p.project_name FROM time_entries t INNER JOIN projects p on time_entries.project_id = projects.id WHERE user_name=${userName} AND start >= ${start} AND start <= ${end}
    ORDER BY start DESC
  `
}

export async function list(userName: string) {
  return await sql<TimeEntry[]>`
    SELECT t.id, t.task, t.start, t.end, t.project_id, p.project_name FROM time_entries t INNER JOIN projects p on time_entries.project_id = projects.id WHERE user_name=${userName}
    ORDER BY start DESC
  `
}

export async function create(te: TimeEntry) {
  return await sql<TimeEntry[]>`
    INSERT INTO projects (task, start, end, user_name, project_id) VALUES (${te.task}, ${te.start}, ${te.end || null}, ${te.userName})
    RETURNING id, task, start, end, project_id
  `
}

export async function update(te: TimeEntry) {
  return await sql<TimeEntry[]>`
    UPDATE time_entry SET task=${te.task}, start={te.start}, end={te.end}, user_name=${te.userName}, project_id=${te.projectId} WHERE id=${te.id}
    RETURNING id, task, start, end, project_id
  `
}

export async function remove(te: TimeEntry) {
  return await sql<TimeEntry[]>`
    DELETE FROM time_entries WHERE id=${te.id}
    RETURNING id, task, start, end, project_id
  `
}
