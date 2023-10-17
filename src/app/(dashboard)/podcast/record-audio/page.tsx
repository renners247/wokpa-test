"use client";

import { setup, isSupported } from "@loomhq/record-sdk";
import { oembed } from "@loomhq/loom-embed";
import { useEffect, useState } from "react";

import Link from "next/link";
import Input from "@/components/input";

const PUBLIC_APP_ID = "ebbac6ca-3981-4741-827c-2a23888c206d";
const BUTTON_ID = "loom-record-sdk-button";

const RecordNavbar = () => {
    return (
        <div className="flex justify-between py-3 items-center mb-4">
            <Link href={"/dashboard"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 19L19 5M5 5L19 19L5 5Z" stroke="#D0D5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
            <div className="text-center space-y-2">
                <svg className="inline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10L3 14M7.5 11V13M12 6V18M16.5 3V21M21 10V14" stroke="#F9FAFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="block text-sm">Record episode</span>
            </div>
            <div className="flex gap-6 items-center">
                <button className="py-2 bg-[#1570EF] px-5 rounded-full inline-flex gap-3 items-center font-bold text-sm">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99967 10.3333H4.99968C4.0693 10.3333 3.60411 10.3333 3.22558 10.4482C2.37331 10.7067 1.70637 11.3736 1.44783 12.2259C1.33301 12.6044 1.33301 13.0696 1.33301 14M12.6663 14V10M10.6663 12H14.6663M9.66634 5C9.66634 6.65685 8.3232 8 6.66634 8C5.00949 8 3.66634 6.65685 3.66634 5C3.66634 3.34315 5.00949 2 6.66634 2C8.3232 2 9.66634 3.34315 9.66634 5Z" stroke="#F0F9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="">Invite</span>
                </button>
                <div>
                    <button className="inline-flex items-center gap-2 text-sm font-medium">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.39504 19.3711L9.97949 20.6856C10.1532 21.0768 10.4368 21.4093 10.7957 21.6426C11.1547 21.8759 11.5736 22.0001 12.0017 22C12.4298 22.0001 12.8488 21.8759 13.2077 21.6426C13.5667 21.4093 13.8502 21.0768 14.0239 20.6856L14.6084 19.3711C14.8164 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5677 17.8941 17.0784 17.9478L18.5084 18.1C18.934 18.145 19.3636 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8714 16.635 20.9735 16.2103 20.951 15.7829C20.9285 15.3555 20.7825 14.9438 20.5306 14.5978L19.6839 13.4344C19.3825 13.0171 19.2214 12.5148 19.2239 12C19.2238 11.4866 19.3864 10.9864 19.6884 10.5711L20.535 9.40778C20.7869 9.06175 20.933 8.65007 20.9554 8.22267C20.9779 7.79528 20.8759 7.37054 20.6617 7C20.4478 6.62923 20.1309 6.32849 19.7495 6.13423C19.3681 5.93997 18.9385 5.86053 18.5128 5.90556L17.0828 6.05778C16.5722 6.11141 16.0576 6.00212 15.6128 5.74556C15.1699 5.48825 14.8199 5.09736 14.6128 4.62889L14.0239 3.31444C13.8502 2.92317 13.5667 2.59072 13.2077 2.3574C12.8488 2.12408 12.4298 1.99993 12.0017 2C11.5736 1.99993 11.1547 2.12408 10.7957 2.3574C10.4368 2.59072 10.1532 2.92317 9.97949 3.31444L9.39504 4.62889C9.18797 5.09736 8.83792 5.48825 8.39504 5.74556C7.95026 6.00212 7.43571 6.11141 6.92504 6.05778L5.4906 5.90556C5.06493 5.86053 4.63534 5.93997 4.25391 6.13423C3.87249 6.32849 3.55561 6.62923 3.34171 7C3.12753 7.37054 3.02549 7.79528 3.04798 8.22267C3.07046 8.65007 3.2165 9.06175 3.46838 9.40778L4.31504 10.5711C4.61698 10.9864 4.77958 11.4866 4.77949 12C4.77958 12.5134 4.61698 13.0137 4.31504 13.4289L3.46838 14.5922C3.2165 14.9382 3.07046 15.3499 3.04798 15.7773C3.02549 16.2047 3.12753 16.6295 3.34171 17C3.55582 17.3706 3.87274 17.6712 4.25411 17.8654C4.63548 18.0596 5.06496 18.1392 5.4906 18.0944L6.9206 17.9422C7.43127 17.8886 7.94581 17.9979 8.3906 18.2544C8.83513 18.511 9.18681 18.902 9.39504 19.3711Z" stroke="#2E90FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.9999 15C13.6568 15 14.9999 13.6569 14.9999 12C14.9999 10.3431 13.6568 9 11.9999 9C10.3431 9 8.99992 10.3431 8.99992 12C8.99992 13.6569 10.3431 15 11.9999 15Z" stroke="#2E90FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="">Call settings</span>
                    </button>
                </div>
                <div>
                    <button>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#E5F5F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#E5F5F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#E5F5F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

const Participant = () => {
    return (
        <div className="text-center">
            <svg className="inline" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="url(#paint0_linear_4782_16044)" />
                <defs>
                    <linearGradient id="paint0_linear_4782_16044" x1="0" y1="0" x2="40" y2="-4.16963e-09" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#C4C4C4" />
                        <stop offset="1" stop-color="#8699BF" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="font-inter font-bold text-[0.63rem]">Joseph Emmanuel</div>
            <div className="text-[#36FFE8] text-[0.63rem]">Co-host</div>
            <div className="text-center space-x-1">
                <button><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_4782_16052)">
                        <path d="M9.99967 6.26634V3.33301C9.99967 2.22844 9.10424 1.33301 7.99967 1.33301C7.2146 1.33301 6.53517 1.78535 6.20781 2.44363M7.99967 12.6663V14.6663M7.99967 12.6663C5.42235 12.6663 3.33301 10.577 3.33301 7.99967V6.66634M7.99967 12.6663C10.577 12.6663 12.6663 10.577 12.6663 7.99967V6.66634M5.33301 14.6663H10.6663M1.33301 1.33301L14.6663 14.6663M7.99967 9.99967C6.89511 9.99967 5.99967 9.10424 5.99967 7.99967V5.99967L9.41474 9.41303C9.05275 9.77546 8.55239 9.99967 7.99967 9.99967Z" stroke="#EAECF0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_4782_16052">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                </button>
                <button>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.99967 12.6667C3.99967 13.4 4.59967 14 5.33301 14H10.6663C11.3997 14 11.9997 13.4 11.9997 12.6667V4.66667H3.99967V12.6667ZM5.33301 6H10.6663V12.6667H5.33301V6ZM10.333 2.66667L9.66634 2H6.33301L5.66634 2.66667H3.33301V4H12.6663V2.66667H10.333Z" fill="#F04438" />
                    </svg>

                </button>
            </div>
        </div>
    )
}

const RecordAudio = () => {
    const [videoHTML, setVideoHTML] = useState("");


    useEffect(() => {
        async function setupLoom() {
            const { supported, error } = await isSupported();

            if (!supported) {
                console.warn(`Error setting up Loom: ${error}`);
                return;
            }

            const button = document.getElementById(BUTTON_ID);

            if (!button) {
                return;
            }

            const { configureButton } = await setup({
                publicAppId: PUBLIC_APP_ID,
            });

            const sdkButton = configureButton({ element: button });

            sdkButton.on("insert-click", async (video: any) => {
                const { html } = await oembed(video.sharedUrl, { width: 400 });
                setVideoHTML(html);
            });
        }

        setupLoom();
    }, []);

    return (
        <div id="dashboard ">
            <div className="fixed top-0 left-0 w-screen h-screen bg-grayTrue z-20 p-6 md:p-8 overflow-y-auto">
                <RecordNavbar />
                <div className="flex justify-between items-center gap-6  border-b border-[#344054]">
                    <div className="flex justify-between">
                        <div className="border-r border-[#344054] py-6">
                            <button id={BUTTON_ID} className="inline-flex gap-6 items-center pr-12">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="20" fill="#0BA5EC" />
                                </svg>
                                <div className="text-lg font-bold text-left">
                                    <div>Start <br /> Recording</div>
                                </div>
                            </button>
                        </div>
                        <div className="ml-12">
                            <label htmlFor="" className="text-sm font-medium">Recording Type</label>
                            <Input placeholder="No video, Record Audio" />
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-6">
                            <div className="">
                                <div className="text-xs text-[#A0A0AB]">Time Remaining</div>
                                <div className="text-right text-sm font-semibold">120 minutes</div>
                            </div>
                            <button className="py-[0.63rem] bg-[#1570EF] px-4 rounded-full font-semibold bg-gradient-to-b from-[#383C9E] to-[#6941C6]">
                                <span className="">Upgrade</span>
                            </button>
                        </div>

                    </div>
                </div>

                <div className="mt-8 flex gap-10">
                    <div className="flex-1">
                        <div dangerouslySetInnerHTML={{ __html: videoHTML }}></div>
                    </div>

                    <div className="space-y-6 w-[28%]">
                        <div className=" bg-dark rounded-lg">
                            <div className=" border-b">
                                <div className="py-4 px-6">
                                    <span className="text-sm font-medium">
                                        Co-host & participants
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="grid grid-cols-3 gap-x-2 gap-y-4 px-4 pb-16">
                                    <Participant />
                                    <Participant />
                                    <Participant />
                                    <Participant />
                                    <Participant />

                                </div>
                            </div>
                        </div>

                        <div className=" bg-dark rounded-lg">
                            <div className=" border-b">
                                <div className="py-4 px-12">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium">
                                            Chat
                                        </span>
                                        <span className="text-sm font-medium">
                                            Footnotes
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="grid grid-cols-3 gap-x-2 gap-y-4 px-4 pb-64">


                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default RecordAudio
