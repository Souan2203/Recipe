import React, { useCallback, useEffect, useRef, useState } from 'react'
import useFetch from '../Hooks/fetch'
import axios from 'axios'

const Sweet = () => {

    const [sweet, setsweet] = useState([])
    const [showForm, setShowForm] = useState(false)

    // Live Search
    const [search, setSearch] = useState("")

    const [getall] = useFetch()

    // Fetch All Sweets
    const getAll = useCallback(async () => {

        try {

            let apiUrl = `https://recipe-backend-deployement-mkke.vercel.app/api/sweet/all`

            let sweetObj = await getall(apiUrl)

            console.log(sweetObj)

            setsweet(sweetObj)

        } catch (error) {

            console.log(error)

        }

    }, [getall])

    useEffect(() => {

        getAll()

    }, [getAll])

    // Filtered Search
    const filteredSweet = sweet.filter((item) => {

        return (

            item.foodname?.toLowerCase().includes(search.toLowerCase()) ||

            item.ingredients?.toLowerCase().includes(search.toLowerCase()) ||

            item.fooddesc?.toLowerCase().includes(search.toLowerCase())

        )

    })

    // Refs
    const hiddenref = useRef("")
    const foodnameref = useRef("")
    const ingredientsref = useRef("")
    const fooddescref = useRef("")

    // Show Single Sweet
    const showSweet = async (_id) => {

        try {

            setShowForm(true)

            let sweet = await axios.get(
                `https://recipe-backend-deployement-mkke.vercel.app/api/sweet/show/${_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            console.log(sweet.data)

            foodnameref.current.value = sweet.data.foodname
            ingredientsref.current.value = sweet.data.ingredients
            fooddescref.current.value = sweet.data.fooddesc
            hiddenref.current.value = sweet.data._id

        } catch (error) {

            console.log(error)

        }

    }

    // Update Sweet
    const handleUpdate = async (e) => {

        e.preventDefault()

        try {

            await axios.put(
                `https://recipe-backend-deployement-mkke.vercel.app/api/sweet/update/${hiddenref.current.value}`,
                {
                    foodname: foodnameref.current.value,
                    ingredients: ingredientsref.current.value,
                    fooddesc: fooddescref.current.value,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            alert("Sweet Updated Successfully")

            setShowForm(false)

            getAll()

        } catch (error) {

            console.log(error)

        }

    }

    // Delete Sweet
    const deleteSweet = async (_id) => {

        try {

            let del = await axios.delete(
                `https://recipe-backend-deployement-mkke.vercel.app/api/sweet/delete/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            console.log(del)

            if (del.status === 200) {

                alert("Deleted Successfully")

                getAll()

            }

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <div>

            {/* Main Section */}
            <div className='min-h-screen bg-[#fff8f0] px-4 sm:px-6 md:px-10 py-10 md:py-15'>

                {/* Heading */}
                <div className='text-center mb-10 md:mb-14'>

                    <h1
                        className='text-3xl sm:text-4xl md:text-5xl font-black text-[#800000] mb-4'
                        style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                        মিষ্টির জনপ্রিয় রেসিপি
                    </h1>

                    <p className='text-gray-600 text-base md:text-lg'>
                        বাংলার ঐতিহ্যবাহী সেরা মিষ্টি
                    </p>

                </div>

                {/* Search Box */}
                <div className='flex justify-center mb-10 md:mb-12'>

                    <input
                        type="text"
                        placeholder='মিষ্টির রেসিপি খুঁজুন...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full sm:w-[90%] md:max-w-2xl
                        border-2 border-[#800000]
                        p-3 md:p-4 rounded-2xl
                        outline-none text-base md:text-lg
                        focus:ring-2 focus:ring-[#800000]'
                    />

                </div>

                {/* Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10'>

                    {
                        filteredSweet.length > 0 ? (

                            filteredSweet.map((sweets, index) => (

                                <div
                                    key={index}
                                    className='bg-white rounded-3xl overflow-hidden
                                    shadow-lg hover:shadow-2xl
                                    transition-all duration-300
                                    hover:-translate-y-2'
                                >

                                    {/* Image */}
                                    {/* <div className='h-52 sm:h-56 overflow-hidden'>

                                        <img
                                            className='w-full h-full object-cover hover:scale-110 duration-500'
                                            src={`https://recipe-backend-deployement-mkke.vercel.app/uploads/SweetUploads/${sweets.image}`}
                                            alt={sweets.foodname}
                                        />

                                    </div> */}

                                    {/* Content */}
                                    <div className='p-5 md:p-6'>

                                        <h2
                                            className='text-xl md:text-2xl font-bold text-[#800000] mb-4'
                                            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                                        >
                                            {sweets.foodname}
                                        </h2>

                                        {/* Ingredients */}
                                        <div className='mb-5'>

                                            <h3 className='font-bold text-base md:text-lg mb-2 text-gray-800'>
                                                উপকরণ :
                                            </h3>

                                            <p className='text-gray-600 leading-7 text-sm md:text-base'>
                                                {sweets.ingredients}
                                            </p>

                                        </div>

                                        {/* Recipe */}
                                        <div className='mb-6'>

                                            <h3 className='font-bold text-base md:text-lg mb-2 text-gray-800'>
                                                রেসিপি :
                                            </h3>

                                            <p className='text-gray-600 leading-7 text-sm md:text-base'>
                                                {sweets.fooddesc}
                                            </p>

                                        </div>

                                        {/* Buttons */}
                                        <div className='flex flex-wrap gap-3'>

                                            {/* <button
                                                onClick={() => showSweet(sweets._id)}
                                                className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 duration-300 text-sm md:text-base'
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className='bg-[#800000] text-white px-4 py-2 rounded-lg hover:bg-[#5c0000] duration-300 text-sm md:text-base'
                                                onClick={() => deleteSweet(sweets._id)}
                                            >
                                                Delete
                                            </button> */}

                                        </div>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className='col-span-full text-center'>

                                <h2 className='text-2xl md:text-3xl font-bold text-red-500'>
                                    No Sweet Found
                                </h2>

                            </div>

                        )
                    }

                </div>

            </div>

            {/* Update Modal */}
            {
                showForm && (

                    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4'>

                        <form
                            onSubmit={handleUpdate}
                            className='bg-white p-6 md:p-8 rounded-2xl
                            w-full max-w-md space-y-5 shadow-2xl'
                        >

                            <h2 className='text-2xl md:text-3xl font-bold text-center text-[#800000]'>
                                Update Sweet
                            </h2>

                            <input
                                type="hidden"
                                ref={hiddenref}
                            />

                            {/* Food Name */}
                            <div>

                                <label className='block mb-2 font-semibold'>
                                    Food Name
                                </label>

                                <input
                                    type="text"
                                    ref={foodnameref}
                                    className='w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-[#800000]'
                                    required
                                />

                            </div>

                            {/* Ingredients */}
                            <div>

                                <label className='block mb-2 font-semibold'>
                                    Ingredients
                                </label>

                                <input
                                    type="text"
                                    ref={ingredientsref}
                                    className='w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-[#800000]'
                                    required
                                />

                            </div>

                            {/* Description */}
                            <div>

                                <label className='block mb-2 font-semibold'>
                                    Description
                                </label>

                                <textarea
                                    ref={fooddescref}
                                    rows="4"
                                    className='w-full border border-gray-300 p-3 rounded-xl outline-none focus:border-[#800000]'
                                    required
                                />

                            </div>

                            {/* Buttons */}
                            <div className='flex flex-wrap gap-4 justify-end'>

                               {/*  <button
                                    type='button'
                                    onClick={() => setShowForm(false)}
                                    className='bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 duration-300'
                                >
                                    Cancel
                                </button>

                                <button
                                    type='submit'
                                    className='bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 duration-300'
                                >
                                    Update
                                </button> */}

                            </div>

                        </form>

                    </div>

                )
            }

        </div>

    )

}

export default Sweet