"use client"
import Title from '@/components/ui/Title';
import { reset } from '@/redux/cartSlice';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';


const Cart = () => {
    const { data: session } = useSession();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const user = users?.find((user) => user.email === session?.user?.email);
    const router = useRouter()

    const NewOrder = {
        customer: user?.fullName,
        address: user?.address ? user?.address : "No address",
        total: cart.total,
        method: 0,
    }
    const createOrder = async () => {
        try {
            if (session) {
                if (confirm("Are you sure to order?")) {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, NewOrder);
                    if (res.status === 201) {
                        router.push(`/order/${res.data._id}`);
                        dispatch(reset());
                        toast.success("Order created successfully", { autoClose: 1000 });
                    }
                }
            }
        } catch (err) {
            console.error("Error creating order:", err.response?.data || err.message);
            toast.error("Please login first!");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
                setUsers(categoryRes.data || []);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchData();
    }, []);



    return (
        <div className='min-h-[calc(100vh_-_433px)] '>
            <div className='flex justify-between items-center md:flex-row  flex-col '>
                <div className='md:min-h-[calc(100vh_-_433px)]  flex items-center flex-1 p-10 overflow-x-auto'>
                    <table className='w-full text-sm text-center text-gray-500 min-w-[1000px)] '>
                        <thead className='text-xs text-gray-400 uppercase bg-secondary'>
                            <tr>
                                <th scope='col' className='py-3 px-6'>PRODUCT</th>
                                <th scope='col' className='py-3 px-6' >EXTRAS</th>
                                <th scope='col' className='py-3 px-6'>PRİCE</th>
                                <th scope='col' className='py-3 px-6'>QUANTİTY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products.map((product, index) => (
                                <tr className='transition-all bg-secondary border-gray-700 hover:bg-primary ' key={index}>
                                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center' >
                                        <Image src={product.img} alt=''
                                            width={40} height={40}></Image>
                                        <span>
                                            {product.name}
                                        </span>
                                    </td>
                                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white' >

                                        {product.selectedExtra.map((item) => (
                                            <span key={item.id}>{item.text}, </span>
                                        ))}

                                    </td>
                                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white' >$ {product.price} </td>
                                    <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white' >{product.quantity}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div className='bg-secondary min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-white p-12 md:w-auto w-full md:text-start !text-center'>
                    <Title addClass="text-[40px]  ">Cart Total</Title>

                    <div className='mt-6'>
                        <b>Subtotal:</b> ${cart.total} <br />
                        <b className='inline-block my-1'>Discount:</b> $0.00 <br />
                        <b>Total:</b> ${cart.total}
                    </div>
                    <button className='btn-primary mt-4 md:w-auto w-52 ' onClick={createOrder}>Checkout Now!</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;