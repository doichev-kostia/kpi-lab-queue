import React from 'react';
import {Box, Typography} from "@mui/material";
import SignInForm from "./SignInForm/SignInForm";
import {Link} from "react-router-dom";
import {FormikHelpers} from "formik/dist/types";
import {logIn} from "../../../../data/requests/user";

export interface FormValues {
    email: string;
    password: string
}

const SignInContent: React.FC = (): JSX.Element => {
    const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        logIn(values)
            .then((response) => {
                if (response) {
                    localStorage.setItem('token', response.token);
                }
                actions.resetForm()
            })
    }
    return (
        <Box component="section">
            <Box>
                <Typography component="h2" variant="h2">Sign in</Typography>

                <Box>
                    <SignInForm handleSubmit={handleSubmit}/>
                </Box>
                <Box>
                    <Typography component="span" variant="body1">
                        Don't have an account yet?
                    </Typography>
                    <Link to="/sign-up">Sign up</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignInContent;