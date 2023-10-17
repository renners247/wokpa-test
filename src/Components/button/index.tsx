"use client";
import { ButtonHTMLAttributes } from "react"

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {

    return (

        <button
            onClick={props.onClick}
            type={props.type}
            className={`rounded-[40px] py-3 px-5 bg-gradient-to-r from-[#083F62] to-[#25AEA4] text-white font-medium ${props.className}`}>
            {
                props.children
            }
        </button>

    )
}

export default Button;