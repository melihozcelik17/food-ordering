import Image from "next/legacy/image";
import React from 'react'

const CustomersItem = ({ imgSrc }) => {
    return (
        <div className='mt-5 mx-4'>
            <div className='p-6 bg-secondary text-white rounded-[5px] '>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam similique eius qui perferendis neque sapiente hic unde alias deleniti, error, recusandae id nam eveniet voluptas iusto! Doloremque dolor deleniti consequuntur.</p>
                <div className='flex flex-col mt-4'>
                    <span className='text-lg font-semibold'>Mertcan Kılıç</span>
                    <span className='text-[15px] '>maqna alique</span>
                </div>
            </div>

            <div></div>
            <div className='relative w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[""] before:absolute before:top-0 flex justify-center before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5'>
                <Image src={imgSrc} alt='' layout='fill' objectFit="contain" className="rounded-full" />
            </div>

        </div>
    )
}

export default CustomersItem