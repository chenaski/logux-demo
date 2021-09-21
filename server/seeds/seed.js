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
          { name: "John", password: "GIMxuvqyqb" },
          { name: "Robert", password: "mvuvhkL8dg" },
          { name: "Linda", password: "tGeQyyRwi9" },
          { name: "Paul", password: "ye7vU4jdWV" },
          { name: "Jane", password: "AJ1ZZuYAkY" },
        ].map(({ name, password }, i) => createUser({ id: i, name, password }))
      );
    });
};
