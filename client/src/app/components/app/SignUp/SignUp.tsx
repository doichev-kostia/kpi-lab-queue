import React from 'react';
import {Box, Typography} from "@mui/material";
import SignUpForm from "./SignUpForm/SignUpForm";
import {Link} from "react-router-dom";

const SignUpContent: React.FC = (): JSX.Element => {
    return (
        <Box component="section">
            <Box>
                <Typography component="h2" variant="h2">Sign up</Typography>

                <Box>
                    <SignUpForm/>
                </Box>
                <Box>
                    <Typography component="span" variant="body1">
                        Already have an account?
                    </Typography>
                    <Link to="/sign-in">Sign in</Link>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUpContent;