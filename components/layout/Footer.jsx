"use client"
import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import { IoLocationSharp, IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import Logo from '../ui/Logo';
import axios from 'axios';

const Footer = () => {
    const [footer, setFooter] = useState([])
    useEffect(() => {
        const getFooter = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/footer`)
                setFooter(res.data[0])
            } catch (err) {
                console.error(err);
            }
        }
        getFooter();
    }, [])


    return (
        <div className='bg-secondary text-white'>
            <div className='container mx-auto pt-16 pb-6'>
                <div className='flex md:justify-between justify-center text-center flex-wrap md:gap-y-0 gap-y-6'>

                    <div className='md:flex-1'>
                        <Title addClass="text-[30px] ">Contact Us</Title>
                        <div className='flex flex-col gap-y-2 mt-3 '>

                            <a href={footer?.location} target='_blank' rel='noreferrer' className='flex items-center justify-center'>
                                <IoLocationSharp className="mr-2" />
                                <span>Location</span>
                            </a>
                            <a href={`Tel:${footer?.phoneNumber}`} className='flex items-center justify-center'>
                                <IoIosPhonePortrait className="mr-2" />
                                <span>Call +90 {footer?.phoneNumber}</span>
                            </a>
                            <a href={`mailto:${footer?.email}`} className='flex items-center justify-center'>
                                <MdOutlineEmail className="mr-2" />
                                <span>Email: {footer?.email}</span>
                            </a>
                        </div>
                    </div>

                    <div className='flex-1'>
                        <Title addClass="text-[30px] "> <Logo /></Title>
                        <div>
                            <p className=' mt-3 '>{footer?.desc} </p>

                            <div className='flex items-center justify-center mt-5 gap-x-2'>

                                {footer?.socialMedia?.map((item) => (
                                    <a href={item?.link}
                                        className={item.icon}
                                        //  "w-8 h-8 grid place-content-center bg-white text-secondary rounded-full "
                                        key={item._id}
                                        target="_blank"
                                        rel="noreferrer"
                                    >

                                        {/* <IoLogoFacebook /> */}

                                    </a>
                                ))}

                            </div>


                        </div>
                    </div>
                    <div className='flex-1'>
                        <Title addClass="text-[30px] ">Opening Hours</Title>
                        <div>
                            <div className='flex flex-col gap-y-2 mt-3 '>
                                <span className='inline-block ml-2 '>{footer?.openingHours?.day}</span>
                            </div>
                            <div>
                                <span className='inline-block ml-2'> {footer?.openingHours?.hour} </span>
                            </div>

                        </div>
                    </div>
                </div>
                <p className='text-center mt-10'>
                    © 2024 All Rights Reserved By Melih Özçelik
                </p>
            </div>
        </div>
    )
}

export default Footer