import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  // Username can't be null
  if (options.username.length <= 1) {
    return [
      {
        field: "username",
        message: "Length of username must be greater than or equal to 1.",
      },
    ];
  }

  // Regex = 6-20 characters, 1 number, 1 uppercase, 1 lowercase
  const strongPassword = /^[A-Za-z]\w{7,14}$/;

  // Check password
  if (!options.password.match(strongPassword)) {
    return [
      {
        field: "password",
        message: "Your password is not strong enough.",
      },
    ];
  }

  return null;
};
