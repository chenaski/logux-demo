export const up = async (knex) => {
  const tableName = "users";
  const isTableExists = await knex.schema.hasTable(tableName);

  if (!isTableExists) {
    return knex.schema.createTable(tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("password").notNullable();
    });
  }
};

export const down = async (knex) => {
  return knex.schema.dropTable("users");
};
