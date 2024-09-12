"use client"

import Image from 'next/legacy/image'
import React from 'react'
import { IoHome, IoExitSharp } from "react-icons/io5";
import { RiLockPasswordFill, RiEBike2Fill } from "react-icons/ri";
import { useFormik } from 'formik';
import { profileSchema } from '@/schema/profile';
import { useState, useEffect } from "react";
import Account from '@/components/profile/Account';
import Password from '@/components/profile/Password';
import Order from '../order/page';
import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Profile = ({ user }) => {

    const [tabs, setTabs] = useState(0);
    const { push } = useRouter();
    const { data: session } = useSession();


    const handleSignOut = () => {
        if (confirm("Are you sure you want to sign out?")) {
            signOut({ redirect: false });
            push('/auth/login');
        }
    };

    useEffect(() => {
        if (!session) {
            push("/auth/login");
        }
    }, [session, push]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.user?.id}`);
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (session?.user?.id) {
            fetchUserData();
        }
    }, [session?.user?.id]);


    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        actions.resetForm()
    };


    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            job: '',
            bio: '',
        },
        onSubmit,
        validationSchema: profileSchema,
    });

    const inputs = [
        {
            id: 1,
            name: "fullName",
            type: "text",
            placeholder: "Your Full Name",
            value: values.fullName,
            errorMessage: errors.fullName,
            touched: touched.fullName,
        },
        {
            id: 2,
            name: "phoneNumber",
            type: "number",
            placeholder: "Your Phone Number",
            value: values.phoneNumber,
            errorMessage: errors.phoneNumber,
            touched: touched.phoneNumber,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Your Email Adress",
            value: values.email,
            errorMessage: errors.email,
            touched: touched.email,

        },
        {
            id: 4,
            name: "address",
            type: "text",
            placeholder: "Your Adress",
            value: values.address,
            errorMessage: errors.address,
            touched: touched.address,
        },
        {
            id: 5,
            name: "job",
            type: "text",
            placeholder: "Your Job",
            value: values.job,
            errorMessage: errors.job,
            touched: touched.job,
        },
        {
            id: 6,
            name: "bio",
            type: "text",
            placeholder: "Your Bio",
            value: values.bio,
            errorMessage: errors.bio,
            touched: touched.bio,
        },
    ]

    return (
        <div className='flex px-10 min-h-[calc(100vh-433px)] lg:flex-row flex-col lg:mb-0 mb-10'>
            <div className='lg:w-80 w-100 flex-shrink-0'>
                <div className='relative flex flex-col items-center px-10 py-5 border border-b-0'>
                    <div><Image src="/images/client2.jpg" alt='' width={100} height={100} className='rounded-full' /></div>
                    <b className='text-2xl mt-1'>{session?.user?.name || "User Name"}</b>
                </div>
                <ul className='text-center font-semibold '>
                    <li className={`flex justify-center border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 0 && "bg-primary text-white"} `} onClick={() => setTabs(0)}>
                        <IoHome />
                        <button className='ml-1'>Account</button></li>
                    <li className={`flex justify-center border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 1 && "bg-primary text-white"} `} onClick={() => setTabs(1)}>
                        <RiLockPasswordFill />
                        <button className='ml-1'>Password</button></li>
                    <li className={`flex justify-center border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 2 && "bg-primary text-white"} `} onClick={() => setTabs(2)}>
                        <RiEBike2Fill />
                        <button className='ml-1'>Orders</button></li>
                    <li className={`flex justify-center border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all  `} onClick={handleSignOut}>
                        <IoExitSharp />
                        <button className='ml-1'>Exit</button></li>
                </ul>
            </div>
            {tabs === 0 && <Account />}
            {tabs === 1 && <Password />}
            {tabs === 2 && <Order />}
        </div >
    )
};





export default Profile;
