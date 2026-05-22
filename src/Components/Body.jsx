import React from 'react'
import { motion } from 'framer-motion'

import fishpic from '../assets/Fishpic.png'
import chicken from '../assets/Chicken.png'
import mutton from '../assets/Mutton.png'
import rice from '../assets/Rice.png'
import sweet from '../assets/Sweets.png'

const Body = () => {

  // Animation Variants
  const containerVariant = {

    hidden: {},

    visible: {

      transition: {

        staggerChildren: 0.2

      }

    }

  }

  const cardVariant = {

    hidden: {

      opacity: 0,
      y: 80,
      scale: 0.8

    },

    visible: {

      opacity: 1,
      y: 0,
      scale: 1,

      transition: {

        duration: 0.7,
        ease: "easeOut"

      }

    }

  }

  const cards = [

    {
      title: "মাছের রেসিপি",
      desc: "বাংলার ঐতিহ্যবাহী মাছের সেরা স্বাদ ও জনপ্রিয় পদ",
      image: fishpic,
      link: "/fish"
    },

    {
      title: "চিকেন রেসিপি",
      desc: "মশলাদার চিকেনের জনপ্রিয় ও সুস্বাদু রেসিপি",
      image: chicken,
      link: "/chicken"
    },

    {
      title: "মাটন রেসিপি",
      desc: "বাঙালির প্রিয় মাটনের ঝোল ও কষার স্বাদ",
      image: mutton,
      link: "/mutton"
    },

    {
      title: "ভাতের পদ",
      desc: "সুগন্ধি পোলাও ও ভাতের সেরা বাঙালি রেসিপি",
      image: rice,
      link: "/rice"
    },

    {
      title: "মিষ্টির রেসিপি",
      desc: "বাংলার ঐতিহ্যবাহী মিষ্টি ও ডেজার্টের স্বাদ",
      image: sweet,
      link: "/sweet"
    }

  ]

  return (

    <div id="recipes" className='rounded-xl overflow-hidden'>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className='text-white font-black text-4xl pl-50 pt-15 mb-12'
        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
      >
        জনপ্রিয় রেসিপি -
      </motion.h1>

      {/* Cards */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className='flex flex-wrap items-center justify-center gap-7 pb-20'
      >

        {
          cards.map((item, index) => (

            <motion.a
              key={index}
              href={item.link}
              variants={cardVariant}
              whileHover={{
                scale: 1.07,
                y: -10
              }}
              whileTap={{
                scale: 0.95
              }}
              className='flex-shrink-0'
            >

              <motion.div
                className='w-65 h-90 bg-white rounded-2xl overflow-hidden 
                shadow-lg hover:shadow-2xl shadow-green-400/50
                transform-gpu will-change-transform'
              >

                {/* Image */}
                <motion.img
                  whileHover={{
                    scale: 1.1
                  }}
                  transition={{
                    duration: 0.4
                  }}
                  className='w-full h-40 object-cover'
                  src={item.image}
                  alt={item.title}
                />

                {/* Content */}
                <div className='p-5 text-center'>

                  <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className='text-2xl font-bold text-[#800000] mb-3'
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                  >
                    {item.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className='text-gray-600 leading-7 text-sm'
                  >
                    {item.desc}
                  </motion.p>

                </div>

              </motion.div>

            </motion.a>

          ))
        }

      </motion.div>

    </div>

  )
}

export default Body