"use client"
import React, { useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { MdCancel } from "react-icons/md";
import Title from '../ui/Title';
import Image from 'next/legacy/image';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = ({ setIsProductModal }) => {
    const [file, setFile] = useState();
    const [srcImage, setSrcImage] = useState();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState([]);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [extra, setExtra] = useState("");
    const [extraOptions, setExtraOptions] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleExtra = (e) => {
        if (extra) {
            if (extra.text && extra.price) {
                setExtraOptions([...extraOptions, extra]);
                setExtra("");
            }

        }
    }

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                setCategories(res.data);

            } catch (err) {
                console.log(err);
            }
        }
        getProducts();

    }, [])

    const changePrice = (e, index) => {
        const currentPrices = price;
        currentPrices[index] = e.target.value;
        setPrice(currentPrices);



    }


    const handleOnChange = (changeEvent) => {
        const selectedFile = changeEvent.target.files[0];
        if (!selectedFile) {
            console.error('No file selected');
            return; // Exit early if no file is selected
        }

        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setSrcImage(onLoadEvent.target.result);
            setFile(selectedFile); // Correctly assign the selected file
        };

        reader.readAsDataURL(selectedFile);
    };

    const handleOnCrate = async () => {
        if (!file) {
            console.error("No file selected");
            return; // Prevent upload if no file is selected
        }

        const data = new FormData();
        data.append('file', file);
        data.append("upload_preset", "food-ordering");

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/due2uz7up/image/upload', data);
            const { url } = response.data;
            const newProduct = {
                image: url,
                title,
                description,
                category: category.toLowerCase(),
                price,
                extraOptions,
            };
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
                newProduct

            );


            if (response.status === 200) {
                setIsProductModal(false)
                toast.success("Product created successfully");

            } else {
                console.log('File upload failed:', response);
            }
        } catch (err) {
            console.error('Error during file upload:', err);
        }
    };
    return (
        <div className='fixed w-screen h-screen z-50 top-0 left-0 after:content-[""] after:w-screen after:h-screen after:bg-white after:opacity-50 after:absolute after:top-0 after:left-0 grid place-content-center '>
            <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
                <div className='w-full h-full grid place-content-center '>
                    <div className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl">
                        <Title addClass="text-[40px] text-center">Add a New Product</Title>

                        <div className='flex flex-col text-sm mt-6'>
                            <span className=' font-semibold mb-1'></span>
                            <label className='flex gap-2 items-center' >

                                <input type='file' onChange={(e) => handleOnChange(e)} className='hidden' />
                                <button className='btn-primary !rounded-none !bg-blue-600 pointer-events-none' > Choose an image</button>
                                {srcImage && (
                                    //  eslint-disable-next-line react/jsx-no-undef  
                                    <Image src={srcImage} alt="" className=' ' width={150} height={150}  ></Image>
                                )}
                            </label>
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className=' font-semibold mb-[2px]'>Title</span>
                            <input type='text' className='border-2 p-1 text-sm px-2 outline-none' placeholder='Write a title...' onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className=' font-semibold mb-[2px]'>Description</span>
                            <textarea className='border-2 p-1 text-sm px-1 outline-none' placeholder='Write a description...' onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className='flex flex-col text-sm mt-4'>
                            <span className=' font-semibold mb-[2px]'>Select Category</span>
                            <select className='border-2 p-1 text-sm px-1 outline-none' onChange={(e) => setCategory(e.target.value)}>
                                {categories.length > 0 &&
                                    categories.map((category) => (
                                        <option key={category._id} value={category.title.toLowerCase()}>{category.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {category === "pizza" ? (
                            <div className='flex flex-col text-sm mt-4 w-full'>
                                <span className='font-semibold mb-[2px]'>Prices</span>
                                <div className='flex gap-6 justify-between w-full'>
                                    <input type='number' className='border-b-2 p-1 pl-0 text-sm px-2 outline-none w-24' placeholder='Small'
                                        onChange={(e) => changePrice(e, 0)} />
                                    <input type='number' className='border-b-2 p-1 pl-0 text-sm px-2 outline-none w-24' placeholder='Medium'
                                        onChange={(e) => changePrice(e, 1)} />
                                    <input type='number' className='border-b-2 p-1 pl-0 text-sm px-2 outline-none w-24' placeholder='Large'
                                        onChange={(e) => changePrice(e, 2)} />
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col text-sm mt-4 w-full'>
                                <span className='font-semibold mb-[2px]'>Prices</span>
                                <div className='flex gap-6 justify-between w-full'>
                                    <input type='number' className='border-b-2 p-1 pl-0 text-sm px-2 outline-none w-24' placeholder='Price'
                                        onChange={(e) => changePrice(e, 0)} />
                                </div>
                            </div>
                        )}

                        <div className='flex flex-col text-sm mt-4 w-full'>
                            <span className='font-semibold mb-[2px]'>Extra</span>
                            <div className='flex gap-6 justify-between w-full'>
                                <input type='text' className='border-b-2 p-1 pl-0 text-sm px-2 outline-none w-36' placeholder='Extra Option 1'
                                    name='text' onChange={(e) => setExtra({
                                        ...extra, [e.target.name]: e.target.value
                                    })} />
                                <input type='number' className='border-b-2 p-1 pl-0 text-sm px-2 outline-none w-36' placeholder='Price' name='price' onChange={(e) => setExtra({ ...extra, [e.target.name]: e.target.value })} />
                                <button className="btn-primary ml-auto" onClick={handleExtra}>Add</button>
                            </div>
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {extraOptions.map((item, index) => (
                                    <span
                                        className='inline-block border border-orange-500 text-orange-500 p-1 rounded-xl text-xs'
                                        key={index}
                                        onClick={() => setExtraOptions(extraOptions.filter((_, i) => i !== index))}
                                    >
                                        {item.text}
                                    </span>
                                ))}

                            </div>
                        </div>

                        <div className='flex justify-end mt-6'>
                            <button className="btn-primary bg-success" onClick={handleOnCrate}>Create</button>
                        </div>
                        <button className='absolute top-4 right-4' onClick={() => setIsProductModal(false)}>
                            <MdCancel size={30} className='text-primary transition-all' />
                        </button>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default AddProduct;
