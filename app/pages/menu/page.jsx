"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import MenuWrapper from '@/components/product/MenuWrapper'
import axios from 'axios'

const Page = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                const productRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
                setCategoryList(categoryRes.data || []);
                setProductList(productRes.data || []);

            } catch (err) {
                console.error("Failed to categories", err);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='pt-10'>
            <MenuWrapper categoryList={categoryList} productList={productList} />
        </div>
    )
}

export default Page;