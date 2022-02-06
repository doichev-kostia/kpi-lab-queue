import * as Yup from "yup"

const minErrorMessage = "Too short";
const maxErrorMessage = "Too long";
const requiredMessage = "Required"

const emailSchema = Yup.string().email('emailIsNotValid').required(requiredMessage);
export const SignInValidationSchema = Yup.object().shape({
    email: emailSchema,
    password: Yup.string().min(8, minErrorMessage).required(requiredMessage)
});

export const SignUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim().min(2, minErrorMessage).max(50, maxErrorMessage).required(requiredMessage),
    lastName: Yup.string().trim().min(2, minErrorMessage).max(50, maxErrorMessage).required(requiredMessage),
    email: emailSchema,
    password: Yup.string().min(8, minErrorMessage).required(requiredMessage),
})