import { findLoginUser, findUser } from "../utils";

export const validateRegisterUser = {
  username: {
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: "Username should be of 5 or more characters.",
    },
    custom: {
      options: findUser,
      errorMessage: "User already exist.",
    },
  },
  password: {
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage:
        "Password should be of length 8 and contain atleast 1 lowercase, uppercase, number and a symbol",
    },
  },
};

export const validateLoginUser = {
  username: {
    isLength: {
      options: {
        min: 1,
      },
      errorMessage: "Enter the username",
    },
    custom: {
      options: findLoginUser,
      errorMessage: "User not found",
    },
  },
  password: {
    isLength: {
      options: {
        min: 1,
      },
      errorMessage: "Enter the password",
    },
  },
};
