"use client";

import Button from "@/components/button";
import Modal from "@/components/modal";
import OtpInput from 'react-otp-input';
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { resendUserOTP } from "@/app/api/auth";
import { APICall } from "@/utils";
import { importPodcast, initiatePodcastImport } from "@/app/api/publishers";
import { useRouter } from "next/navigation";


const urlPattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

const ImportPodcast = () => {
    const user = useAppSelector(state => state.auth.user);

    const [otp, setOtp] = useState("");
    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(0);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleInitiateImport = async () => {
        try {
            setLoading(true);
            console.log(link)
            const response = await APICall(initiatePodcastImport, link);
            setShowOtpModal(true);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            if (error.response) {
                toast(error.response, { type: "error" })
            }
        }
    }

    const handleImport = async () => {
        try {
            setLoading(true);
            const response = await importPodcast(link, otp);
            toast(response.data.message, { type: "success" })
            router.push("/dashboard")
            setShowOtpModal(false);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            if (error.response) {
                toast(error.response.message, { type: "error" })
            }
        }
    }

    const handleResendOtp = async () => {
        try {
            if (timer != 0)
                return;
            const response = await handleInitiateImport();
            setTimer(60);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const _timer = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(_timer);
    }, [timer]);


    return (
        <div id="dashboard">
            <Modal size="md" open={showOtpModal} onClose={(val) => setShowOtpModal(val)}>
                <div className="border-b text-center text-2xl font-raleway font-bold py-5">
                    Import podcast confirmation code
                </div>
                <div className="py-10 text-center">
                    <div className="font-medium">
                        Vefication code has been sent to your email address
                    </div>

                    <div>
                        <p className="mt-2 text-[#EAECF0]">
                            Input the code sent to your email
                        </p>
                        <div className="mt-2">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                inputType="password"
                                renderSeparator={" "}
                                containerStyle={"justify-center"}
                                inputStyle={"border border-slate-600 outline-none text-6xl mx-1 !w-14 h-12 md:!w-20 md:h-[4.6rem] disabled:opacity-70 rounded-lg font-inter text-slate-600"}
                                renderInput={(props) => <input  {...props} autoComplete="off" name="otp" disabled={verifying} />}
                            />
                            {timer !== 0 ? <div className="text-center mt-4">
                                resend otp in {timer} seconds
                            </div> :
                                <div onClick={handleResendOtp} className="text-blue-600 underline cursor-pointe mt-4 cursor-pointer">resend to email</div>
                            }
                        </div>
                    </div>
                    <div className="mt-8">
                        <Button disabled={otp.length < 6} onClick={handleImport} className="!text-sm !py-[0.63rem] text-center disabled:opacity-80 disabled:cursor-not-allowed">
                            {loading ? <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                            </svg> :
                                "Confirm Code & finish importing"}

                        </Button>
                    </div>
                </div>
            </Modal>
            <div className="relative">
                <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium">
                        Dashboard
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Import Podcast
                    </div>

                </div>
            </div>
            <div className="mt-8">
                <div className="pr-5">
                    <div className={`font-bold text-3xl pb-2 font-raleway`}>
                        Import Podcast
                    </div>
                    <div className="mt-2">
                        <div className="text-sm">
                            Importing your podcast from existing feed is the easiest and fastest way to copy your podcasts and <br /> migrate to our platform.
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="text-lg font-medium">
                        Step 1: Copy and paste your RSS link
                    </div>
                    <div className="mt-2">
                        <div className="">
                            Copy a link from your original website and paste it below. We support RSS feeds <br /> containing mp3, mp4, m4a, wav, 3gp ,aac, amr, flac, ogg, ra, wma, asf files.
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="md:w-6/12">
                            <input value={link} onChange={(event) => {
                                setLink(event.target.value);
                            }} type="text" name="link" placeholder="Paste here link of your rss feed" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                            <div className="text-sm text-red-600">{error}</div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button onClick={() => {
                            if (urlPattern.test(link)) {
                                handleInitiateImport();
                                return;
                            }

                            setError("Please input a valid link")
                        }} className="text-center">
                            {loading ? <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                            </svg> :
                                "Import podcast"}
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ImportPodcast
