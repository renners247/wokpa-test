'use client'

import Button from "../../../components/button";
import WokpaLogo from "../../../components/wokpa-logo";
import Input from "../../../components/input";
import Link from "next/link";

import * as Yup from "yup"
import { Formik, Form, ErrorMessage, Field } from "formik";
import { APICall } from "@/utils";
import { forgotPassword, verifyEmail } from "@/app/api/auth";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useEffectOnce } from "react-use";


export default function VerifyEmail() {
    const params = useSearchParams();
    const router = useRouter();

    const handleVerifyEmail = async (token: string) => {
        try {
            const response = await APICall(verifyEmail, token, true);
            router.push("/login");

        } catch (error) {

        }
    }

    useEffectOnce(() => {
        const token = params.get("token");
        if (!token) {
            router.push("/login");
            return;
        }
        handleVerifyEmail(token);
    })

    return (
        <div>
            <div className="">
                <div className="bg-dark contianer md:px-24 py-8 min-h-screen">
                    <div className="text-center">
                        <WokpaLogo />
                    </div>
                    <div className="py-6 px-16 mt-8">
                        <div className="flex items-center justify-center gap-8">
                            <div className="w-[38%]">
                                <div className="bg-[#141414] p-8 space-y-4 rounded-xl text-center">
                                    <svg className="inline" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="4" y="4" width="48" height="48" rx="24" fill="#D1FADF" />
                                        <path d="M23.5 28L26.5 31L32.5 25M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z" stroke="#039855" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <rect x="4" y="4" width="48" height="48" rx="24" stroke="#ECFDF3" strokeWidth="8" />
                                    </svg>

                                    <div className="text-center font-semibold text-lg">
                                        Verify email
                                    </div>

                                    <div className="text-sm ">
                                        Verify your email address
                                    </div>
                                    <div className="mt-8 text-sm font-semibold ">
                                        <Link href="/login" className="rounded-[40px] py-3 px-5 bg-gradient-to-r from-[#083F62] to-[#25AEA4] text-white font-medium  inline-block w-full">
                                            Go to login
                                        </Link>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
