export interface IUserLogin {
    userType: string;
    email: string;
    password: string;
}

export interface IUserRegister extends IUserLogin {
    userName: string;
    confirmPassword: string;
}
