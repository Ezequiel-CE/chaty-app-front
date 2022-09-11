import * as Yup from "yup";

export const formValidationRegister = Yup.object({
  mail: Yup.string()
    .min(5, "Must be 5 characters or more")
    .max(200, "Must be 200 characters or less")
    .email("Invalid email address")
    .required("Required"),
  username: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(255, "Must be 255 characters or less")
    .required("Required"),
  password: Yup.string()
    .required()
    .min(8, "Password is too short - should be 8 chars minimum."),
});

export const formValidationLogin = Yup.object({
  mail: Yup.string()
    .min(5, "Must be 5 characters or more")
    .max(200, "Must be 200 characters or less")
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .required()
    .min(8, "Password is too short - should be 8 chars minimum."),
});
