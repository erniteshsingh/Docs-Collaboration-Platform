import { body } from "express-validator";

 export const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be 3–20 characters")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Username must contain only letters (no numbers or symbols)")
    .custom((value) => {
      const banned = ["admin", "root", "superuser"];
      if (banned.includes(value.toLowerCase())) {
        throw new Error("This username is not allowed");
      }
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail({ allow_utf8_local_part: false })
    .withMessage("Email must be a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters and include uppercase, lowercase, number and symbol"
    ),
];

export const loginValidator = [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email format"),
  
    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ];


