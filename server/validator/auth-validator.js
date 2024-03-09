const { z } = require("zod");

// creating an object schema

const signUpSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required!" })
    .trim()
    .min(3, { msg: "First Name must be at least 3 characters long" })
    .max(255, { msg: "First Name cannot be greater than 255 characters" }),
  lastName: z
    .string({ required_error: "Last Name is required!" })
    .trim()
    .min(3, { msg: "Last Name must be at least 3 characters long" })
    .max(255, { msg: "Last Name cannot be greater than 255 characters" }),
  email: z
    .string({ required_error: "Email is required!" })
    .trim()
    .email({ msg: "Invalid email address!" }),
  username: z
    .string({ required_error: "Username is required!" })
    .trim()
    .min(3, { msg: "Username must be at least 3 characters long" })
    .max(255, { msg: "Username cannot be greater than 255 characters" }),
  password: z.string({ required_error: "Password is required!" }).trim(),
});

module.exports = signUpSchema;
