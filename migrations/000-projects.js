exports.up = async function (sql) {
  await sql`
  
  CREATE TABLE projects (
      id serial PRIMARY KEY NOT NULL,
      name CHARACTER VARYING(255) NOT NULL,
      active boolean,
      user_name CHARACTER VARYING(255) NOT NULL
  );
  `
}

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS projects;
  `
}
