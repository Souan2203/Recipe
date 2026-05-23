import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {

    const navigate = useNavigate()

    const [user, setuser] = useState({
        email: "",
        pass: ""
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {

        const { name, value } = event.target

        setuser({
            ...user,
            [name]: value
        })

    }

    const handleSubmit = async (event) => {

        event.preventDefault()

        setLoading(true)

        try {

            let response = await axios.post(
                "https://recipe-backend-deployement-mkke.vercel.app/api/user/signin",
                user
            )

            if (response?.data?.message === "login successfully") {

                localStorage.setItem("token", response?.data?.token)

                localStorage.setItem("name", response?.data?.user?.name)

                localStorage.setItem("loginTime", Date.now())

                navigate("/")

            }

        } catch (error) {

            console.log(error)

            alert("Invalid Email or Password")

        } finally {

            setLoading(false)

        }

    }

    return (

        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-orange-200 px-4 py-10'>

            <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10'>

                {/* Heading */}
                <div className='text-center mb-8'>

                    <h1 className='text-3xl sm:text-4xl font-extrabold text-amber-700 mb-3'>
                        Welcome Back
                    </h1>

                    <p className='text-sm sm:text-base text-gray-500'>
                        Login to your FoodGPT account
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className='space-y-5 sm:space-y-6'
                >

                    {/* Email */}
                    <div>

                        <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder='Enter your email'
                            required
                            value={user.email}
                            onChange={handleChange}
                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-amber-500 transition duration-300'
                        />

                    </div>

                    {/* Password */}
                    <div>

                        <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
                            Password
                        </label>

                        <input
                            type="password"
                            name="pass"
                            placeholder='Enter your password'
                            required
                            value={user.pass}
                            onChange={handleChange}
                            className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base outline-none focus:border-amber-500 transition duration-300'
                        />

                    </div>

                    {/* Button */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base'
                    >

                        {
                            loading ? "Logging in..." : "Login"
                        }

                    </button>

                </form>

                {/* Footer */}
                <p className='text-center text-gray-500 mt-6 text-sm sm:text-base'>

                    Don’t have an account?

                    <a href="/signup">

                        <span className='text-amber-700 font-semibold cursor-pointer ml-1 hover:underline'>
                            Signup
                        </span>

                    </a>

                </p>

            </div>

        </div>

    )

}

export default Signin