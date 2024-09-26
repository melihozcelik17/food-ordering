"use client";
import { useEffect, useState } from "react";
import HomeIndex from "./pages/home/page";
import axios from "axios";

export default function HomePage() {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        const productRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);


        setCategoryList(categoryRes.data || []);
        setProductList(productRes.data || []);
      } catch (err) {
        console.error("Veri alınırken hata oluştu", err);
      }
    };

    fetchData();
  }, []);


  return (
    <main>
      <HomeIndex categoryList={categoryList} productList={productList} />
    </main>
  );
}
