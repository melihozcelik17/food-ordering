"use client"
import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Title from './Title';
import Image from 'next/image';
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import Input from '../form/Input';
import { useRouter } from 'next/navigation';
import PacmanLoader from "react-spinners/PacmanLoader";

const Search = ({ setIsSearchModal }) => {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
                setProducts(res.data)
                setFiltered(res.data.slice(0, 5))

            } catch (err) {
                console.log(err);

            }
        }
        getProducts();
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)
        const searchFilter = products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase())).slice(0, 5)
        setFiltered(searchFilter);

    };

    return (
        <div className='fixed w-screen h-screen z-50 top-0 left-0 after:content-[""] after:w-screen after:h-screen after:bg-white after:opacity-50 after:absolute after:top-0 after:left-0 grid place-content-center '>
            <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
                <div className='w-full h-full grid place-content-center '>
                    <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
                        <Title addClass="text-[40px] text-center">Search</Title>
                        <Input type='text' placeholder='Search...' onChange={handleSearch} ></Input>
                        <div>
                            {products.length > 0 ? <ul className='mt-4'>
                                {filtered.length > 0 ? filtered.map((product) => (
                                    <li className='flex items-center justify-between p-1 hover:bg-primary transition-all px-2 cursor-pointer' key={product._id}
                                        onClick={() => {
                                            router.push(`/pages/product/${product?._id}`)
                                            setIsSearchModal(false)
                                        }}>
                                        <div className='relative flex'>
                                            <Image src={product?.image} alt={product?.title} width={48} height={48} />
                                        </div>
                                        <span className='font-bold'>{product?.title}</span>
                                        <span className='font-bold'>${product?.prices[0]}</span>
                                    </li>
                                )) : <p className='text-center font-semibold'> No results found!</p>}

                            </ul>
                                : <div className='flex justify-center items-center mt-5'>
                                    <PacmanLoader color='#fca311' />
                                </div>
                            }
                            <button className='absolute top-4 right-4' onClick={() => setIsSearchModal(false)}><MdCancel size={30} className='text-primary transition-all' /></button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default Search;
