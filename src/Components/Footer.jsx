import React from 'react'
import logo from '../assets/foodgpt.png'
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa'

const Footer = () => {

    return (

        <footer className='bg-[#1f2937] text-white mt-10 overflow-hidden'>

            {/* Top Footer */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>

                {/* Logo + About */}
                <div className='text-center sm:text-left'>

                    <div className='flex items-center justify-center sm:justify-start gap-3 mb-5'>

                        <img
                            src={logo}
                            alt="FoodGPT"
                            className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1'
                        />

                        <h1 className='text-2xl sm:text-3xl font-extrabold text-amber-400'>
                            FoodGPT
                        </h1>

                    </div>

                    <p className='text-gray-300 leading-7 text-sm sm:text-base'>
                        Discover delicious recipes from different categories
                        like Chicken, Fish, Mutton, Rice, and Bengali Sweets 🍲
                    </p>

                </div>

                {/* Quick Links */}
                <div className='text-center sm:text-left'>

                    <h2 className='text-xl sm:text-2xl font-bold mb-5 text-amber-400'>
                        Quick Links
                    </h2>

                    <ul className='space-y-3 text-gray-300 text-sm sm:text-base'>

                        <li>

                            <a
                                href="/"
                                className='hover:text-amber-400 transition duration-300'
                            >
                                Home
                            </a>

                        </li>

                        <li>

                            <a
                                href="#recipes"
                                className='hover:text-amber-400 transition duration-300'
                            >
                                Recipes
                            </a>

                        </li>

                        <li>

                            <a
                                href="#form"
                                className='hover:text-amber-400 transition duration-300'
                            >
                                Add Food
                            </a>

                        </li>

                        <li>

                            <a
                                href="/signin"
                                className='hover:text-amber-400 transition duration-300'
                            >
                                Sign In
                            </a>

                        </li>

                    </ul>

                </div>

                {/* Categories */}
                <div className='text-center sm:text-left'>

                    <h2 className='text-xl sm:text-2xl font-bold mb-5 text-amber-400'>
                        Categories
                    </h2>

                    <ul className='space-y-5 text-gray-300 text-sm sm:text-base'>

                        <a href="/chicken"><li className='hover:text-amber-400 cursor-pointer transition duration-300'>
                            Chicken Recipes
                        </li></a>

                        <a href="/fish"><li className='hover:text-amber-400 cursor-pointer transition duration-300'>
                            Fish Recipes
                        </li></a>

                        <a href="/mutton"><li className='hover:text-amber-400 cursor-pointer transition duration-300'>
                            Mutton Recipes
                        </li></a>

                        <a href="/sweet"><li className='hover:text-amber-400 cursor-pointer transition duration-300'>
                            Bengali Sweets
                        </li></a>

                    </ul>

                </div>

                {/* Contact */}
                <div className='text-center sm:text-left'>

                    <h2 className='text-xl sm:text-2xl font-bold mb-5 text-amber-400'>
                        Contact
                    </h2>

                    <div className='space-y-4 text-gray-300 text-sm sm:text-base'>

                        <p>
                            📍 Memari, West Bengal
                        </p>

                        <p className='break-all'>
                            📧 sougatas593@gmail.com
                        </p>

                        <p>
                            📞 +91 9832885482
                        </p>

                    </div>

                    {/* Social Icons */}
                    <div className='flex justify-center sm:justify-start gap-4 mt-6'>

                        <a
                            href="https://www.facebook.com/share/1ApbggJPef/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className='w-10 h-10 rounded-full bg-gray-700 hover:bg-amber-500 flex items-center justify-center cursor-pointer transition duration-300 hover:scale-110'>
                                <FaFacebook />
                            </div>
                        </a>

                        <a
                            href="https://www.instagram.com/ig_sou03?igsh=MTFnNTZ1cnZ6MmZxNg=="
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className='w-10 h-10 rounded-full bg-gray-700 hover:bg-amber-500 flex items-center justify-center cursor-pointer transition duration-300 hover:scale-110'>
                                <FaInstagram />
                            </div>
                        </a>

                        <a
                            href="https://t.me/Sougata09"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className='w-10 h-10 rounded-full bg-gray-700 hover:bg-amber-500 flex items-center justify-center cursor-pointer transition duration-300 hover:scale-110'>
                                <FaTelegram />
                            </div>
                        </a>

                    </div>

                </div>

            </div>

            {/* Bottom Footer */}
            <div className='border-t border-gray-700 py-5 px-4 text-center text-gray-400 text-xs sm:text-sm'>

                © 2026 FoodGPT. All Rights Reserved.

            </div>

        </footer>

    )

}

export default Footer