"use client"
import React, { useEffect, useState } from 'react'
import Title from '../ui/Title'
import axios from 'axios';
import { useSession } from 'next-auth/react';


const Order = () => {
    const [orders, setOrders] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const { data: session } = useSession();

    const status = [
        "Preparing", " On The Way", " Delivered"
    ]
    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
                setOrders(res.data.filter((order) => order.customer === currentUser?.fullName));
            } catch (err) {
                console.error(err)

            }
        }
        getUsers();
    }, [currentUser])
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
                setCurrentUser(res.data.filter((user) => user.email === session.user.email)[0]);
            } catch (err) {
                console.error(err)

            }
        }
        getOrders();
    }, [session])
    return (
        <div className='lg:p-8 flex-1 lg:mt-0 mt-5 ' >
            <Title addClass="text-[40px]" >Orders </Title>

            <div className=' overflow-x-auto w-full mt-5'>
                <table className='w-full text-sm text-center text-gray-500 min-w-[1000px)] '>
                    <thead className='text-xs text-gray-400 uppercase bg-secondary'>
                        <tr>
                            <th scope='col' className='py-3 px-6'>ID</th>
                            <th scope='col' className='py-3 px-6' >ADDRESS</th>
                            <th scope='col' className='py-3 px-6'>DATE</th>
                            <th scope='col' className='py-3 px-6'>TOTAL</th>
                            <th scope='col' className='py-3 px-6'>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr className='transition-all bg-secondary border-gray-700 hover:bg-primary ' key={order?._id} >
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center' >

                                    <span>
                                        16515615616536
                                    </span>
                                </td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white' >
                                    <span>
                                        Çanakkale
                                    </span>
                                </td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white' >01/09/2024</td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white' >$20</td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>preparing</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Order