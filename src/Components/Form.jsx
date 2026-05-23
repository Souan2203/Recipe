import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'

const Form = () => {

  const [issubmit, setsubmit] = useState(false)

  // Validation Schema
  const validationSchema = Yup.object({

    category: Yup.string()
      .required("Please select a category"),

    foodname: Yup.string()
      .min(3, "Food name must be at least 3 characters")
      .max(50, "Food name cannot exceed 50 characters")
      .matches(
        /^[A-Za-z\s]+$/,
        "Only alphabets are allowed"
      )
      .required("Food Name is Required"),

    ingredients: Yup.string()
      .min(10, "Ingredients must be at least 10 characters")
      .max(300, "Ingredients cannot exceed 300 characters")
      .required("Ingredients are Required"),

    fooddesc: Yup.string()
      .min(20, "Description must be at least 20 characters")
      .max(500, "Description cannot exceed 500 characters")
      .matches(
        /^[A-Za-z0-9\s.,!?'"()\-:;]+$/,
        "Invalid characters in description"
      )
      .required("Food Description is Required")

  })

  // Formik
  const formik = useFormik({

    initialValues: {

      category: "",
      foodname: "",
      ingredients: "",
      fooddesc: ""

    },

    validationSchema,

    onSubmit: async (data, { resetForm }) => {

      try {

        let response

        // Food Data
        const foodData = {

          category: data.category,
          foodname: data.foodname,
          ingredients: data.ingredients,
          fooddesc: data.fooddesc

        }

        // Dynamic API URL
        let apiUrl = ""

        if (data.category === "chicken") {

          apiUrl = "https://recipe-backend-deployement-mkke.vercel.app/api/chicken/add"

        }

        else if (data.category === "fish") {

          apiUrl = "https://recipe-backend-deployement-mkke.vercel.app/api/fish/add"

        }

        else if (data.category === "mutton") {

          apiUrl = "https://recipe-backend-deployement-mkke.vercel.app/api/mutton/add"

        }

        else if (data.category === "rice") {

          apiUrl = "https://recipe-backend-deployement-mkke.vercel.app/api/rice/add"

        }

        else if (data.category === "sweet") {

          apiUrl = "https://recipe-backend-deployement-mkke.vercel.app/api/sweet/add"

        }

        response = await axios.post(

          apiUrl,

          foodData,

          {
            headers: {

              "Content-Type": "application/json",

              Authorization: `Bearer ${localStorage.getItem("token")}`

            }
          }

        )

        console.log(response.data)

        if (response.status === 200 || response.status === 201) {

          alert("Food Added Successfully")

          setsubmit(true)

          resetForm()

        }

        else {

          alert("Unable to Add")

        }

      }

      catch (error) {

        console.log(error)

        alert("Something went wrong")

      }

    },

    onReset: () => {

      setsubmit(false)

    }

  })

  return (

    <div
      id='form'
      className='min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-100 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8'
    >

      <div className='w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-5 sm:p-8 md:p-10 border border-yellow-200'>

        {/* Heading */}
        <div className='text-center mb-8'>

          <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#800000] mb-2'>
            Add Bengali Food
          </h1>

          <p className='text-gray-500 text-sm sm:text-base'>
            বাংলার ঐতিহ্যবাহী খাবারের তথ্য যোগ করুন
          </p>

        </div>

        {/* Form */}
        <form
          className='space-y-5 sm:space-y-6'
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >

          {/* Category */}
          <div>

            <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
              Category
            </label>

            <select
              name='category'
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-yellow-50 text-sm sm:text-base'
            >

              <option value="">Select a Category</option>

              <option value="fish">Fish</option>

              <option value="chicken">Chicken</option>

              <option value="mutton">Mutton</option>

              <option value="rice">Rice</option>

              <option value="sweet">Sweets</option>

            </select>

            {
              formik.errors.category &&
              formik.touched.category && (

                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {formik.errors.category}
                </p>

              )
            }

          </div>

          {/* Food Name */}
          <div>

            <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
              Food Name
            </label>

            <input
              type='text'
              name='foodname'
              placeholder='Enter food name'
              value={formik.values.foodname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-yellow-50 text-sm sm:text-base'
            />

            {
              formik.errors.foodname &&
              formik.touched.foodname && (

                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {formik.errors.foodname}
                </p>

              )
            }

          </div>

          {/* Ingredients */}
          <div>

            <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
              Ingredients
            </label>

            <input
              type='text'
              name='ingredients'
              placeholder='Enter ingredients'
              value={formik.values.ingredients}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-yellow-50 text-sm sm:text-base'
            />

            {
              formik.errors.ingredients &&
              formik.touched.ingredients && (

                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {formik.errors.ingredients}
                </p>

              )
            }

          </div>

          {/* Description */}
          <div>

            <label className='block mb-2 font-semibold text-gray-700 text-sm sm:text-base'>
              Description
            </label>

            <textarea
              name='fooddesc'
              rows='5'
              placeholder='Write food description...'
              value={formik.values.fooddesc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-yellow-50 resize-none text-sm sm:text-base'
            ></textarea>

            {
              formik.errors.fooddesc &&
              formik.touched.fooddesc && (

                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {formik.errors.fooddesc}
                </p>

              )
            }

          </div>

          {/* Buttons */}
          <div className='flex flex-col sm:flex-row justify-center gap-4 pt-4'>

            <button
              type='reset'
              className='w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg'
            >
              Reset
            </button>

            <button
              type='submit'
              className='w-full sm:w-auto bg-[#800000] hover:bg-[#5c0000] text-white font-bold px-10 py-3 rounded-xl transition-all duration-300 shadow-lg hover:scale-105'
            >
              Add Food
            </button>

          </div>

          {/* Success Message */}
          {
            issubmit && (

              <p className='text-center text-green-600 font-semibold mt-4 text-sm sm:text-base'>
                Food Added Successfully
              </p>

            )
          }

        </form>

      </div>

    </div>

  )

}

export default Form
