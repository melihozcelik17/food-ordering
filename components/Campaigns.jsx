import Image from 'next/image'
import React from 'react'

import { FaShoppingCart } from "react-icons/fa";
import Title from './ui/Title';

const CampaignsItem = () => {
    return (

        <div className='bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4'>
            <div className='relative md:w-44 md:h-44 w-36 h-36 after:content-[""]  border-primary border-[5px] rounded-full owerflow-hidden '>
                <Image src="/images/o1.jpg" alt='' layout='fill' objectFit='cover ' className='hover:scale-105 transition-all duration-200 rounded-full '>
                </Image>
            </div>
            <div className='text-white '>
                <Title addClass="text-2xl">Tasty Thursdays</Title>
                <div className='font-dancing'>
                    <span className='text-[40px] '>%20</span>
                    <span className='text-sm inline-block ml-1 '>Off</span>
                </div>
                <button className='btn-primary flex items-center gap-x-2 '>Order Now <FaShoppingCart size={20} /> </button>
            </div>
        </div>
    )
}

const Campaigns = () => {
    return (
        <div className='flex justify-between container mx-auto py-20 gap-6 flex-wrap'>
            <CampaignsItem />
            <CampaignsItem />
        </div>
    )
}

export default Campaigns