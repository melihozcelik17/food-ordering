"use client"
import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import Link from "next/link";
import { useSelector } from 'react-redux'


//header burger menu css yapılacak...
//navbar siyah renk onları düzelt

const Header = () => {
    const [isSearchModal, setIsSearchModal] = useState(false)
    const [isMenuModal, setIsMenuModal] = useState(false)
    const cart = useSelector((state) => state.cart);


    const router = useRouter();


    return (
        <div
            className={`h-[5.5rem] z-50 relative ${router.asPath === "/" ? "bg-transparent" : "bg-secondary"
                }`}
        >
            <div className="container mx-auto text-white flex justify-between items-center h-full">
                <Logo />
                <nav className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden  ${isMenuModal === true && "!grid place-content-center"
                    }`}
                >
                    <ul className="flex gap-x-2 sm:flex-row flex-col  items-center justify-end">
                        <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
                            <Link href="/pages/menu">Menu</Link>
                        </li>
                        <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
                            <Link href="/pages/about">About</Link>
                        </li>
                        <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
                            <Link href="/pages/bookTable">Book Table</Link>
                        </li>
                    </ul>
                    {isMenuModal && (
                        <button className='absolute top-4 right-4 z-50' onClick={() => setIsMenuModal(false)}><MdCancel size={30} className='text-primary transition-all' /></button>
                    )}
                </nav>
                <div className="flex gap-x-4 items-center cursor-pointer">
                    <Link href="/auth/login">
                        <FaUserAlt className="hover:text-primary transition-all cursor-pointer" />
                    </Link>
                    <Link href="/pages/cart">
                        <span className="relative">
                            <FaShoppingCart className="hover:text-primary transition-all cursor-pointer" />
                            <span className="w-4 h-4 text-sm grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                                {cart.products.length === 0 ? "0" : cart.products.length}
                            </span>
                        </span>
                    </Link>
                    <button onClick={() => setIsSearchModal(true)} >
                        <FaSearch className="hover:text-primary transition-all cursor-pointer" />
                    </button >
                    <Link href="/" className="md:inline-block hidden cursor-pointer ">
                        <button className="btn-primary">Order Online</button>
                    </Link>
                    <button className="sm:hidden inline-block" onClick={() => setIsMenuModal(true)}><GiHamburgerMenu className="text-xl hover:text-primary transition-all " /></button>

                </div>
            </div>
            {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
        </div >
    );
};

export default Header;