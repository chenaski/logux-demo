import { dirname } from "path";
import { fileURLToPath } from "url";
import { Server } from "@logux/server";
import knex from "knex";
import knexConfig from "./knexfile.js";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

const __dirname = dirname(fileURLToPath(import.meta.url));

const knexClient = knex(knexConfig);
const db = {
  users: {
    async findOneByName({ name }) {
      return knexClient("users")
        .first("id", "name", "password")
        .where({ name });
    },
    async findOneById({ id }) {
      return knexClient("users").first("id", "name").where({ id });
    },
    async changeUserName({ id, name }) {
      return knexClient("users").where({ id }).update({ name });
    },
  },
};

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    root: __dirname,
  })
);

server.auth(({ userId, token }) => {
  if (userId === "anonymous") {
    return true;
  } else {
    try {
      const data = jwt.decode(token, process.env.JWT_SECRET);
      return data.sub.toString() === userId.toString();
    } catch (e) {
      return false;
    }
  }
});

server.type("login", {
  async access(ctx) {
    return ctx.userId === "anonymous";
  },
  async process(ctx, action, meta) {
    const user = await db.users.findOneByName({ name: action.name });

    if (!user) {
      server.undo(action, meta, "Unknown name");
    } else if (await bcrypt.compare(action.password, user.password)) {
      let token = jwt.encode({ sub: user.id }, process.env.JWT_SECRET);
      ctx.sendBack({ type: "login/done", userId: user.id, token });
    } else {
      server.undo(action, meta, "Wrong password");
    }
  },
});

server.channel("user/:id", {
  access(ctx) {
    // User can subscribe only to own data
    return ctx.params.id === ctx.userId;
  },
  async load(ctx) {
    let user = await db.users.findOneById({ id: ctx.params.id });
    // Creating action to set user name and sending it to subscriber
    return { type: "user/name", name: user.name };
  },
});

server.type("user/name", {
  access(ctx, action, meta) {
    // User can change only own name
    return action.userId === ctx.userId;
  },
  resend(ctx, action, meta) {
    // Resend this action to everyone who subscribed to this user
    return `user/${action.userId}`;
  },
  async process(ctx, action, meta) {
    await db.users.changeUserName({ id: action.userId, name: action.name });
  },
});

server.listen();
