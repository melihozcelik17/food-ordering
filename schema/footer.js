import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const footerSchema = Yup.object({
    location: Yup.string()
        .required("Location is required."),
    email: Yup.string()
        .required("Email is required.")
        .email("Invalid email."),
    phoneNumber: Yup.string()
        .required("Phone number is required.")
        .min(10, "Phone number must be at least 10 characters."),
    desc: Yup.string()
        .required("Desctiption is required."),
    day: Yup.string()
        .required("Day is required."),
    address: Yup.string()
        .required("Address is required."),
    time: Yup.string()
        .required("Time is required."),



})

