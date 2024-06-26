import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ref } from "yup";
import "yup-phone-lite";

const userName = yup
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
    .min(8, "Minimum 8 characters to fill")
    .matches(/[A-Z]/, "At least 1 character should be an uppercase letter!")
    .matches(/[0-9]/, "At least 1 character should be a digit!");

const confirmPassword = yup
    .string()
    .required("Please re-type your password")
    .min(8, "Minimum 8 characters to fill")
    .oneOf([ref("password")], "Passwords do not match");

const subject = yup.string().max(100, "Maximum 100 characters to fill");

const message = yup
    .string()
    .min(5, "Minimum 5 characters to fill")
    .max(500, "Maximum 500 characters to fill")
    .required("Required field!");

const phone = yup
    .string()
    .phone(["US", "PL"], "Please enter a valid phone number")
    .required("Required field!");
const terms = yup
    .boolean()
    .oneOf([true], "The terms and conditions must be accepted.");

const registerSchema = yup.object({
    userName,
    email,
    password,
    confirmPassword,
});
const loginSchema = yup.object({
    email,
    password,
});
const resetSchema = yup.object({
    email,
});
const setSchema = yup.object({
    password,
    confirmPassword,
});
const contactSchema = yup.object({
    userName,
    email,
    subject,
    message,
});
const changePasswordSchema = yup.object({
    currentPassword: password,
    password,
    confirmPassword,
});
const addMobileSchema = yup.object({
    phone,
    terms,
});
const registerMobileSchema = yup.object({
    userName,
    phone,
});
const loginMobileSchema = yup.object({
    phone,
});
const changeUserNameSchema = yup.object({
    userName,
});

export const RegisterFormValidation: Object = {
    defaultValues: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    },
    resolver: yupResolver(registerSchema),
    mode: "onChange",
};
export const LoginFormValidation: Object = {
    defaultValues: {
        password: "",
        email: "",
        rememberMe: false,
    },
    resolver: yupResolver(loginSchema),
    mode: "onChange",
};
export const ResetFormValidation: Object = {
    defaultValues: {
        email: "",
    },
    resolver: yupResolver(resetSchema),
    mode: "onChange",
};
export const SetFormValidation: Object = {
    defaultValues: {
        password: "",
        confirmPassword: "",
    },
    resolver: yupResolver(setSchema),
    mode: "onChange",
};
export const ChangePasswordFormValidation: Object = {
    defaultValues: {
        currentPassword: "",
        password: "",
        confirmPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
    mode: "onChange",
};

export const ContactFormValidation: Object = {
    defaultValues: {
        userName: "",
        email: "",
        subject: "",
        message: "",
    },
    resolver: yupResolver(contactSchema),
    mode: "onChange",
};

export const AddMobileValidation: Object = {
    defaultValues: {
        phone: "",
        terms: false,
    },
    resolver: yupResolver(addMobileSchema),
    mode: "onChange",
};

export const LoginMobileValidation: Object = {
    defaultValues: {
        phone: "",
        rememberMe: false,
    },
    resolver: yupResolver(loginMobileSchema),
    mode: "onChange",
};

export const RegisterMobileValidation: Object = {
    defaultValues: {
        userName: "",
        phone: "",
        terms: false,
    },
    resolver: yupResolver(registerMobileSchema),
    mode: "onChange",
};

export const UserNameValidation: Object = {
    resolver: yupResolver(changeUserNameSchema),
    mode: "onChange",
};
