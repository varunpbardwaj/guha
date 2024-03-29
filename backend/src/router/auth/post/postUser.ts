import Router, { Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { validateRegisterUser } from "../../../validators/user";
import { hash } from "bcryptjs";
import { resolveUsers, writeUser } from "../../../utils";

const postUser = Router();

postUser.post(
  "/api/auth/register",
  checkSchema(validateRegisterUser),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const users = resolveUsers();
      const { username, password } = req.body;
      const hashedPassword = await hash(password, 10);
      writeUser([...users, { username: username, password: hashedPassword }]);
      res.status(200).json({ username: username });
    } else {
      res.status(400).send({ errors: result.array() });
    }
  }
);

export default postUser;
