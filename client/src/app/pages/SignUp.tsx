import React from 'react';
import Layout from "../components/shared/Layout/Layout";
import Header from "../components/shared/Header/Header";
import SignUpContent from "../components/app/SignUp/SignUp";

const SignUp: React.FC = (): JSX.Element => {
    return (
        <Layout header={<Header/>} content={<SignUpContent/>}/>
    );
};

export default SignUp;