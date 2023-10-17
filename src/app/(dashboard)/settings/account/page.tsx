"use client";

import { changePassword } from "@/app/api/auth";
import { getProfile, getPublisherCategories } from "@/app/api/general";
import { udpateUserProfile, updateWebsiteSettings } from "@/app/api/publishers";
import Button from "@/components/button";
import Input from "@/components/input";
import PasswordInput from "@/components/password-input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { PublishersCategory } from "@/models/publishers-category";
import { updateProfile } from "@/redux/auth";
import { APICall } from "@/utils";
import { addPhoneMethod } from "@/utils/yup-phone";
import { Switch } from "@headlessui/react";
import { getNames } from "country-list";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import * as Yup from "yup"


addPhoneMethod();
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const schema = Yup.object().shape({
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
    publisher_category: Yup.string()
        .required('Publisher Category is required'),
    // password: Yup.string()
    //     .matches(passwordRules, { message: "Please create a stronger password!" })
    //     .required("Password is required"),
    // password_confirmation: Yup.string()
    //     .oneOf([Yup.ref('password')], 'Passwords must match!')
    //     .required("Confirm password is required!"),
    company_name: Yup.string(),
    terms: Yup.boolean().isTrue("Accept Terms & Conditions to continue registration")
});


const passwordSchema = Yup.object().shape({
    current_password: Yup.string()
        .required("Password is required"),
    password: Yup.string()
        .matches(passwordRules, { message: "Please create a stronger password!" })
        .required("Password is required"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match!')
        .required("Confirm password is required!"),
});





const ProfileSettings = () => {
    const profile = useAppSelector(state => state.auth.profile);
    const user = useAppSelector(state => state.auth.user);

    const dispatch = useAppDispatch();
    const [publishersCategory, setPublishersCategory] = useState<PublishersCategory[]>([])
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
    const [profilePicImg, setProfilePicImg] = useState<any>("");



    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length) {
            setProfilePicFile(acceptedFiles[0]);

            var reader = new FileReader();
            reader.onloadend = function () {
                setProfilePicImg(reader.result);
            }
            console.log(reader)
            reader.readAsDataURL(acceptedFiles[0]);
        }

    }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, maxSize: 2000000000, multiple: false, accept: { 'image/*': [] } })

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


    const handleSubmit = async (values: any, setSubmitting: (val: boolean) => void) => {
        try {
            setSubmitting(true);
            const data = { ...values, profile_image: profilePicFile };
            const response = await APICall(udpateUserProfile, [values], true);
            const profileResponse = await getProfile();
            dispatch(updateProfile({ profile: profileResponse.data.data }));
            setSubmitting(false);
        } catch (error: any) {

            setSubmitting(false);
        }
    }

    const handleChangePassword = async (values: any, setSubmitting: (val: boolean) => void) => {
        try {
            setSubmitting(true);
            const response = await APICall(changePassword, [values], true);
            setSubmitting(false);
        } catch (error: any) {

            setSubmitting(false);
        }
    }

    return (
        <div id="dashboard">

            <div className="relative">
                <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium">
                        Emax podcast
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium">
                        Settings
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Website page settings
                    </div>

                </div>
            </div>

            <div className="pr-5 mt-8">
                <div className={`font-bold text-xl pb-2`}>
                    Account settings
                </div>
                <div>
                    <p className="text-sm">
                        Manage and update you profile pic and personal details. These will be displayed in your host profile page
                    </p>
                </div>
            </div>


            <div className="flex gap-6  mt-8">
                <div className="w-[65%]">
                    <div className="flex gap-6">
                        <div className="w-[130px] h-[130px] ob bg-slate-100 rounded-lg">
                            <img className="w-[130px] h-[130px] object-cover" src={profilePicImg || profile?.profile_image_url} />
                        </div>
                        <div>
                            <div   {...getRootProps({ className: 'h-full cursor-pointer dropzone border-2 rounded-lg bg-[#18181B] w-[358px] border-[#98A2B3] px-6 py-2 text-center' })}>
                                <input {...getInputProps()} />
                                {
                                    profilePicFile ? profilePicFile.name : <div className="text-center space-y-4">
                                        <svg className="inline" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="3" width="40" height="40" rx="20" fill="#F5F5F5" />
                                            <path d="M19.6665 26.3333L22.9998 23M22.9998 23L26.3332 26.3333M22.9998 23V30.5M29.6665 26.9524C30.6844 26.1117 31.3332 24.8399 31.3332 23.4167C31.3332 20.8854 29.2811 18.8333 26.7498 18.8333C26.5677 18.8333 26.3974 18.7383 26.3049 18.5814C25.2182 16.7374 23.2119 15.5 20.9165 15.5C17.4647 15.5 14.6665 18.2982 14.6665 21.75C14.6665 23.4718 15.3627 25.0309 16.489 26.1613" stroke="#757575" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x="3" y="3" width="40" height="40" rx="20" stroke="#FAFAFA" strokeWidth="6" />
                                        </svg>
                                        <div className="text-xs">
                                            <span className="font-semibold text-[#36FFE8] text-sm">Click to upload</span> or drag and drop
                                        </div>
                                        <div className="text-xs">
                                            SVG, PNG, JPG or GIF (max. 800x400px)
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <Formik
                        initialValues={{
                            first_name: profile?.first_name,
                            last_name: profile?.last_name,
                            email: profile?.email,
                            country: "",
                            phone: profile?.phone,
                            publisher_category: "",
                            company_name: profile?.company_name,

                        }}
                        validationSchema={schema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values, setSubmitting)
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
                                        </div>

                                        <div className="space-x-4">
                                            <Button type="submit" className="text-center font-semibold !py-[10px] !px-[18px]">
                                                {
                                                    isSubmitting ?
                                                        <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                                        </svg> : "Save changes"
                                                }
                                            </Button>
                                            <Button className="!from-white !to-white !text-[#042946] font-semibold !py-[10px] !px-[18px]">
                                                Cancel
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                <div className="flex-1">
                    <div className="bg-[#18181B] rounded-lg px-6 py-8">
                        <div className="space-y-6">
                            <div>
                                <div className="text-sm">
                                    YOUR CURRENT PLAN
                                </div>
                                <div className="font-bold text-lg">
                                    Current plan - {user?.current_subscription?.name}
                                </div>
                            </div>
                            <div>
                                <Button className="!text-sm font-normal">Upgrade now</Button>
                            </div>
                            <div className="text-xs">
                                Your account was created on: {moment(profile?.created_at).format("MMM DD, YYYY")}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className="mt-8">

                <div className="pr-5 mt-8">
                    <div className={`font-bold text-xl pb-2`}>
                        Change Password
                    </div>
                    <div>
                        <p className="text-sm">
                            Manage and update you profile pic and personal details. These will be displayed in your host profile page
                        </p>
                    </div>
                </div>


                <div className="flex gap-6">
                    <div className="w-[65%]">

                        <Formik
                            initialValues={{
                                current_password: "",
                                password: "",
                                password_confirmation: ""

                            }}
                            validationSchema={passwordSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                handleChangePassword(values, setSubmitting)
                            }}
                        >
                            {({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
                                <Form>
                                    <div className="mt-6">
                                        <div className="space-y-5">
                                            <div className="flex md:flex-row flex-col gap-4">
                                                <div className="flex-1">
                                                    <label htmlFor="current_password" className="text-sm">
                                                        Current Password *
                                                    </label>
                                                    <PasswordInput name="current_password" placeholder="Enter your password"
                                                        value={values.current_password}
                                                        onChange={(e: any) => handleChange(e)}
                                                        onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage name="current_password" component={"div"} className="text-red-600 text-sm text-left" />
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

                                            </div>
                                            <div className="flex md:flex-row flex-col gap-4">
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

                                            <div className="space-x-4">
                                                <Button type="submit" className="text-center font-semibold !py-[10px] !px-[18px]">
                                                    {
                                                        isSubmitting ?
                                                            <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                                            </svg> : "Save changes"
                                                    }
                                                </Button>
                                            </div>

                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                </div>

            </div>


        </div >
    )
}

export default ProfileSettings

