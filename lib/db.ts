import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL as string + '?sslmode=require')

export default sql
