"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Title from '../ui/Title'
import Input from '../form/Input'
import axios from 'axios'

const Category = () => {

    const [categories, setCategories] = useState([]);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
                setCategories(res?.data);
            } catch (err) {
                console.error(err);
            }
        }

        getCategories()
    }, [])

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
                title: inputText
            });
            setCategories([...categories, res.data]);
            setInputText("");
        } catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            if (
                window.confirm("Are you sure you want to delete this category?")
            ) {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`);
                setCategories((prevCategories) => prevCategories.filter((cat) => cat._id !== id));
            }


        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='lg:p-8 flex-1 lg:mt-0 mt-5 '>
            <Title addClass="text-[40px]">Categories</Title>
            <div className='mt-5  '>
                <div className='flex gap-4 flex-1 items-center'>
                    <Input
                        placeholder="Add a new Category..."
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                    />

                    <button
                        className="btn-primary"
                        onClick={handleCreate}
                    >
                        Add
                    </button>
                </div>
                <div className='mt-10 max-h-[250px] overflow-auto p-4'>
                    {categories.map((category) => (
                        <div className='flex justify-between mt-4' key={category._id}>
                            <b className='text-xl'>{category.title}</b>
                            <button
                                className="btn-primary !bg-danger"
                                onClick={(e) => handleDelete(e, category._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Category;
