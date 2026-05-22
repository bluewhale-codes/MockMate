import React from 'react'

const Spinner = ({loading}) => {
  return (
    <>
     

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center w-[350px]">

        {/* Spinner */}

        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        {/* Text */}

        <h2 className="mt-6 text-2xl font-bold text-center">

          Your Mock Test is Preparing...

        </h2>

        <p className="mt-2 text-gray-500 text-center">

          Please wait while AI extracts questions

        </p>

      </div>

    </div>
  
    </>
  )
}

export default Spinner