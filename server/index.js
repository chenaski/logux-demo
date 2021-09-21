import { dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "@logux/server";
import knex from "knex";
import knexConfig from "./knexfile.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    root: __dirname,
  })
);

server.auth(({ userId, token }) => {
  // Allow only local users until we will have a proper authentication
  return process.env.NODE_ENV !== "production";
});

server.listen();

const db = knex(knexConfig);
