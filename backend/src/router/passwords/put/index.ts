import { Router, Request, Response } from "express";
import { AppRequest } from "../../../types/index";
import {
  resolvePasswords,
  resolveId,
  writePasswords,
} from "../../../utils/index";
import { checkSchema, validationResult } from "express-validator";
import { validateId, validatePassword } from "../../../validators/passwords";
import crypto from "crypto-js";

const updatePassword = Router();

updatePassword.put(
  "/api/passwords/:id",
  checkSchema({ ...validateId, ...validatePassword }),
  resolveId,
  (req: AppRequest & Request, res: Response) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const passwords = resolvePasswords();
      const getId = Number(req.params.id);
      if (req.findIdIndex !== -1) {
        const encryptedPassword = crypto.AES.encrypt(
          req.body.password,
          process.env.CRYPTO_SECRET!
        ).toString();
        const newPasswords = passwords.map((password) => {
          if (password.id === getId) {
            return { id: getId, ...req.body, password: encryptedPassword };
          }
          return password;
        });
        const body = { ...req.body };
        delete body.password;
        writePasswords(newPasswords);
        return res.status(200).json(body);
      } else {
        return res.status(400).send({
          errors: `Bad Request. Invalid id: ${req.params.id}`,
        });
      }
    } else {
      return res.status(400).send({
        errors: result.array(),
      });
    }
  }
);

export default updatePassword;
