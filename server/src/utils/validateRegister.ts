import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 1) {
    return [
      {
        field: "username",
        message: "Length of username must be greater than or equal to 1.",
      },
    ];
  }

  if (options.password.length <= 4) {
    return [
      {
        field: "password",
        message: "Length of password must be greater than 4.",
      },
    ];
  }

  return null;
};
