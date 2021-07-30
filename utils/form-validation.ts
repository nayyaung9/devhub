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

export const projectValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, "Project Title must be at least 2 characters")
    .max(100)
    .required("Project title is required"),
  description: Yup.string().min(2).max(450),
  projectType: Yup.string().required('Please provide your project type'),
  projectUrl: Yup.string(),
  demoUrl: Yup.string(),
  tags: Yup.string().required("Please provide topics for your projects"),
});
