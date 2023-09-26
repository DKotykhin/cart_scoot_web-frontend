import React from 'react';

import { redirect } from "next/navigation";

import { getUserByToken } from 'apollo/services/getUserByToken';

import LoginCard from './components/LoginCard';

const LoginPage = async () => {

    const data = await getUserByToken();

    return data ? redirect('/') : <LoginCard />;
};

export default LoginPage;