import React, { useCallback, useEffect, useRef, useState } from 'react'
import useFetch from '../Hooks/fetch'
import axios  from 'axios'

const Fish = () => {

    const [fishitem, setfishitem] = useState([])
    const [getall] = useFetch()

    const fetchpost = useCallback(async () => {
        try {

            let apiUrl = `https://recipebackendrecipe.vercel.app/api/fish/all`

            let response = await getall(apiUrl)

            console.log(response)

            setfishitem(response)

        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        fetchpost()
    }, [])

    const hiddenref = useRef("")
        const foodnameref = useRef("")
        const ingredientsref = useRef("")
        const fooddescref = useRef("")

    const [showForm, setShowForm] = useState(false)
    const showFish= async (_id) => {

        try {

            setShowForm(true)

            let fish = await axios.get(
                `https://recipebackendrecipe.vercel.app/api/fish/show/${_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            console.log(fish.data)

            foodnameref.current.value = fish.data.foodname
            ingredientsref.current.value = fish.data.ingredients
            fooddescref.current.value = fish.data.fooddesc
            hiddenref.current.value = fish.data._id

        } catch (error) {

            console.log(error)

        }

    }
    const handleUpdate = async (e) => {

        e.preventDefault()

        try {

            await axios.put(
                `https://recipebackendrecipe.vercel.app/api/fish/update/${hiddenref.current.value}`,
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

            alert("Fish Updated Successfully")

            setShowForm(false)

            fetchpost()

        } catch (error) {

            console.log(error)

        }

    }


    const deleteFish = async (_id) => {

        const isConfirm = window.confirm(
            "Are you sure you want to delete this item?"
        )

        if (!isConfirm) {
            return
        }

        try {

            let delobj = await axios.delete(
                `https://recipebackendrecipe.vercel.app/api/fish/delete/${_id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )

            if (delobj) {

                alert("Item deleted successfully")


                fetchpost()

            }

        } catch (error) {

            console.log(error)

        }
    }

    return (

        <div className='min-h-screen bg-[#fff8f0] px-10 py-15'>

            {/* Heading */}
            <div className='text-center mb-14'>

                <h1
                    className='text-5xl font-black text-[#800000] mb-4'
                    style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                    মাছের জনপ্রিয় রেসিপি
                </h1>

                <p className='text-gray-600 text-lg'>
                    বাংলার ঐতিহ্যবাহী স্বাদের সেরা মাছের পদ
                </p>

            </div>

            {/* Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>

                {fishitem.length > 0 && fishitem.map((fish, index) => (

                    <div
                        key={index}
                        className='bg-white rounded-3xl overflow-hidden 
                        shadow-lg hover:shadow-2xl 
                        transition-all duration-300 
                        hover:-translate-y-2'
                    >

                        {/* Image */}
                        <div className='h-56 overflow-hidden'>

                            <img
                                className='w-full h-full object-cover hover:scale-110 duration-500'
                                src={`https://recipebackendrecipe.vercel.app/uploads/Fish/${fish.image}`}
                                alt=""
                            />

                        </div>

                        {/* Content */}
                        <div className='p-6'>

                            <h2
                                className='text-2xl font-bold text-[#800000] mb-4'
                                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                            >
                                {fish.foodname}
                            </h2>

                            <div className='mb-5'>

                                <h3 className='font-bold text-lg mb-2 text-gray-800'>
                                    উপকরণ :
                                </h3>

                                <p className='text-gray-600 leading-7'>
                                    {fish.ingridentes}
                                </p>

                            </div>

                            <div className='mb-6'>

                                <h3 className='font-bold text-lg mb-2 text-gray-800'>
                                    রেসিপি :
                                </h3>

                                <p className='text-gray-600 leading-7'>
                                    {fish.fooddesc}
                                </p>

                            </div>

                            <div className='flex gap-4'>

                               {/*  <button
                                    onClick={() => showFish(fish._id)}
                                    className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 duration-300'
                                >
                                    Edit
                                </button>

                                <button
                                    className='bg-[#800000] text-white px-4 py-2 rounded-lg hover:bg-[#5c0000] duration-300'
                                    onClick={() => deleteFish(fish._id)}
                                >
                                    Delete
                                </button> */}

                            </div>

                        </div>

                    </div>

                ))}

            </div>
            {
                showForm && (

                    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>

                        <form
                            onSubmit={handleUpdate}
                            className='bg-white p-8 rounded-2xl w-[400px] space-y-5 shadow-2xl'
                        >

                            <h2 className='text-3xl font-bold text-center text-[#800000]'>
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
                            <div className='flex gap-4 justify-end'>

                                <button
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
                                </button>

                            </div>

                        </form>

                    </div>

                )
            }

        </div>
    )
}

export default Fish