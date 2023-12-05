import * as Yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const SignupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required.")
    .min(2, "Name must be at least 2 characters.")
    .max(20, "Name is too long."),
  username: Yup.string().required("Username is required."),
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string()
    .required("Password is required!")
    .matches(passwordRules, { message: "Please create strong password." })
    .min(8, "Password must be at least 8 characters!")
    .max(28, "Password is too long!"),
});
