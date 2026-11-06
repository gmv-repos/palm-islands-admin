import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlueButtonAdmin = ({text, disabled}) => {
    return (
        <button type='submit' disabled={disabled} className={`border md:p-2 p-1 md:px-4 px-2 flex justify-center items-center gap-3 md:text-sm text-xs text-white w-fit ${disabled ? 'bg-gray-400 border-gray-400 cursor-not-allowed' : 'bg-[#5DAABA] border-[#5DAABA] cursor-pointer'}`}>
            {text}
        </button>
    )
}

export default BlueButtonAdmin