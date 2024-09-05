import React from 'react'
import Title from '../ui/Title'
import { IoLocationSharp, IoLogoFacebook, IoLogoTwitter, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";
import { IoIosPhonePortrait } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import Logo from '../ui/Logo';

const Footer = () => {
    return (
        <div className='bg-secondary text-white'>
            <div className='container mx-auto pt-16 pb-6'>
                <div className='flex md:justify-between justify-center text-center flex-wrap md:gap-y-0 gap-y-6'>

                    <div className='md:flex-1'>
                        <Title addClass="text-[30px] ">Contact Us</Title>
                        <div className='flex flex-col gap-y-2 mt-3 '>

                            <div className='flex items-center justify-center'>
                                <IoLocationSharp className="mr-2" />
                                <span>Location</span>
                            </div>
                            <div className='flex items-center justify-center'>
                                <IoIosPhonePortrait className="mr-2" />
                                <span>Call +90 555 000 0000</span>
                            </div>
                            <div className='flex items-center justify-center'>
                                <MdOutlineEmail className="mr-2" />
                                <span>Email: info@company.com</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1'>
                        <Title addClass="text-[30px] "> <Logo /></Title>
                        <div>
                            <p className=' mt-3 '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa recusandae deserunt ullam voluptate voluptates temporibus facere illo nulla aspernatur excepturi nam, omnis incidunt veritatis doloribus officia quasi commodi in. Deleniti.</p>

                            <div className='flex items-center justify-center mt-5 gap-x-2'>

                                <a href="" className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full "><IoLogoFacebook /></a>
                                <a href="" className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full "><IoLogoTwitter /></a>
                                <a href="" className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full "><IoLogoLinkedin /></a>
                                <a href="" className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full "><IoLogoInstagram /></a>
                            </div>


                        </div>
                    </div>
                    <div className='flex-1'>
                        <Title addClass="text-[30px] ">Opening Hours</Title>
                        <div>
                            <div className='flex flex-col gap-y-2 mt-3 '>
                                <span className='inline-block ml-2 '>EveryDay</span>
                            </div>
                            <div>
                                <span className='inline-block ml-2'>Sabah 10:00 - Gece 12:00 </span>
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