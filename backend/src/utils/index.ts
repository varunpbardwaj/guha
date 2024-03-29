import { AppRequest, Password, User } from "../types";
import fs from "node:fs";
import { dbPath, userPath } from "../config/index";
import { Request, NextFunction, Response } from "express";

export const resolvePasswords = () => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    const passwords: Password[] = JSON.parse(data);
    return passwords;
  } catch (err) {
    return [];
  }
};

export const resolveUsers = () => {
  try {
    const data = fs.readFileSync(userPath, "utf-8");
    const users: User[] = JSON.parse(data);
    return users;
  } catch (err) {
    return [];
  }
};

export const writePasswords = (passwords: Password[]) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(passwords, null, 2));
  } catch (err) {
    return [];
  }
};

export const findUser = (value: string) => {
  const users = resolveUsers();
  const isExist = users.findIndex((user: User) => user.username === value);
  if (isExist !== -1) return false;
  return true;
};

export const findLoginUser = (value: string) => {
  const users = resolveUsers();
  const isExist = users.findIndex((user: User) => user.username === value);
  if (isExist !== -1) return true;
  return false;
};

export const findUserByUsername = (value: string) => {
  const users = resolveUsers();
  const user = users.filter((user: User) => user.username === value);
  return user;
};

export const writeUser = (users: User[]) => {
  try {
    fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
  } catch (err) {
    return [];
  }
};

export const resolveId = (
  req: AppRequest & Request,
  res: Response,
  next: NextFunction
) => {
  const getId = Number(req.params.id);
  const bikes: Password[] = resolvePasswords();
  const findIdIndex = bikes.findIndex((bike: Password) => bike.id === getId);
  req.findIdIndex = findIdIndex;
  next();
};
