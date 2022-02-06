import React from 'react';
import {Formik} from "formik";
import {Box, Button, TextField, Theme} from "@mui/material";

import {SignInValidationSchema} from "../../../../utils/validation";
import {FormikHelpers} from "formik/dist/types";
import {FormValues} from "../SignIn";
import {useStyles} from "./styles"


interface Props {
    handleSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void
}

const SignInForm: React.FC<Props> = ({handleSubmit}): JSX.Element => {
    const classes = useStyles();


    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            } as FormValues}
            onSubmit={handleSubmit}
            validationSchema={SignInValidationSchema}
        >
            {
                ({
                     handleSubmit,
                     handleChange,
                     handleBlur,
                     values,
                     errors,
                     touched
                 }) => (
                    <form onSubmit={handleSubmit} className={classes.root}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.email && touched.email}
                            helperText={errors.email}
                            className={classes.formControl}
                        />

                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.password && touched.password}
                            helperText={errors.password}
                            className={classes.formControl}
                        />
                        <Box className={classes.buttonWrapper}>
                            <Button variant="contained" type="submit">Submit</Button>
                        </Box>
                    </form>
                )
            }
        </Formik>
    );
};

export default SignInForm;