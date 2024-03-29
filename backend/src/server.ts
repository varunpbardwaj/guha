import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import getUserByUsername from "./router/auth/get/getUserByUsername";
import postUser from "./router/auth/post/postUser";
import getPasswords from "./router/passwords/get/getPasswords";
import getPasswordById from "./router/passwords/get/getPasswordById";
import postPassword from "./router/passwords/post/postPassword";
import updatePassword from "./router/passwords/put";
import deletePasswordById from "./router/passwords/delete";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

const server = express();

server.use(cors(corsOptions));

server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.status(200).send({ msg: "Hello World!" });
});

server.use([
  getUserByUsername,
  postUser,
  getPasswords,
  getPasswordById,
  postPassword,
  updatePassword,
  deletePasswordById,
]);

export default server;
