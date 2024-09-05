import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const reservationSchema = Yup.object({
    fullName: Yup.string()
        .required("Full name is required.")
        .min(3, "Full name must be at least 3 characters."),
    phoneNumber: Yup.string()
        .required("Phone number is required.")
        .min(10, "Phone number must be at least 10 characters."),
    email: Yup.string()
        .required("Email is required.")
        .email("Invalid email."),
    persons: Yup.string()
        .required("Number of persons is required.")
        .min(1, "Number of persons must be at least 1."),
    date: Yup.string()
        .required("Date is required.")


})

