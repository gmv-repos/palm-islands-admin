import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlueButtonAdmin = ({text}) => {
    return (
        <button type='submit' className=' bg-[#5DAABA] border border-[#5DAABA] md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 cursor-pointer md:text-sm text-xs text-white w-fit'>
            {text}
        </button>
    )
}

export default BlueButtonAdmin