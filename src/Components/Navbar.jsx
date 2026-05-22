import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/foodgpt.png'
import Hero from './Hero'
import Body from './Body'
import Footer from './Footer'
import Form from './Form'

const Navbar = () => {

    const [user, setuser] = useState("")
    const [openMenu, setOpenMenu] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)

    const menuRef = useRef()

    // Get Token + Auto Logout After 1 Hour
    const gettoken = () => {

        console.log("token", localStorage.getItem("token"))

        let name = localStorage.getItem("name")

        const ONE_HOUR = 60 * 60 * 1000

        const currentTime = Date.now()

        const loginTime = localStorage.getItem("loginTime")

        const timePassed = currentTime - Number(loginTime)

        // If session already expired
        if (timePassed > ONE_HOUR) {

            localStorage.clear()

            window.location.href = "/"

        } else {

            // Remaining time before logout
            const remainingTime = ONE_HOUR - timePassed

            setTimeout(() => {

                localStorage.clear()

                window.location.href = "/"

            }, remainingTime)

        }

        setuser(name || "")

    }

    // Close dropdown when clicking outside
    useEffect(() => {

        const handler = (e) => {

            if (menuRef.current && !menuRef.current.contains(e.target)) {

                setOpenMenu(false)

            }

        }

        document.addEventListener("mousedown", handler)

        return () => {

            document.removeEventListener("mousedown", handler)

        }

    }, [])

    // Load token
    useEffect(() => {

        if (!localStorage.getItem("token")) {

            console.log("User not logged in")

        } else {

            gettoken()

        }

    }, [])

    // Logout Function
    const handleLogout = () => {

        localStorage.clear()

        setuser("")

        window.location.href = "/"

    }

    return (

        <div className='top-0 left-0 w-full overflow-hidden'>

            {/* Navbar */}
            <div className='w-full px-2 sm:px-4 md:px-6 pt-3'>

                <div className='max-w-full mx-auto bg-white backdrop-blur-md shadow-lg rounded-2xl'>

                    <div className='flex items-center justify-between px-4 py-3'>

                        {/* Logo */}
                        <div className='flex items-center'>

                            <img
                                className='h-14 sm:h-16 md:h-20 w-auto'
                                src={logo}
                                alt="logo"
                            />

                        </div>

                        {/* Desktop Menu */}
                        <ul className='hidden md:flex gap-4 lg:gap-6 font-semibold text-lg items-center'>

                            <a href="/">
                                <li className='font-serif px-4 py-2 rounded-2xl text-orange-400 hover:bg-sky-800 hover:text-yellow-300 transition-all duration-300 hover:scale-105'>
                                    Home
                                </li>
                            </a>

                            <a href="#recipes">
                                <li className='font-serif px-4 py-2 rounded-2xl text-orange-400 hover:bg-sky-800 hover:text-yellow-300 transition-all duration-300 hover:scale-105'>
                                    Recipe
                                </li>
                            </a>

                            <a href="#form">
                                <li className='font-serif px-4 py-2 rounded-2xl text-orange-400 hover:bg-sky-800 hover:text-yellow-300 transition-all duration-300 hover:scale-105'>
                                    Add Food
                                </li>
                            </a>

                            {
                                user.length === 0 ? (

                                    <a href="/signin">

                                        <li className='font-serif px-4 py-2 rounded-2xl text-orange-400 hover:bg-sky-800 hover:text-yellow-300 transition-all duration-300 hover:scale-105'>
                                            Sign IN
                                        </li>

                                    </a>

                                ) : (

                                    <li className='relative list-none' ref={menuRef}>

                                        <button
                                            onClick={() => setOpenMenu(!openMenu)}
                                            className='font-serif px-4 py-2 rounded-2xl text-green-600 bg-green-100 hover:scale-105 transition-all duration-300'
                                        >
                                            {user}
                                        </button>

                                        {
                                            openMenu && (

                                                <div className='absolute right-0 mt-3 w-44 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50'>

                                                    <a href="/profile">

                                                        <div className='px-5 py-3 hover:bg-orange-100 cursor-pointer text-gray-700 font-semibold'>
                                                            Profile
                                                        </div>

                                                    </a>

                                                    <div
                                                        onClick={handleLogout}
                                                        className='px-5 py-3 hover:bg-red-100 cursor-pointer text-red-600 font-semibold'
                                                    >
                                                        Logout
                                                    </div>

                                                </div>

                                            )
                                        }

                                    </li>

                                )
                            }

                        </ul>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className='md:hidden flex flex-col gap-1'
                        >

                            <span className='w-7 h-1 bg-orange-500 rounded'></span>
                            <span className='w-7 h-1 bg-orange-500 rounded'></span>
                            <span className='w-7 h-1 bg-orange-500 rounded'></span>

                        </button>

                    </div>

                    {/* Mobile Menu */}
                    {
                        mobileMenu && (

                            <div className='md:hidden px-4 pb-4'>

                                <ul className='flex flex-col gap-3 font-semibold text-lg'>

                                    <a href="/">
                                        <li className='font-serif p-3 rounded-xl text-orange-400 hover:bg-sky-800 hover:text-yellow-300 transition-all duration-300'>
                                            Home
                                        </li>
                                    </a>

                                    <a href="#recipes">
                                        <li className='font-serif p-3 rounded-xl text-orange-400 hover:bg-sky-800 hover:text-yellow-300 transition-all duration-300'>
                                            Recipe
                                        </li>
                                    </a>

                                    <a href="#form">
                                        <li className='font-serif p-3 rounded-xl text-orange-400 hover:bg-sky-800 hover:text-yellow-300 transition-all duration-300'>
                                            Add Food
                                        </li>
                                    </a>

                                    {
                                        user.length === 0 ? (

                                            <a href="/signin">

                                                <li className='font-serif p-3 rounded-xl text-orange-400 hover:bg-sky-800 hover:text-yellow-300 transition-all duration-300'>
                                                    Sign IN
                                                </li>

                                            </a>

                                        ) : (

                                            <>

                                                <a href="/profile">

                                                    <li className='font-serif p-3 rounded-xl text-green-600 bg-green-100'>
                                                        {user}
                                                    </li>

                                                </a>

                                                <li
                                                    onClick={handleLogout}
                                                    className='font-serif p-3 rounded-xl text-red-600 bg-red-100 cursor-pointer'
                                                >
                                                    Logout
                                                </li>

                                            </>

                                        )
                                    }

                                </ul>

                            </div>

                        )
                    }

                </div>

            </div>

            {/* Hero Section */}
            <Hero />

            {/* Body */}
            <Body />

            {/* Form Section */}
            {
                user.length === 0 ? (

                    <div
                        id='form'
                        className='flex justify-center items-center min-h-[300px] px-4 py-10'
                    >

                        <div className='bg-white shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-md text-center border border-orange-200'>

                            <h2 className='text-2xl sm:text-3xl font-bold text-[#800000] mb-4'>
                                Login Required
                            </h2>

                            <p className='text-gray-600 text-base sm:text-lg mb-6 leading-7 sm:leading-8'>
                                Please login to add some delicious new food recipes 🍲
                            </p>

                            <a href="/signin">

                                <button
                                    className='bg-[#800000] text-white px-6 sm:px-8 py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-[#5c0000] transition-all duration-300 hover:scale-105'
                                >
                                    Sign In
                                </button>

                            </a>

                        </div>

                    </div>

                ) : (

                    <Form />

                )
            }

            {/* Footer */}
            <Footer />

        </div>

    )
}

export default Navbar