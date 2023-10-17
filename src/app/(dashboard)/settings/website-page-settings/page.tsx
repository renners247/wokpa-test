"use client";

import { updateWebsiteSettings } from "@/app/api/publishers";
import Button from "@/components/button";
import Input from "@/components/input";
import PasswordInput from "@/components/password-input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { addPhoneMethod } from "@/utils/yup-phone";
import { Switch } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup"


addPhoneMethod();


const schema = Yup.object().shape({
    website: Yup.string().matches(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, "Invalid URL"),
    itunes: Yup.string().matches(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, "Invalid URL"),
    twitter: Yup.string().matches(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, "Invalid URL"),
    facebook: Yup.string().matches(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, "Invalid URL"),
    phone: (Yup.string() as any)?.phone("Phone number is invalid!"),
    other: Yup.string().matches(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, "Invalid URL"),
});



const WebsitePageSettings = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const handleSubmit = async (values: any, setSubmitting: (val: boolean) => void) => {
        try {
            setSubmitting(true);
            const response = await updateWebsiteSettings(values);
            toast(response.data.message, { type: "success" })
            setSubmitting(false);
        } catch (error: any) {
            if (error.response) {
                toast(error.response.data.message, { type: "error" })
            }
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

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("submitting")
                    handleSubmit(values, setSubmitting)
                }}
            >
                {({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
                    <Form>
                        <div className="mt-8">
                            <div className="pr-5">
                                <div className={`font-bold text-xl pb-2`}>
                                    Website page settings
                                </div>
                                <div>
                                    <p className="text-sm">
                                        In this section you can configure your Podcast web page.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div>
                                    <div className="space-y-8">
                                        <div className="flex">
                                            <div className="w-8/12">
                                                <label htmlFor="password" className="text-sm font-medium">
                                                    Website
                                                </label>
                                                <Field name="website" placeholder="www.wokpa.com/emaxpodcast" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                <ErrorMessage name="website" component={"div"} className="text-red-600 text-sm text-left" />
                                                <div className="text-xs text-[#D0D5DD] mt-1">
                                                    Please note: this is the website associated with your podcast, it also sets the tag of your RSS feed
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-5">
                                            <div className="md:w-6/12">
                                                <label htmlFor="password" className="text-sm font-medium">
                                                    Itunes
                                                </label>
                                                <Field name="itunes" placeholder="www.wokpa.com/emaxpodcast" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                <ErrorMessage name="website" component={"div"} className="text-red-600 text-sm text-left" />
                                            </div>
                                            <div className="md:w-6/12">
                                                <label htmlFor="email" className="text-sm font-medium">
                                                    Twitter
                                                </label>
                                                <Field name="twitter" placeholder="www.wokpa.com/emaxpodcast" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                <ErrorMessage name="twitter" component={"div"} className="text-red-600 text-sm text-left" />
                                            </div>
                                        </div>
                                        <div className="flex gap-5">
                                            <div className="md:w-6/12">
                                                <label htmlFor="password" className="text-sm font-medium">
                                                    Facebook
                                                </label>
                                                <Field name="facebook" placeholder="www.wokpa.com/emaxpodcast" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                <ErrorMessage name="facebook" component={"div"} className="text-red-600 text-sm text-left" />
                                            </div>
                                            <div className="md:w-6/12">
                                                <label htmlFor="email" className="text-sm font-medium">
                                                    Youtube
                                                </label>
                                                <Field name="youtube" placeholder="www.wokpa.com/emaxpodcast" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                <ErrorMessage name="youtube" component={"div"} className="text-red-600 text-sm text-left" />
                                            </div>
                                        </div>
                                        <div className="flex gap-5">
                                            <div className="md:w-6/12">
                                                <label htmlFor="password" className="text-sm font-medium">
                                                    Telephone number
                                                </label>
                                                <Field name="phone" placeholder="www.wokpa.com/emaxpodcast" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                <ErrorMessage name="phone" component={"div"} className="text-red-600 text-sm text-left" />
                                            </div>
                                            <div className="md:w-6/12">
                                                <label htmlFor="email" className="text-sm font-medium">
                                                    Others
                                                </label>
                                                <Field name="others" placeholder="www.wokpa.com/emaxpodcast" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                <ErrorMessage name="others" component={"div"} className="text-red-600 text-sm text-left" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-right space-x-4">
                                        <Button className="text-sm">Cancel</Button>
                                        <Button className="text-sm ml-2">Save Changes</Button>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>

        </div >
    )
}

export default WebsitePageSettings

