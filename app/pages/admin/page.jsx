"use client";
import Input from '@/components/form/Input';
import Title from '@/components/ui/Title';
import React from 'react'
import { useFormik } from 'formik';
import { adminSchema } from '@/schema/admin';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();

    const onSubmit = async (values, actions) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, values);
            if (res.status === 200) {
                actions.resetForm();
                toast.success("Admin Login successful");
                await router.push("/pages/admin/profile");
            }
        } catch (err) {
            console.error(err);
            toast.error("Admin Login failed");
        }
    };

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        onSubmit,
        validationSchema: adminSchema,
    });

    const inputs = [
        {
            id: 1,
            name: "userName",
            type: "text",
            placeholder: "Your Username",
            value: values.userName,
            errorMessage: errors.userName,
            touched: touched.userName,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Your Password",
            value: values.password,
            errorMessage: errors.password,
            touched: touched.password,
        },
    ];

    return (
        <div className='container mx-auto py-3'>
            <form className='flex flex-col items-center my-20 md:w-1/2 w-full mx-auto' onSubmit={handleSubmit}>
                <Title addClass="text-[40px] mb-6">Admin Login</Title>
                <div className='flex flex-col gap-y-2 w-full'>
                    {inputs.map((input) => (
                        <Input
                            key={input.id}
                            {...input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    ))}
                    <div className='flex flex-col w-full gap-y-3 mt-6'>
                        <button className='btn-primary' type='submit'>LOGIN</button>
                        <Link href="/" className='text-sm underline cursor-pointer text-secondary'>
                            Home Page
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;
