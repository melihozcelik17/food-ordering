"use client"
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { addProduct } from '@/redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';


const MenuItem = ({ product }) => {
    const cart = useSelector((state) => state.cart)
    const findCart = cart.products.find((item) => item._id === product._id)
    const handleClick = () => {
        dispatch(addProduct({ ...product, extras: [{ text: "empty" }], price: product.price[0], quantity: 1 }))

    }
    return (
        <div className='bg-secondary rounded-3xl '>
            <div className='w-full bg-[#f1f2f3] h-[210px] grid place-content-center rounded-bl-[46px] rounded-tl-2xl rounded-tr-2xl'>
                <Link href={`/pages/product/${product._id}`}>

                    <div className='relative w-36 h-36 z-50 hover:scale-110 transition-all '>
                        <Image src={product.image} alt='' layout='fill' className='' priority></Image>
                    </div>
                </Link>
            </div>
            <div className='p-[25px] text-white'>
                <h4 className='text-xl font-semibold '> {product.title} </h4>
                <p className='text-[15px]  '>
                    {product.description} </p>
                <div className='flex justify-between items-center mt-4'>
                    <span>$ {product.prices[0]}</span>
                    <button className='btn-primary !w-10 !h-10 !rounded-full !p-0 grid place-content-center ' disabled={findCart}
                        onClick={handleClick}
                    ><FaShoppingCart size={20} /></button>
                </div>
            </div>
        </div>
    )
}

export default MenuItem