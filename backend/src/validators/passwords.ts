export const validateId = {
  id: {
    isNumeric: {
      errorMessage: "Invalid Request. Not a number!",
    },
  },
};

export const validatePassword = {
  username: {
    isLength: {
      options: {
        min: 1,
      },
      errorMessage: "Invalid Request. Please provide valid username",
    },
  },
  site_name: {
    isLength: {
      options: {
        min: 1,
      },
      errorMessage: "Invalid Request. Please provide valid site name",
    },
  },
  site_url: {
    isLength: {
      options: {
        min: 1,
      },
      errorMessage: "Invalid Request. Please provide valid site url",
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
