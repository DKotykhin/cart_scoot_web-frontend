import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const name = yup
    .string()
    .matches(/^([^0-9]*)$/, "Enter letters!")
    .min(2, "Minimum 2 characters to fill")
    .max(20, "Maximum 20 characters to fill")
    .required("Required field!");

const email = yup
    .string()
    .email("Wrong email address")
    .required("Required field!");

const password = yup
    .string()
    .required("Required field!")
    .min(8, "Minimum 8 characters to fill");

const loginSchema = yup.object({
    email,
    password,
});

export const LoginFormValidation: Object = {
    defaultValues: {
        password: "",
        email: "",
        rememberMe: false,
    },
    resolver: yupResolver(loginSchema),
    mode: "onChange",
};
