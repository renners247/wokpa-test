'use client';

import Button from "@/components/button";
import Input from "@/components/input";
import { APICall, getIcon } from "@/utils";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import moment from "moment"
import { addPhoneMethod } from "@/utils/yup-phone";
import { verifyUser, resendUserOTP, register, googleLogin } from "@/app/api/auth";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from "@/hooks";
import { resetAuth, authLogin } from "@/redux/auth";
import { PublishersCategory } from "@/models/publishers-category";
import { getPublisherCategories } from "@/app/api/general";
import PasswordInput from "@/components/password-input";
import { getNames } from "country-list"


const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

addPhoneMethod();

const signupValidationSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'First name is too short!')
        .max(35, 'First name is too Long!')
        .required('First name is required'),
    last_name: Yup.string()
        .min(2, 'Last name is too short!')
        .max(35, 'Last name is too Long!')
        .required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email Required!'),
    country: Yup.string()
        .required('Country is required'),
    phone: (Yup.string() as any)?.phone("Phone number is invalid!").required("Phone number is required!"),
    date_of_birth: Yup.date().required("Date of birth is required"),
    publisher_category: Yup.string()
        .required('Publisher Category is required'),
    password: Yup.string()
        .matches(passwordRules, { message: "Please create a stronger password!" })
        .required("Password is required"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match!')
        .required("Confirm password is required!"),
    company_name: Yup.string(),
    terms: Yup.boolean().isTrue("Accept Terms & Conditions to continue registration")
});


