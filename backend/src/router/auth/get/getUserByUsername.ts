import Router, { Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { validateLoginUser } from "../../../validators/user";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { findUserByUsername } from "../../../utils";

const getUserByUsername = Router();

const EXPIRES_IN = 3600 * 168;

getUserByUsername.post(
  "/api/auth/login",
  checkSchema(validateLoginUser),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { username, password } = req.body;
      const findUser = findUserByUsername(username);
      if (findUser.length === 0)
        res.status(400).send({ errors: "No user found" });
      const isMatch = await compare(password, findUser[0].password);
      if (isMatch) {
        const access_token = sign(
          { username: username, isAutheticated: true },
          process.env.JWT_SECRET!,
          { expiresIn: EXPIRES_IN }
        );
        res.status(200).json({ username, access_token });
      } else {
        res.status(400).send({ errors: "Invalid credentials" });
      }
    } else {
      res.status(400).send({ errors: result.array() });
    }
  }
);

export default getUserByUsername;
