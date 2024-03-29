import Router, { Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { validatePassword } from "../../../validators/passwords";
import { resolvePasswords, writePasswords } from "../../../utils";
import crypto from "crypto-js";

const postPassword = Router();

postPassword.post(
  "/api/passwords",
  checkSchema(validatePassword),
  async (req: Request, res: Response) => {
    const checkSchemaResult = validationResult(req);
    if (checkSchemaResult.isEmpty()) {
      const encryptedPassword = crypto.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_SECRET!
      ).toString();
      req.body.password = encryptedPassword;
      const passwords = resolvePasswords();
      const newPassword = {
        id: passwords.length > 0 ? passwords[passwords.length - 1].id + 1 : 1,
        ...req.body,
      };
      const body = { ...newPassword };
      delete body.password;
      writePasswords([...passwords, newPassword]);
      return res.status(201).send(body);
    } else {
      res.status(400).send({ errors: checkSchemaResult.array() });
    }
  }
);

export default postPassword;
