'use client'

import Button from "../../../components/button";
import WokpaLogo from "../../../components/wokpa-logo";
import Input from "../../../components/input";
import Link from "next/link";

export default function ResetSuccessful() {
    return (
        <div>
            <div className="">
                <div className="bg-dark contianer md:px-24 py-8 min-h-screen">
                    <div className="text-center">
                        <WokpaLogo />
                    </div>
                    <div className="py-6 px-16 mt-8">
                        <div className="flex items-center justify-center gap-8">
                            <div className="w-4/12">
                                <div className="bg-[#141414] p-8 flex flex-col gap-6 rounded-xl text-center">
                                    <div className="text-center">
                                        <svg className="inline" width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="5" y="5" width="56" height="56" rx="28" fill="#BEE7E4" />
                                            <path d="M38.8333 29.4999C38.8333 28.9028 38.6055 28.3057 38.1499 27.8501C37.6943 27.3945 37.0972 27.1667 36.5 27.1667M36.5 36.5C40.366 36.5 43.5 33.366 43.5 29.5C43.5 25.634 40.366 22.5 36.5 22.5C32.634 22.5 29.5 25.634 29.5 29.5C29.5 29.8193 29.5214 30.1336 29.5628 30.4415C29.6309 30.948 29.6649 31.2013 29.642 31.3615C29.6181 31.5284 29.5877 31.6184 29.5055 31.7655C29.4265 31.9068 29.2873 32.046 29.009 32.3243L23.0467 38.2866C22.845 38.4884 22.7441 38.5893 22.6719 38.707C22.608 38.8114 22.5608 38.9252 22.5322 39.0442C22.5 39.1785 22.5 39.3212 22.5 39.6065V41.6333C22.5 42.2867 22.5 42.6134 22.6272 42.863C22.739 43.0825 22.9175 43.261 23.137 43.3728C23.3866 43.5 23.7133 43.5 24.3667 43.5H27.1667V41.1667H29.5V38.8333H31.8333L33.6757 36.991C33.954 36.7127 34.0932 36.5735 34.2345 36.4945C34.3816 36.4123 34.4716 36.3819 34.6385 36.358C34.7987 36.3351 35.052 36.3691 35.5585 36.4372C35.8664 36.4786 36.1807 36.5 36.5 36.5Z" stroke="#21A79C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x="5" y="5" width="56" height="56" rx="28" stroke="#E5F5F4" strokeWidth="10" />
                                        </svg>
                                    </div>
                                    <div className="font-raleway text-cente text-4xl">
                                        Forgot Password
                                    </div>

                                    <div className="font-lg ">
                                        Your password has been reset successfully reset. Click the button bellow to login
                                    </div>
                                    <div className="space-y-5 text-left">
                                        <div className="space-y-4">
                                            <Button className="w-full">
                                                Continue
                                            </Button>

                                        </div>
                                        <div className="mt-8 text-sm font-semibold ">
                                            <Link href="/login" className="flex justify-center gap-2 items-center">

                                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.3334 6.99984H1.66669M1.66669 6.99984L7.50002 12.8332M1.66669 6.99984L7.50002 1.1665" stroke="#FCFCFD" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span>Back to login</span>
                                            </Link>

                                        </div>
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
