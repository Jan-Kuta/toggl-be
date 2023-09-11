import sql from './db'

export interface Project {
  id: number
  name: string
  active: boolean
  user_name: string
}

export async function list() {
  return await sql<Project[]>`
    SELECT id, name, active, user_name FROM projects
    ORDER BY id DESC
  `
}

export async function create(p: Project) {
  return await sql<Project[]>`
    INSERT INTO projects (name, active, user_name) VALUES (${p.name}, ${p.active}, ${p.user_name})
    RETURNING id, name, active, user_name
  `
}

export async function update(p: Project) {
  return await sql<Project[]>`
    UPDATE projects SET name=${p.name} WHERE id=${p.id}
    RETURNING id, name, active, user_name
  `
}

export async function remove(p: Project) {
  return await sql<Project[]>`
    UPDATE projects SET active=FALSE WHERE id=${p.id}
    RETURNING id, name, active, user_name
  `
}
