import Router, { Request, Response } from "express";
import { resolvePasswords } from "../../../utils";

const getPasswords = Router();

getPasswords.get("/api/passwords", (_req: Request, res: Response) => {
  try {
    const passwords = resolvePasswords();
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).send({ errors: error });
  }
});

export default getPasswords;
