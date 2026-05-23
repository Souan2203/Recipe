import React, { useCallback, useEffect, useRef, useState } from 'react'
import useFetch from '../Hooks/fetch'
import axios from 'axios'

const Mutton = () => {

    const [muttonitem, setmuttonitem] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [search, setSearch] = useState("")

    const [getall] = useFetch()

    // Fetch All Mutton
    const getAll = useCallback(async () => {

        try {

            let apiUrl = `https://recipe-backend-deployement-mkke.vercel.app/api/mutton/all`

            let muttonObj = await getall(apiUrl)

            console.log(muttonObj)

            setmuttonitem(muttonObj)

        } catch (error) {

            console.log(error)

        }

    }, [getall])

    useEffect(() => {

        getAll()

    }, [getAll])

    // Live Search
    const filteredMutton = muttonitem.filter((mutton) =>
        mutton.foodname?.toLowerCase().includes(search.toLowerCase()) ||
        mutton.ingredients?.toLowerCase().includes(search.toLowerCase()) ||
        mutton.fooddesc?.toLowerCase().includes(search.toLowerCase())
    )

    // Refs
    const hiddenref = useRef("")
    const foodnameref = useRef("")
    const ingredientsref = useRef("")
    const fooddescref = useRef("")

    // Show Single Mutton
    const showMutton = async (_id) => {

        try {

            setShowForm(true)

            let mutton = await axios.get(
                `https://recipe-backend-deployement-mkke.vercel.app/api/mutton/show/${_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            console.log(mutton.data)

            foodnameref.current.value = mutton.data.foodname
            ingredientsref.current.value = mutton.data.ingredients
            fooddescref.current.value = mutton.data.fooddesc
            hiddenref.current.value = mutton.data._id

        } catch (error) {

            console.log(error)

        }

    }

    // Update Mutton
    const handleUpdate = async (e) => {

        e.preventDefault()

        try {

            await axios.put(
                `https://recipe-backend-deployement-mkke.vercel.app/api/mutton/update/${hiddenref.current.value}`,
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

            alert("Mutton Updated Successfully")

            setShowForm(false)

            getAll()

        } catch (error) {

            console.log(error)

        }

    }

    // Delete Mutton
    const deleteMutton = async (_id) => {

        const isConfirm = window.confirm(
            "Are you sure you want to delete this item?"
        )

        if (!isConfirm) {
            return
        }

        try {

            let delobj = await axios.delete(
                `https://recipe-backend-deployement-mkke.vercel.app/api/mutton/delete/${_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            if (delobj) {

                alert("Item deleted successfully")

                getAll()

            }

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <div className='min-h-screen bg-[#fff8f0] px-4 sm:px-6 md:px-10 py-10 md:py-15'>

            {/* Heading */}
            <div className='text-center mb-10 md:mb-14'>

                <h1
                    className='text-3xl sm:text-4xl md:text-5xl font-black text-[#800000] mb-4'
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                    মাটনের জনপ্রিয় রেসিপি
                </h1>

                <p className='text-gray-600 text-base md:text-lg'>
                    বাংলার ঐতিহ্যবাহী স্বাদের সেরা মাটনের পদ
                </p>

            </div>

            {/* Search Box */}
            <div className='flex justify-center mb-10'>

                <input
                    type="text"
                    placeholder='মাটনের রেসিপি খুঁজুন...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='w-full sm:w-[90%] md:w-[500px]
                    border-2 border-[#800000]
                    px-5 py-3 rounded-2xl
                    outline-none text-base md:text-lg
                    focus:ring-4 focus:ring-[#800000]/20'
                />

            </div>

            {/* Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10'>

                {filteredMutton.length > 0 ? (

                    filteredMutton.map((mutton, index) => (

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
                                    src={`https://recipebackendrecipe.vercel.app/uploads/mutton/${mutton.image}`}
                                    alt={mutton.foodname}
                                />

                            </div> */}

                            {/* Content */}
                            <div className='p-5 md:p-6'>

                                <h2
                                    className='text-xl md:text-2xl font-bold text-[#800000] mb-4'
                                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                                >
                                    {mutton.foodname}
                                </h2>

                                {/* Ingredients */}
                                <div className='mb-5'>

                                    <h3 className='font-bold text-base md:text-lg mb-2 text-gray-800'>
                                        উপকরণ :
                                    </h3>

                                    <p className='text-gray-600 leading-7 text-sm md:text-base'>
                                        {mutton.ingredients}
                                    </p>

                                </div>

                                {/* Description */}
                                <div className='mb-6'>

                                    <h3 className='font-bold text-base md:text-lg mb-2 text-gray-800'>
                                        রেসিপি :
                                    </h3>

                                    <p className='text-gray-600 leading-7 text-sm md:text-base'>
                                        {mutton.fooddesc}
                                    </p>

                                </div>

                                {/* Buttons */}
                                <div className='flex flex-wrap gap-3'>

                                    {/* Edit Button */}
                                    {/* <button
                                        onClick={() => showMutton(mutton._id)}
                                        className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 duration-300 text-sm md:text-base'
                                    >
                                        Edit
                                    </button> */}

                                    {/* Delete Button */}
                                   {/*  <button
                                        className='bg-[#800000] text-white px-4 py-2 rounded-lg hover:bg-[#5c0000] duration-300 text-sm md:text-base'
                                        onClick={() => deleteMutton(mutton._id)}
                                    >
                                        Delete
                                    </button> */}

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className='col-span-full text-center text-xl md:text-2xl font-bold text-gray-500'>
                        কোনো মাটনের রেসিপি পাওয়া যায়নি
                    </div>

                )}

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
                                Update Mutton
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

export default Mutton
