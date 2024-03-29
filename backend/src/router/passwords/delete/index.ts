import Router, { Request, Response } from "express";
import { resolvePasswords, writePasswords } from "../../../utils";

const deletePasswordById = Router();

deletePasswordById.delete(
  "/api/passwords/:id",
  (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const passwords = resolvePasswords();
      const findPassword = passwords.filter(
        (password) => password.id === parseInt(id)
      );
      if (findPassword.length === 0) {
        res.status(400).send({ errors: `id: ${id} not found` });
      } else {
        const remPasswords = passwords.filter(
          (password) => password.id !== parseInt(id)
        );
        writePasswords(remPasswords);
        res.status(200).json(remPasswords);
      }
    } catch (error) {
      res.status(500).send({ errors: error });
    }
  }
);

export default deletePasswordById;
