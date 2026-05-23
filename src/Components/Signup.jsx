import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

const Signup = () => {

    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object({

        name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
            .required("Name is required"),

        email: Yup.string()
            .matches(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Enter a valid email"
            )
            .required("Email is required"),

        ph: Yup.string()
            .matches(
                /^(\+91[\-\s]?)?[6-9]\d{9}$/,
                "Enter a valid phone number"
            )
            .required("Phone number is required"),

        pass: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least 8 characters, one uppercase letter, one number, and one special character"
            )
            .required("Password is required"),

        pass1: Yup.string()
            .oneOf([Yup.ref("pass")], "Passwords must match")
            .required("Confirm password is required")

    })

    const formik = useFormik({

        initialValues: {
            name: "",
            email: "",
            ph: "",
            pass: "",
            pass1: ""
        },

        validationSchema,

        onSubmit: async (data, { resetForm }) => {

            setLoading(true)

            try {

                let response = await axios.post(
                    "https://recipebackendrecipe.vercel.app/api/user/signup",
                    data
                )

                if (response?.data) {

                    alert("Signup successful")

                    resetForm()

                    window.location.href = "/"

                } else {

                    alert("Signup failed")

                }

            } catch (error) {

                console.log(error)

                alert("Something went wrong")

            } finally {

                setLoading(false)

            }

        }

    })

    return (

        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-amber-100 to-orange-200 px-3 sm:px-4 md:px-6 py-6 sm:py-8 overflow-hidden'>

            <div className='w-full max-w-md sm:max-w-lg md:max-w-xl bg-white shadow-2xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-10'>

                {/* Heading */}
                <div className='text-center mb-6 sm:mb-8'>

                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-700 mb-2 leading-tight'>
                        Create Account
                    </h1>

                    <p className='text-gray-500 text-xs sm:text-sm md:text-base'>
                        Signup to continue
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={formik.handleSubmit}
                    className='space-y-4 sm:space-y-5'
                >

                    {/* Name */}
                    <div>

                        <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder='Enter your name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-amber-500 transition-all duration-300'
                        />

                        {
                            formik.errors.name &&
                            formik.touched.name && (

                                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                                    {formik.errors.name}
                                </p>

                            )
                        }

                    </div>

                    {/* Email */}
                    <div>

                        <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder='Enter your email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-amber-500 transition-all duration-300'
                        />

                        {
                            formik.errors.email &&
                            formik.touched.email && (

                                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                                    {formik.errors.email}
                                </p>

                            )
                        }

                    </div>

                    {/* Phone */}
                    <div>

                        <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="ph"
                            placeholder='Enter phone number'
                            value={formik.values.ph}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-amber-500 transition-all duration-300'
                        />

                        {
                            formik.errors.ph &&
                            formik.touched.ph && (

                                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                                    {formik.errors.ph}
                                </p>

                            )
                        }

                    </div>

                    {/* Password */}
                    <div>

                        <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
                            Password
                        </label>

                        <input
                            type="password"
                            name="pass"
                            placeholder='Enter password'
                            value={formik.values.pass}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-amber-500 transition-all duration-300'
                        />

                        {
                            formik.errors.pass &&
                            formik.touched.pass && (

                                <p className='text-red-500 text-xs sm:text-sm mt-1 leading-5'>
                                    {formik.errors.pass}
                                </p>

                            )
                        }

                    </div>

                    {/* Confirm Password */}
                    <div>

                        <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="pass1"
                            placeholder='Confirm password'
                            value={formik.values.pass1}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-amber-500 transition-all duration-300'
                        />

                        {
                            formik.errors.pass1 &&
                            formik.touched.pass1 && (

                                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                                    {formik.errors.pass1}
                                </p>

                            )
                        }

                    </div>

                    {/* Buttons */}
                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3'>

                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base hover:scale-[1.02]'
                        >

                            {
                                loading
                                    ? "Signing up..."
                                    : "Signup"
                            }

                        </button>

                        <button
                            type="button"
                            onClick={formik.handleReset}
                            className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition duration-300 text-sm sm:text-base hover:scale-[1.02]'
                        >
                            Reset
                        </button>

                    </div>

                </form>

                {/* Footer */}
                <p className='text-center text-gray-500 mt-6 text-xs sm:text-sm md:text-base leading-6'>

                    Already have an account?

                    <a href="/signin">

                        <span className='text-amber-700 font-semibold ml-1 hover:underline cursor-pointer'>
                            Login
                        </span>

                    </a>

                </p>

            </div>

        </div>

    )

}

export default Signup