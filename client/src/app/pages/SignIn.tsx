import React from 'react';
import Layout from "../components/shared/Layout/Layout";
import Header from "../components/shared/Header/Header";
import SignInContent from "../components/app/SignIn/SignIn";

const SignIn: React.FC = (): JSX.Element => {
    return (
       <Layout header={<Header/>} content={<SignInContent/>}/>
    );
};

export default SignIn;