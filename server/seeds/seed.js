import bcrypt from "bcrypt";

const createUser = ({ id, name, password }) => {
  return {
    id,
    name,
    password,
  };
};

export const seed = (knex) => {
  const tableName = "users";

  return knex(tableName)
    .del()
    .then(() => {
      return knex(tableName).insert(
        [
          {
            name: "John",
            password: bcrypt.hashSync("GIMxuvqyqb", bcrypt.genSaltSync()),
          },
          {
            name: "Robert",
            password: bcrypt.hashSync("mvuvhkL8dg", bcrypt.genSaltSync()),
          },
          {
            name: "Linda",
            password: bcrypt.hashSync("tGeQyyRwi9", bcrypt.genSaltSync()),
          },
          {
            name: "Paul",
            password: bcrypt.hashSync("ye7vU4jdWV", bcrypt.genSaltSync()),
          },
          {
            name: "Jane",
            password: bcrypt.hashSync("AJ1ZZuYAkY", bcrypt.genSaltSync()),
          },
        ].map(({ name, password }, i) => createUser({ id: i, name, password }))
      );
    });
};
