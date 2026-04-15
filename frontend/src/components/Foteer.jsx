import React from 'react'
import { assets } from '../assets/assets'

const Foteer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'> 
            {/* LEFT SECTION */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />

                <p className='w-full md:w-2/3 text-gray-600 leading-6'>lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Inpusm has been the industry`s standard dumy text ever since the 1500s,when an unknoe printer took a galley of type and scrambled it to make a type specimen book</p>

            </div>

             {/* CENTER SECTION */}
            <div>
                <p className='text-xl fount-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

             {/* RIGHT SECTION */}
            <div>
                <p  className='text-xl fount-medium mb-5'>GET IN TOUCH</p>
                <ul  className='flex flex-col gap-2 text-gray-600'>
                    <li>hamdialnbhani55@gmail.com</li>
                    <li>hamdialnbhani55@gmail.com</li>
                </ul>
                
            </div>
        </div>
        {/* COPYRIGHT TEXT */}
        <div>
            <hr />
          <p className='py-5 text-sm text-center'>Copyright 2026@ prexcripto - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Foteer