export default function SignUpPage() {
    const navigate = useRouter();
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState("")
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");


    const [timer, setTimer] = useState(0);
    const [verifying, setVerifying] = useState(false);
    const [resent, setResent] = useState(false);

    const [publishersCategory, setPublishersCategory] = useState<PublishersCategory[]>([])

    const dispatch = useAppDispatch();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => handleGoogleLogin(tokenResponse.access_token),
        onError: errorResponse => console.log(errorResponse)
    });


    const handleGoogleLogin = async (token: string) => {
        try {
            // setError("");
            if (loading) return;
            setLoading(true);

            // loadingBarRef.current?.continuousStart();

            const response = await googleLogin(token);
            dispatch(resetAuth());

            dispatch(authLogin({ token: response.data.data.token, user: response.data.data.user }));
            if (response.data.data.user.podcast_goal_updated_at) {
                navigate.push("/dashboard")
            } else {
                navigate.push("/onboarding/one");
            }

            // loadingBarRef.current?.complete();
            toast(response.data.message);
            setLoading(false);

        } catch (error: any) {
            setLoading(false);
            // loadingBarRef.current?.complete();
            if (error.response)
                setError(error.response.data.message)

        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer == 0)
                return;
            const t = timer - 1;
            setTimer(t)
        }, 1000)

        return () => clearInterval(interval);
    });

    useEffect(() => {
        (async () => {
            try {
                const response = await getPublisherCategories();
                setPublishersCategory(response.data.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    useEffect(() => {
        if (otp.length == 6) {
            setVerifying(true);
            handleVerifyOTP();
        }
    }, [otp]);

    const handleVerifyOTP = async () => {
        try {
            const response = await APICall(verifyUser, { phone, otp }, true);
            navigate.push("/login");
            setVerifying(false);
        } catch (error) {
            setVerifying(false);

        }
    }

    const handleResendOtp = async () => {
        try {
            const response = await APICall(resendUserOTP, { phone }, true);
            setTimer(60);
            toast(response.data.message);
        } catch (error) {

        }
    }

    const handleRegister = async (values: any, setSubmitting: (val: boolean) => void) => {
        try {
            setSubmitting(true);
            setPhone(values.phone)
            const response = await APICall(register, values, true);
            navigate.push("/login");

            setTimer(60);
            setRegistered(true);
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }

    }

    return (
        <div className="flex-1">
            <div className="">
                <div className="flex min-h-screen">
                    <div className="md:w-6/12 w-full bg-dark contianer md:px-8 py-8 max-h-screen overflow-auto">
                        <div className="md:px-0 px-6">
                            <Image width={138} height={48} src={"/icons/wokpa.png"} alt="" />
                        </div>
                        <div className="mt-24 text-left">
                            <div className="md:w-9/12 mx-auto md:px-0 px-6">
                                <div className="flex-1">
                                    <div className="text-gray-50 text-3xl font-bold font-raleway">Sign up</div>
                                    <div className="text-gray-100 mt-2">Create a free account today and start creating amazing podcasts.</div>
                                </div>
                                <Formik
                                    initialValues={{
                                        first_name: "",
                                        last_name: "",
                                        email: "",
                                        country: "",
                                        phone: "",
                                        publisher_category: "",
                                        date_of_birth: "",
                                        password: "",
                                        password_confirmation: "",
                                        company_name: "",
                                        terms: false,

                                    }}
                                    validationSchema={signupValidationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        console.log("submitting")
                                        handleRegister(values, setSubmitting)
                                    }}
                                >
                                    {({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
                                        <Form>
                                            <div className="mt-6">
                                                <div className="space-y-5">
                                                    <div className="flex md:flex-row flex-col gap-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="password" className="text-sm">
                                                                First name *
                                                            </label>
                                                            <Field type="text" name="first_name" placeholder="Enter first name" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="first_name" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="last_name" className="text-sm">
                                                                Last name *
                                                            </label>
                                                            <Field type="text" name="last_name" placeholder="Enter last name" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="last_name" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-row flex-col gap-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="company_name" className="text-sm">
                                                                Company name
                                                            </label>
                                                            <Field type="text" name="company_name" placeholder="Enter comapany name" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="company_name" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="publisher_category" className="text-sm">
                                                                Publisher category *
                                                            </label>
                                                            <Field as="select" type="text" name="publisher_category" placeholder="" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                                                <option value="">Choose publishers category</option>
                                                                {
                                                                    publishersCategory.map((category) => {
                                                                        return <option key={category.id + "pub"} value={category.name}>{category.name}</option>
                                                                    })
                                                                }
                                                            </Field>
                                                            <ErrorMessage name="publisher_category" component={"div"} className="text-red-600 text-sm text-left" />

                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-row flex-col gap-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="password" className="text-sm">
                                                                Email *
                                                            </label>
                                                            <Field type="text" name="email" placeholder="Enter email" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="email" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="company_name" className="text-sm">
                                                                Country *
                                                            </label>
                                                            <Field as="select" name="country" placeholder="" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                                                <option value="">Select country</option>
                                                                {
                                                                    getNames().map((name) => {
                                                                        return <option key={name} value={name}>{name}</option>
                                                                    })
                                                                }
                                                            </Field>
                                                            <ErrorMessage name="country" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-row flex-col gap-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="phone" className="text-sm">
                                                                Phone *
                                                            </label>
                                                            <Field type="text" name="phone" placeholder="Enter phone number" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="phone" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="phone" className="text-sm">
                                                                Date of birth *
                                                            </label>
                                                            <Field type="date" name="date_of_birth" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="date_of_birth" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                    </div>
                                                    <div className="flex md:flex-row flex-col gap-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="password" className="text-sm">
                                                                Password *
                                                            </label>
                                                            <PasswordInput name="password" placeholder="Create a password"
                                                                value={values.password}
                                                                onChange={(e: any) => handleChange(e)}
                                                                onBlur={handleBlur}
                                                            />
                                                            <ErrorMessage name="password" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="password" className="text-sm">
                                                                Confirm Password *
                                                            </label>
                                                            <PasswordInput name="password_confirmation" placeholder="Re-enter password"
                                                                value={values.password_confirmation}
                                                                onChange={(e: any) => handleChange(e)}
                                                                onBlur={handleBlur}
                                                            />
                                                            <ErrorMessage name="password_confirmation" component={"div"} className="text-red-600 text-sm text-left" />

                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className="flex-1">
                                                            <Field type="checkbox" name="terms" id="" />
                                                            <label htmlFor="password" className="text-sm ml-2">
                                                                By signing up. you are agreeing to our <Link href="/" className=" text-[#25AEA4]"> Terms & Conditions </Link> and <Link href="/" className=" text-[#25AEA4]"> Privacy Policy.</Link>
                                                            </label>

                                                            <ErrorMessage name="terms" component={"div"} className="text-red-600 text-sm text-left" />

                                                        </div>

                                                    </div>
                                                    <div className="space-y-4">
                                                        <Button type="submit" className="w-full text-center">
                                                            {
                                                                isSubmitting ? <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                                                </svg> : "Get started"
                                                            }

                                                        </Button>
                                                        <Button type="button" onClick={() => loginWithGoogle()} className="w-full !bg-white from-white to-white">

                                                            <div className="flex justify-center items-center gap-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                                    <g id="Social icon" clipPath="url(#clip0_2654_70290)">
                                                                        <path id="Vector" d="M24.266 12.2765C24.266 11.4608 24.1999 10.6406 24.0588 9.83813H12.74V14.4591H19.2217C18.9528 15.9495 18.0885 17.2679 16.823 18.1056V21.104H20.69C22.9608 19.014 24.266 15.9274 24.266 12.2765Z" fill="#4285F4" />
                                                                        <path id="Vector_2" d="M12.74 24.0008C15.9764 24.0008 18.7058 22.9382 20.6944 21.1039L16.8274 18.1055C15.7516 18.8375 14.3626 19.252 12.7444 19.252C9.61376 19.252 6.95934 17.1399 6.00693 14.3003H2.01648V17.3912C4.05359 21.4434 8.20278 24.0008 12.74 24.0008Z" fill="#34A853" />
                                                                        <path id="Vector_3" d="M6.00253 14.3002C5.49987 12.8099 5.49987 11.196 6.00253 9.70569V6.61475H2.01649C0.31449 10.0055 0.31449 14.0004 2.01649 17.3912L6.00253 14.3002Z" fill="#FBBC04" />
                                                                        <path id="Vector_4" d="M12.74 4.74966C14.4508 4.7232 16.1043 5.36697 17.3433 6.54867L20.7694 3.12262C18.6 1.0855 15.7207 -0.034466 12.74 0.000808666C8.20277 0.000808666 4.05359 2.55822 2.01648 6.61481L6.00252 9.70575C6.95052 6.86173 9.60935 4.74966 12.74 4.74966Z" fill="#EA4335" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2654_70290">
                                                                            <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                                <div className="text-slate-700 font-medium">
                                                                    Sign up with Google
                                                                </div>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-sm font-normal text-gray-50">
                                                            Already have an account <Link href="/login" className="font-semibold text-base text-cyan-200 font-inter"> Log in</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: "linear-gradient(45deg, #083F62 0%, #25AEA4 100%)" }}
                        className="w-6/12 md:flex hidden justify-center items-center container  md:mx-auto md:px-12 max-h-screen">

                        <div className="">
                            <div className="self text-gray-50 text-[64px] font-extrabold font-raleway leading-tight">Join Wokpa Podcast Platform</div>
                            <div className="w-[558px] text-gray-100 text-[20px] font-normal leading-normal">
                                Embark on your podcasting journey. Register with Wokpa and unlock a suite of tools and features to bring your podcast to life.</div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}
