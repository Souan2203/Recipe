import React from 'react'
import food from '../assets/herofood.png'

const Hero = () => {

    return (

        <div className='w-full px-2 sm:px-4 md:px-6 mt-6 md:mt-10'>

            <div className='max-w-7xl mx-auto flex flex-col-reverse lg:flex-row justify-between items-center bg-gradient-to-r from-[#800000] to-[#a52a2a] rounded-2xl overflow-hidden shadow-2xl'>

                {/* Left Content */}
                <div className='w-full lg:w-1/2 px-6 sm:px-10 md:px-14 lg:px-16 py-10 sm:py-14 md:py-16 text-center lg:text-left'>

                    <h1
                        className='text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug'
                        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                        বাংলার ঐতিহ্যবাহী
                    </h1>

                    <h1
                        className='text-yellow-200 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug mt-2'
                        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                        স্বাদের মেলা
                    </h1>

                    <p
                        className='text-gray-100 text-base sm:text-lg md:text-xl mt-6 sm:mt-8 leading-8 sm:leading-9'
                        style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}
                    >
                        বাংলার বিভিন্ন অঞ্চলের বিখ্যাত ও সুস্বাদু খাবারের
                        রেসিপি এবং ঐতিহ্যের এক অনন্য সংগ্রহ।
                    </p>

                    {/* Buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start'>

                        <a href="#recipes">

                            <button className='bg-yellow-300 text-[#800000] px-6 py-3 rounded-xl text-lg font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg'>
                                রেসিপি দেখুন
                            </button>

                        </a>

                        <a href="#form">

                            <button className='bg-white text-[#800000] px-6 py-3 rounded-xl text-lg font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-lg'>
                                নতুন রেসিপি যোগ করুন
                            </button>

                        </a>

                    </div>

                </div>

                {/* Right Image */}
                <div className='w-full lg:w-1/2 h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]'>

                    <img
                        className='h-full w-full object-cover'
                        src={food}
                        alt="বাংলার খাবার"
                    />

                </div>

            </div>

        </div>

    )

}

export default Hero