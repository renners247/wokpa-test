'use client';
import { authLogin, resetAuth, updateProfile } from "@/redux/auth";
import Button from "../../../components/button";
import Input from "../../../components/input";
import PasswordInput from "../../../components/password-input";
import Link from "next/link";
import * as Yup from "yup"
import { useAppDispatch } from "@/hooks";
import { APICall } from "@/utils";
import { getProfile, googleLogin, login } from "@/app/api/auth";
import { useRouter } from "next/navigation";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image"
import { resetPodcast } from "@/redux/podcast";
import { resetAnalytics } from "@/redux/analytics";

const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required!'),
    password: Yup.string()
        .required('Password is required!'),
});


export default function Login() {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [error, setError] = useState("");
    const navigate = useRouter();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: tokenResponse => handleGoogleLogin(tokenResponse.access_token),
        onError: errorResponse => console.log(errorResponse)
    });


    const handleGoogleLogin = async (token: string) => {
        try {
            // setError("");
            if (loading) return;
            setLoading(true);
            const response = await googleLogin(token);
            dispatch(resetAuth());
            dispatch(resetPodcast());
            dispatch(resetAnalytics());

            dispatch(authLogin({ token: response.data.data.token, user: response.data.data.user }));
            const profileResponse = await getProfile();
            dispatch(updateProfile({ profile: profileResponse.data.data }));
            navigate.push("/dashboard")
            if (response.data.data.user.podcast_goal_updated_at) {
                navigate.push("/dashboard")
            } else {
                navigate.push("/onboarding/one");
                return;
            }

            if (!response.data.data.user.current_subscription) {
                navigate.push("/pricing")
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


    const handleLogin = async (values: any, setSubmitting: (val: boolean) => void) => {
        try {
            dispatch(resetAuth());

            setSubmitting(true);
            const response = await APICall(login, values);
            dispatch(authLogin({ token: response.data.data.token, user: response.data.data.user }));
            const profileResponse = await APICall(getProfile, [], true);
            dispatch(updateProfile({ profile: profileResponse.data.data }));

            if (response.data.data.user.podcast_goal_updated_at) {
                navigate.push("/dashboard")
            } else {
                navigate.push("/onboarding/one");
            }
            setSubmitting(false);
        } catch (error) {
            console.log(error)
            setSubmitting(false);
        }
    }

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
                                email: '',
                                password: '',
                            }}
                            validationSchema={loginValidationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log("submitting")
                                handleLogin(values, setSubmitting)
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
                                                            Email
                                                        </label>
                                                        {/* <Input name="email" placeholder="" /> */}
                                                        <Field type="text" name="email" placeholder="Enter email" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                        <ErrorMessage name="email" component={"div"} className="text-red-600 text-sm text-left" />

                                                    </div>
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
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <input type="checkbox" name="" id="" />
                                                            <label htmlFor="password" className="text-sm ml-2">
                                                                Remember me
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <Link href="/forgot-password" className="text-sm font-slate-300">Forgot password</Link>
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
                                                                </svg> : "Sign In"
                                                            }
                                                        </Button>
                                                        <Button onClick={() => loginWithGoogle()} type="button" className="w-full !bg-white from-white to-white">
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
                                                                    Sign in with Google
                                                                </div>
                                                            </div>
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

