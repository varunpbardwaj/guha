import Router, { Request, Response } from "express";
import { resolvePasswords } from "../../../utils";
import { checkSchema, validationResult } from "express-validator";
import { validateId } from "../../../validators/passwords";

const getPasswordById = Router();

getPasswordById.get(
  "/api/passwords/:id",
  checkSchema(validateId),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const { id } = req.params;
        const passwords = resolvePasswords();
        const findPassword = passwords.filter(
          (password) => password.id === parseInt(id)
        );
        if (findPassword.length === 0) {
          res.status(400).send({ errors: `id: ${id} not found` });
        } else {
          res.status(200).json(findPassword);
        }
      } catch (error) {
        res.status(500).send({ errors: error });
      }
    } else {
      res.status(400).send({ errors: result.array() });
    }
  }
);

export default getPasswordById;
