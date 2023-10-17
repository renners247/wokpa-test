'use client';
import { authLogin, resetAuth } from "@/redux/auth";
import Button from "../../../components/button";
import Input from "../../../components/input";
import PasswordInput from "../../../components/password-input";
import Link from "next/link";
import * as Yup from "yup"
import { useAppDispatch } from "@/hooks";
import { APICall } from "@/utils";
import { googleLogin, login, resetPassword } from "@/app/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import Image from "next/image";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;


const validationSchema = Yup.object().shape({
    password: Yup.string()
        .matches(passwordRules, { message: "Please create a stronger password!" })
        .required("Password is required"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match!')
        .required("Confirm password is required!"),
});


export default function Login() {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [error, setError] = useState("");
    const params = useSearchParams();
    const router = useRouter();

    const [token, setToken] = useState("");

    const handleResetPassword = async (values: any, setSubmitting: (val: boolean) => void) => {
        try {
            dispatch(resetAuth());
            setSubmitting(true);
            const response = await APICall(resetPassword, { ...values, token }, true);
            router.push("/login");
            setSubmitting(false);
        } catch (error) {
            console.log(error)
            setSubmitting(false);
        }
    }

    useEffectOnce(() => {
        const token = params.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        setToken(token);
    })

    return (
        <div>
            <div className="">
                <div className="flex min-h-screen">
                    <div className="w-6/12 bg-dark contianer md:px-8 py-8">
                        <div>
                            <Image width={138} height={48} src={"/icons/wokpa.png"} alt="" />
                        </div>

                        <Formik
                            initialValues={{
                                password_confirmation: '',
                                password: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log("submitting")
                                handleResetPassword(values, setSubmitting)
                            }}
                        >
                            {({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
                                <Form>
                                    <div className="mt-24 text-left">
                                        <div className="w-7/12 mx-auto ">
                                            <div>
                                                <div className="text-gray-50 text-3xl font-bold font-raleway">Welcome back</div>
                                                <div className="text-gray-100 mt-2">Welcome back! Please enter your details.</div>
                                            </div>
                                            <div className="mt-6">
                                                <div className="space-y-5">
                                                    <div>
                                                        <label htmlFor="password" className="text-sm">
                                                            Password
                                                        </label>
                                                        <PasswordInput name="password" placeholder="Enter password"
                                                            value={values.password}
                                                            onChange={(e: any) => handleChange(e)}
                                                            onBlur={handleBlur}
                                                        />
                                                        <ErrorMessage name="password" component={"div"} className="text-red-600 text-sm text-left" />

                                                    </div>
                                                    <div>
                                                        <label htmlFor="password_confirmation" className="text-sm">
                                                            Password Confirmation
                                                        </label>
                                                        <PasswordInput name="password_confirmation" placeholder="Re-Enter password"
                                                            value={values.password_confirmation}
                                                            onChange={(e: any) => handleChange(e)}
                                                            onBlur={handleBlur}
                                                        />
                                                        <ErrorMessage name="password_confirmation" component={"div"} className="text-red-600 text-sm text-left" />

                                                    </div>
                                                    
                                                    <div className="space-y-4">
                                                        <Button type="submit" className="w-full">
                                                            {
                                                                isSubmitting ? <svg className="w-5 h-5" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                                    viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                                                    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                                                        <animateTransform
                                                                            attributeName="transform"
                                                                            attributeType="XML"
                                                                            type="rotate"
                                                                            dur="1s"
                                                                            from="0 50 50"
                                                                            to="360 50 50"
                                                                            repeatCount="indefinite" />
                                                                    </path>
                                                                </svg> : "Reset Password"
                                                            }
                                                        </Button>
                                                     
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm font-normal text-gray-50">
                                                            Don't have an account <Link href="/signup" className="font-semibold text-base text-cyan-200 font-inter"> Sign up</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div style={{ background: "linear-gradient(45deg, #083F62 0%, #25AEA4 100%)" }}
                        className="w-6/12 flex justify-center items-center container  md:mx-auto md:px-12">

                        <div className="">
                            <div className="self text-gray-50 text-[64px] font-extrabold font-raleway leading-tight">Welcome to Wokpa Podcast Platform</div>
                            <div className="w-[558px] text-gray-100 text-[20px] font-normal leading-normal">Unlock the power of podcasting. Log in to Wokpa and access a world of possibilities tailored to your podcasting journey.</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

