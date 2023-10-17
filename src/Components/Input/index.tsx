"use client";
import {  FieldAttributes } from 'formik';
import * as Yup from 'yup';

const Input: React.FC<FieldAttributes<any>> = (props) => {

    return (

        <input
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            type={"text"} placeholder={props.placeholder} className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500 ${props.className}`} />

    )
}

const loginValidationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required'),
    username: Yup.string().email('Invalid email').required('Email Required'),
});

export default Input;