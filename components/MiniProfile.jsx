import React from 'react'

export default function MiniProfile() {
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
        <img
        className='h-16 w-16 rounded-full border p-[2px]'
         src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" alt="User image" />
        <div className='flex-1 ml-4'>
            <h2 className='font-bold'>Username</h2>
            <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
        </div>
        <button className='font-semibold text-blue-400 text-s,'>Sign Out</button>
    </div>
  )
}
