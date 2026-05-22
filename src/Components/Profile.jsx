import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {

    const [chicken, setchicken] = useState([])
    const [fish, setfish] = useState([])
    const [mutton, setmutton] = useState([])
    const [sweet, setsweet] = useState([])
    const [rice, setrice] = useState([])

    // POPUP FORM
    const [showForm, setShowForm] = useState(false)

    // SELECTED FOOD
    const [selectedFood, setSelectedFood] = useState(null)

    // FOOD TYPE
    const [foodType, setFoodType] = useState("")

    // FORM DATA
    const [formData, setFormData] = useState({
        foodname: "",
        ingredients: "",
        fooddesc: ""
    })

    // ================= FETCH CHICKEN =================

    const fetchchicken = async () => {

        try {

            const apiUrl = "http://localhost:3005/api/chicken/get"

            let response = await axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setchicken(response?.data)

        } catch (error) {
            console.log(error)
        }
    }

    // ================= FETCH FISH =================

    const fetchFish = async () => {

        try {

            const apiUrl = "http://localhost:3005/api/fish/get"

            let response = await axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setfish(response?.data)

        } catch (error) {
            console.log(error)
        }
    }

    // ================= FETCH MUTTON =================

    const fetchMutton = async () => {

        try {

            const apiUrl = "http://localhost:3005/api/mutton/get"

            let response = await axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setmutton(response?.data)

        } catch (error) {
            console.log(error)
        }
    }

    // ================= FETCH SWEET =================

    const fetchsweet = async () => {

        try {

            const apiUrl = "http://localhost:3005/api/sweet/get"

            let response = await axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setsweet(response?.data)

        } catch (error) {
            console.log(error)
        }
    }

    // ================= FETCH RICE =================

    const fetchRice = async () => {

        try {

            const apiUrl = "http://localhost:3005/api/rice/get"

            let response = await axios.get(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setrice(response?.data)

        } catch (error) {
            console.log(error)
        }
    }

    // ================= USE EFFECT =================

    useEffect(() => {

        fetchchicken()
        fetchFish()
        fetchMutton()
        fetchsweet()
        fetchRice()

    }, [])

    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    // ================= SHOW EDIT POPUP =================

    const showFood = (food, type) => {

        setSelectedFood(food)

        // SAVE CATEGORY TYPE
        setFoodType(type)

        setFormData({
            foodname: food.foodname,
            ingredients: food.ingredients,
            fooddesc: food.fooddesc
        })

        setShowForm(true)
    }

    // ================= UPDATE FOOD =================

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            // DYNAMIC UPDATE API
            const apiUrl = `http://localhost:3005/api/${foodType}/update/${selectedFood._id}`

            let response = await axios.put(apiUrl, formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            console.log(response.data)

            alert("Food Updated Successfully")

            // REFRESH CATEGORY
            refreshCategory(foodType)

            setShowForm(false)

            setFormData({
                foodname: "",
                ingredients: "",
                fooddesc: ""
            })

        } catch (error) {
            console.log(error)
        }
    }

    // ================= DELETE FOOD =================

    const handleDelete = async (id, type) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this food item?")

        if (!confirmDelete) return

        try {

            const apiUrl = `http://localhost:3005/api/${type}/delete/${id}`

            let response = await axios.delete(apiUrl, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            console.log(response.data)

            alert("Food Deleted Successfully")

            // REFRESH CATEGORY
            refreshCategory(type)

        } catch (error) {
            console.log(error)
        }
    }

    // ================= REFRESH CATEGORY =================

    const refreshCategory = (type) => {

        if (type === "chicken") {
            fetchchicken()
        }

        if (type === "fish") {
            fetchFish()
        }

        if (type === "mutton") {
            fetchMutton()
        }

        if (type === "sweet") {
            fetchsweet()
        }

        if (type === "rice") {
            fetchRice()
        }
    }

   
    return (

        <div className='min-h-screen bg-gray-100 p-6'>
            
            <h1 className='text-4xl font-bold text-center mb-10 text-red-600'>
                My Food Profile
            </h1>

            {/* ================= CHICKEN ================= */}

            <div className='mb-10'>

                <h2 className='text-3xl font-bold mb-5 text-orange-600'>
                    Chicken Items
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    {
                        chicken.length > 0 && chicken.map((item, index) => (

                            <div
                                key={index}
                                className='bg-white shadow-lg rounded-2xl p-5 border border-gray-200 hover:scale-105 duration-300'
                            >

                                <h3 className='text-2xl font-bold text-red-500 mb-3'>
                                    {item.foodname}
                                </h3>

                                <p className='mb-2'>
                                    <span className='font-bold'>
                                        Ingredients:
                                    </span> {item.ingredients}
                                </p>

                                <p>
                                    <span className='font-bold'>
                                        Description:
                                    </span> {item.fooddesc}
                                </p>

                                <div className='flex gap-4 mt-5'>

                                    <button
                                        onClick={() => showFood(item, "chicken")}
                                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id, "chicken")}
                                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

            {/* ================= FISH ================= */}

            <div className='mb-10'>

                <h2 className='text-3xl font-bold mb-5 text-blue-600'>
                    Fish Items
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    {
                        fish.length > 0 && fish.map((item, index) => (

                            <div
                                key={index}
                                className='bg-white shadow-lg rounded-2xl p-5 border border-gray-200 hover:scale-105 duration-300'
                            >

                                <h3 className='text-2xl font-bold text-blue-500 mb-3'>
                                    {item.foodname}
                                </h3>

                                <p className='mb-2'>
                                    <span className='font-bold'>
                                        Ingredients:
                                    </span> {item.ingredients}
                                </p>

                                <p>
                                    <span className='font-bold'>
                                        Description:
                                    </span> {item.fooddesc}
                                </p>

                                <div className='flex gap-4 mt-5'>

                                    <button
                                        onClick={() => showFood(item, "fish")}
                                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id, "fish")}
                                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

            {/* ================= MUTTON ================= */}

            <div className='mb-10'>

                <h2 className='text-3xl font-bold mb-5 text-green-600'>
                    Mutton Items
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    {
                        mutton.length > 0 && mutton.map((item, index) => (

                            <div
                                key={index}
                                className='bg-white shadow-lg rounded-2xl p-5 border border-gray-200 hover:scale-105 duration-300'
                            >

                                <h3 className='text-2xl font-bold text-green-500 mb-3'>
                                    {item.foodname}
                                </h3>

                                <p className='mb-2'>
                                    <span className='font-bold'>
                                        Ingredients:
                                    </span> {item.ingredients}
                                </p>

                                <p>
                                    <span className='font-bold'>
                                        Description:
                                    </span> {item.fooddesc}
                                </p>

                                <div className='flex gap-4 mt-5'>

                                    <button
                                        onClick={() => showFood(item, "mutton")}
                                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id, "mutton")}
                                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

            {/* ================= SWEET ================= */}

            <div className='mb-10'>

                <h2 className='text-3xl font-bold mb-5 text-pink-600'>
                    Sweet Items
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    {
                        sweet.length > 0 && sweet.map((item, index) => (

                            <div
                                key={index}
                                className='bg-white shadow-lg rounded-2xl p-5 border border-gray-200 hover:scale-105 duration-300'
                            >

                                <h3 className='text-2xl font-bold text-pink-500 mb-3'>
                                    {item.foodname}
                                </h3>

                                <p className='mb-2'>
                                    <span className='font-bold'>
                                        Ingredients:
                                    </span> {item.ingredients}
                                </p>

                                <p>
                                    <span className='font-bold'>
                                        Description:
                                    </span> {item.fooddesc}
                                </p>

                                <div className='flex gap-4 mt-5'>

                                    <button
                                        onClick={() => showFood(item, "sweet")}
                                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id, "sweet")}
                                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

            {/* ================= RICE ================= */}

            <div className='mb-10'>

                <h2 className='text-3xl font-bold mb-5 text-yellow-600'>
                    Rice Items
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    {
                        rice.length > 0 && rice.map((item, index) => (

                            <div
                                key={index}
                                className='bg-white shadow-lg rounded-2xl p-5 border border-gray-200 hover:scale-105 duration-300'
                            >

                                <h3 className='text-2xl font-bold text-yellow-500 mb-3'>
                                    {item.foodname}
                                </h3>

                                <p className='mb-2'>
                                    <span className='font-bold'>
                                        Ingredients:
                                    </span> {item.ingredients}
                                </p>

                                <p>
                                    <span className='font-bold'>
                                        Description:
                                    </span> {item.fooddesc}
                                </p>

                                <div className='flex gap-4 mt-5'>

                                    <button
                                        onClick={() => showFood(item, "rice")}
                                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id, "rice")}
                                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

            {/* ================= POPUP FORM ================= */}

            {
                showForm && (

                    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>

                        <form
                            onSubmit={handleSubmit}
                            className='bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg relative'
                        >

                            {/* CLOSE BUTTON */}

                            <button
                                type='button'
                                onClick={() => setShowForm(false)}
                                className='absolute top-3 right-4 text-3xl font-bold text-red-500'
                            >
                                ×
                            </button>

                            <h2 className='text-3xl font-bold mb-6 text-center text-blue-600'>
                                Update Food
                            </h2>

                            {/* FOOD NAME */}

                            <div className='mb-4'>

                                <label className='block mb-2 font-bold'>
                                    Food Name
                                </label>

                                <input
                                    type="text"
                                    name="foodname"
                                    value={formData.foodname}
                                    onChange={handleChange}
                                    required
                                    className='w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500'
                                />

                            </div>

                            {/* INGREDIENTS */}

                            <div className='mb-4'>

                                <label className='block mb-2 font-bold'>
                                    Ingredients
                                </label>

                                <input
                                    type="text"
                                    name="ingredients"
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                    required
                                    className='w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500'
                                />

                            </div>

                            {/* DESCRIPTION */}

                            <div className='mb-6'>

                                <label className='block mb-2 font-bold'>
                                    Description
                                </label>

                                <textarea
                                    name="fooddesc"
                                    value={formData.fooddesc}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className='w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-blue-500'
                                />

                            </div>

                            {/* BUTTONS */}

                            <div className='flex justify-center gap-4'>

                                <button
                                    type='submit'
                                    className='bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl'
                                >
                                    Update
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setShowForm(false)}
                                    className='bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl'
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                )
            }

        </div>
    )
}

export default Profile