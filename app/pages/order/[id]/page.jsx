"use client";
import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios'u içe aktarıyoruz
import { useRouter } from 'next/navigation';

const Order = () => {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const status = order?.status
    const statusClass = (index) => {
        if (index - status < 1) return "";
        if (index - status === 1) return "Animate-pulse";
        if (index - status > 1) return "";

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`);
                setOrder(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching order:", err);
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;

    if (!order) return <p>Order not found.</p>;

    return (
        <div className='overflow-x-auto'>
            <div className='min-h-[calc(100vh_-_433px)] flex justify-center items-center flex-col p-10 min-w-[1000px]'>
                <div className='flex items-center flex-1 w-full max-h-28'>
                    <table className='w-full text-sm text-center text-gray-500'>
                        <thead className='text-xs text-gray-400 uppercase bg-gray-700'>
                            <tr>
                                <th scope='col' className='py-3 px-6'>ORDER ID</th>
                                <th scope='col' className='py-3 px-6'>CUSTOMER</th>
                                <th scope='col' className='py-3 px-6'>ADDRESS</th>
                                <th scope='col' className='py-3 px-6'>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='transition-all bg-secondary border-gray-700 hover:bg-primary'>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center'>
                                    <span>{order?._id.substring(0, 5)}...</span>
                                </td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                    {order?.customer}
                                </td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                    {order?.address}
                                </td>
                                <td className='py-4 px-6 font-medium whitespace-nowrap hover:text-white'>
                                    ${order?.total}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-between w-full p-10 bg-primary mt-7'>
                    <div className={`relative flex flex-col ${statusClass(0)}`}>
                        <Image src="/images/paid.png" alt='Payment' width={40} height={40} objectFit='contain' />
                        <span>Payment</span>
                    </div>
                    <div className={`relative flex flex-col ${statusClass(1)}`}>
                        <Image src="/images/bake.png" alt='Preparing' width={40} height={40} objectFit='contain' />
                        <span>Preparing</span>
                    </div>
                    <div className={`relative flex flex-col ${statusClass(2)}`}>
                        <Image src="/images/bike.png" alt='On the way' width={40} height={40} objectFit='contain' />
                        <span>On the way</span>
                    </div>
                    <div className={`relative flex flex-col ${statusClass(3)}`}>
                        <Image src="/images/delivered.png" alt='Delivered' width={40} height={40} objectFit='contain' />
                        <span>Delivered</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
