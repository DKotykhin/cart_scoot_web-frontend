export enum userTypes {
    "rider" = "RIDER",
    "driver" = "DRIVER",
    "admin" = "ADMIN",
    "subadmin" = "SUBADMIN",
} 

export interface IUserLogin {
    userType: userTypes;
    email: string;
    password: string;
}

export interface IUserRegister extends IUserLogin {
    userName: string;
    confirmPassword: string;
}
