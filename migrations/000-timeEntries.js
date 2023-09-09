exports.up = async function (sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS time_entries (
        id SERIAL PRIMARY KEY NOT NULL,
        task CHARACTER VARYING(255) NOT NULL,
        start DATETIME NOT NULL DEFAULT now(),
        end DATETIME,
        user_name CHARACTER VARYING(255) NOT NULL,
        project_id INTEGER NOT NULL,
    )
    
    CREATE TABLE time_entries (
      id serial PRIMARY KEY NOT NULL
      task CHARACTER VARYING(255) NOT NULL,
      start timestamp with time zone NOT NULL default now(),
      end timestamp with time zone,
      user_name CHARACTER VARYING(255) NOT NULL,
      project_id integer REFERENCES projects(id) NOT NULL
  );
  
  CREATE TABLE projects (
      id serial PRIMARY KEY NOT NULL
      name CHARACTER VARYING(255) NOT NULL,
      active boolean,
      user_name CHARACTER VARYING(255) NOT NULL
  );
  `
}

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS time_entries;
    DROP TABLE IF EXISTS projects;
  `
}
