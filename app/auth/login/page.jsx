"use client"
import Input from '@/components/form/Input';
import Title from '@/components/ui/Title';
import React from 'react';
import { useFormik } from 'formik';
import { loginSchema } from '@/schema/login';
import { IoLogoGithub } from "react-icons/io5";
import Link from 'next/link';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState, useEffect } from "react";

const Login = () => {
    const { data: session } = useSession();
    const { push } = useRouter();
    const [currentUser, setCurrentUser] = useState();


    const onSubmit = async (values, actions) => {
        const { email, password } = values;
        let options = { redirect: false, email, password };

        try {
            const res = await signIn("credentials", options);
            if (res.ok) {
                actions.resetForm();
                push("/pages/profile");
            } else {
                console.error("Login failed");
            }
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        const getUser = async () => {
            if (!session?.user?.email) return; // Eğer oturum bilgisi yoksa veya oturum email bilgisi yoksa işlemi sonlandır
            try {
                // API'den kullanıcı bilgilerini alıyoruz
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
                const foundUser = res.data?.find((user) => user.email === session.user.email);

                // Eğer kullanıcı bulunduysa, currentUser'ı ayarla
                if (foundUser) {
                    setCurrentUser(foundUser);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        getUser();
    }, [session]);


    useEffect(() => {
        if (session && currentUser) {
            push(`/pages/profile/${currentUser.id}`); // currentUser mevcut olduğunda id ile yönlendirme yap
        }
    }, [session, push, currentUser]);


    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
        validationSchema: loginSchema,
    });

    // Inputlar
    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Your Email Address",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,
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
        <div className="container mx-auto">
            <form
                className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
                onSubmit={handleSubmit}
            >
                <Title addClass="text-[40px] mb-6">Login</Title>
                <div className="flex flex-col gap-y-3 w-full">
                    {inputs.map((input) => (
                        <Input
                            key={input.id}
                            {...input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    ))}
                </div>
                <div className="flex flex-col w-full gap-y-3 mt-6">
                    <button className="btn-primary" type="submit">
                        LOGIN
                    </button>
                    <button
                        className="btn-primary !bg-secondary"
                        type="button"
                        onClick={() => signIn("github")}
                    >
                        <IoLogoGithub className="mr-2 text-lg" />
                        GITHUB
                    </button>
                    <Link href="/auth/register">
                        <span className="text-sm underline cursor-pointer text-secondary">
                            Do you not have an account?
                        </span>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;

