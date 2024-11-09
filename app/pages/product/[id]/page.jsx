"use client"
import { useState, useEffect } from 'react';
import Title from '@/components/ui/Title';
import Image from 'next/legacy/image';
import { addProduct } from '@/redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const ProductIndex = ({ params }) => {
    const [food, setFood] = useState(null);
    const [prices, setPrices] = useState([]);
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState(0);
    const [extraItems, setExtraItems] = useState([]);
    const [selectedExtra, setSelectedExtra] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`);
                setFood(res.data);
                setPrices(res.data.prices || [10, 20, 30]);
                setPrice(res.data.prices[0]);
                setExtraItems(res.data.extraOptions || []);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchData();
    }, [params.id]);

    const handleSize = (sizeIndex) => {
        const difference = prices[sizeIndex] - prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    };

    const changePrice = (number) => {
        setPrice(price + number);
    };

    const handleChange = (e, item) => {
        const checked = e.target.checked;
        if (checked) {
            changePrice(item.price);
            setSelectedExtra([...selectedExtra, item]);
        } else {
            changePrice(-item.price);
            setSelectedExtra(selectedExtra.filter((extra) => extra.id !== item.id));
        }
    };

    const handleClick = () => {
        dispatch(addProduct({ ...food, selectedExtra, price, quantity: 1 }));
    };

    if (!food) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap'>
            <div className='relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto'>
                <Image src={food?.image} alt={food?.name || "Food Image"} layout='fill' objectFit='contain' priority />
            </div>
            <div className='md:flex-1 md:text-start text-center'>
                <Title addClass="text-6xl">{food?.title}</Title>
                <span className='text-primary text-2xl font-bold underline-offset-1 inline-block my-4'> ${price} </span>
                <p className='text-sm my-4 md:pr-24'>{food?.desc}</p>
                <div>
                    <h4 className='text-xl font-bold'>Choose the size</h4>
                    <div className='flex gap-x-20 items-center md:justify-start justify-center'>
                        <div className='relative h-8 w-8 cursor-pointer' onClick={() => handleSize(0)}>
                            <Image src="/images/size.png" alt='Small' layout='fill' priority />
                            <span className='absolute top-0 -right-5 text-xs bg-primary rounded-full px[5px] font-medium'>Small</span>
                        </div>
                        <div className='relative h-12 w-12 cursor-pointer' onClick={() => handleSize(1)}>
                            <Image src="/images/size.png" alt='Medium' layout='fill' priority />
                            <span className='absolute top-0 -right-6 text-xs bg-primary rounded-full px[5px] font-medium'>Medium</span>
                        </div>
                        <div className='relative h-16 w-16 cursor-pointer' onClick={() => handleSize(2)}>
                            <Image src="/images/size.png" alt='Large' layout='fill' priority />
                            <span className='absolute top-0 -right-1 text-xs bg-primary rounded-full px[5px] font-medium'>Large</span>
                        </div>
                    </div>
                </div>
                <div className='flex gap-x-4 my-6 md:justify-start justify-center'>
                    {extraItems.length > 0 && extraItems.map((item) => (
                        <label className='flex items-center gap-x-1' key={item._id}>
                            <input type="checkbox" className='w-5 h-5 accent-primary' onChange={(e) => handleChange(e, item)} />
                            <span className='text-sm font-semibold'>{item.text}</span>
                        </label>
                    ))}
                </div>
                <button className='btn-primary mt-6' onClick={handleClick}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductIndex;
