import React from 'react';
import {Formik} from "formik";
import {Box, Button, TextField} from "@mui/material";
import {SignUpValidationSchema} from "../../../../utils/validation";
import {User} from "../../../../../types";
import {FormikHelpers} from "formik/dist/types";
import {useStyles} from "./styles"

const SignUpForm: React.FC = (): JSX.Element => {
    const classes = useStyles();

    const handleSubmit = (values: Partial<User>, actions: FormikHelpers<User>) => {
        console.log(values)
        actions.resetForm()
    }

    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            } as User}
            onSubmit={handleSubmit}
            validationSchema={SignUpValidationSchema}
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
                            id="firstName"
                            name="firstName"
                            label="First name"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.firstName && touched.firstName}
                            helperText={touched.firstName && errors.firstName}
                            className={classes.formControl}
                        />
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last name"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.lastName && touched.lastName}
                            helperText={touched.lastName && errors.lastName}
                            className={classes.formControl}
                        />
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.email && touched.email}
                            helperText={touched.email && errors.email}
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
                            helperText={touched.password && errors.password}
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

export default SignUpForm;