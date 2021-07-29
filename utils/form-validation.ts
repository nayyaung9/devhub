import * as Yup from "yup";

const emailNotLongEnough = "Email must be at least 3 characters";
const shopNameNotLongEnough = "Store name must be at least 3 characters";
const usernameNotLongEnough = "Fullname must be at least 3 characters";
const passwordNotLongEnough = "Password must be at least 8 characters";
const invalidEmail = "Email must be a valid email";

export const signUpValidation = Yup.object().shape({
  email: Yup.string()
    .min(3, emailNotLongEnough)
    .max(100)
    .email(invalidEmail)
    .required("Email is required"),
  username: Yup.string()
    .min(3, "Username must be at least 2 characters")
    .max(50)
    .required("Please provide your username"),
  fullName: Yup.string()
    .min(3, usernameNotLongEnough)
    .max(100)
    .required("Full name is required"),
  password: Yup.string()
    .min(8, passwordNotLongEnough)
    .max(100)
    .required("Please Enter your password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
