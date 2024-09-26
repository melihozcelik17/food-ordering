"use client"

import Image from 'next/legacy/image'
import React from 'react'
import { IoFastFoodSharp, IoExitSharp } from "react-icons/io5";
import { RiEBike2Fill } from "react-icons/ri";
import { useFormik } from 'formik';
import { profileSchema } from '@/schema/profile';
import { useState, useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import Products from '@/components/admin/Products';
import Order from '@/components/admin/Order';
import Category from '@/components/admin/Category';
import Footer from '@/components/admin/Footer';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import AddProduct from '@/components/admin/AddProduct';

const Profile = () => {
    const [tabs, setTabs] = useState(0);
    const { push } = useRouter();
    const [isProductModal, setIsProductModal] = useState(false);


    // useEffect(() => {
    //     const checkAuthorization = async () => {
    //         try {
    //             const response = await axios.get('/api/check-token', {
    //                 headers: {
    //                     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             });
    //             if (response.status === 200) {
    //                 setIsAuthorized(true);
    //             } else {
    //                 setIsAuthorized(false);
    //                 push('/admin');
    //             }
    //         } catch (error) {
    //             setIsAuthorized(false);
    //             push('/admin');
    //         }
    //     };

    //     checkAuthorization();
    // }, [push]);



    const closeAdminAccount = async () => {
        try {
            if (confirm("Are you sure you want to close your Admin account?")) {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`)
                if (
                    res.status === 200
                ) {
                    push('/api/admin')
                    toast.success('Admin account closed successfully')

                }
            }

        } catch (err) {
            console.log(err);

        }
    }


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
                    <div><Image src="/images/admin.png" alt='' width={100} height={100} className='rounded-full' /></div>
                    <b className='text-2xl mt-1'>Admin</b>
                </div>
                <ul className='text-center font-semibold '>
                    <li className={`flex justify-center border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 0 && "bg-primary text-white"} `} onClick={() => setTabs(0)}>
                        <IoFastFoodSharp />
                        <button className='ml-1'>Products</button></li>
                    <li className={`flex justify-center border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 1 && "bg-primary text-white"} `} onClick={() => setTabs(1)}>
                        <RiEBike2Fill />
                        <button className='ml-1'>Orders</button></li>
                    <li className={`flex justify-center border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 2 && "bg-primary text-white"} `} onClick={() => setTabs(2)}>
                        <BiCategory />
                        <button className='ml-1'>Categories</button></li>
                    <li className={`flex justify-center border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 3 && "bg-primary text-white"} `} onClick={() => setTabs(3)}>
                        <IoExitSharp />
                        <button className='ml-1'>Footer</button></li>
                    <li className={`flex justify-center border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${tabs === 4 && "bg-primary text-white"} `} onClick={closeAdminAccount} >
                        <IoExitSharp />
                        <button className='ml-1'>Exit</button></li>
                </ul>
            </div>
            {tabs === 0 && <Products />}
            {tabs === 1 && <Order />}
            {tabs === 2 && <Category />}
            {tabs === 3 && <Footer />}
            {isProductModal && <AddProduct setIsProductModal={setIsProductModal} />}
            <button className='btn-primary !w-10 !h-10 !p-0 absolute bottom-14 right-10 text-4xl ' onClick={() => setIsProductModal(true)}>
                +
            </button>

        </div >
    )
}



export default Profile
