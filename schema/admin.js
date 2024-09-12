import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const adminSchema = Yup.object({

    username: Yup.string()
        .required("Username is required.")
        .min(3, "Username must be at least 3 characters long"),

    password: Yup.string()
        .required("Password is required.")
        .min(5, "Password must be at least 5 characters.")
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //     "Password must contain at least one uppercase, one lowercase, one number and one special character."
    // ),


})

