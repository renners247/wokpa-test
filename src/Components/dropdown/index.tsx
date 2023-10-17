'use client';

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Popover, Transition, Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/Hooks";
import { resetAuth } from "@/redux/auth";

const HomeNavbarPopOver = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const abbr1 = user?.first_name.charAt(0)
    const abbr2 = user?.last_name.charAt(0)
    const fullAbreviation = `${abbr1}${abbr2}`;

    useLayoutEffect(() => {
        console.log(user)
    }, [])
    return(
        <Popover className="md:block hidden relative">
        {({ open }) => (
            <>
               {user === undefined || !user ? null  : 
               <Popover.Button className="bg-white rounded-full p-2 font-inter text-sm text-[#042946] flex items-center">  

                    <div className="font-semibold">
                        {fullAbreviation}
                    </div>

                </Popover.Button>}
                <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >
                    <Popover.Panel className="absolute right-0 z-10 mt-3 w-[240px] bg-dark border border-slate-600 rounded">
                        <div className="px-4 py-3 border-b border-slate-600">
                            <div className="flex items-center gap-3">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="40" height="40" rx="20" fill="#F2F4F7" />
                                    <path d="M28 29C28 27.6044 28 26.9067 27.8278 26.3389C27.44 25.0605 26.4395 24.06 25.1611 23.6722C24.5933 23.5 23.8956 23.5 22.5 23.5H17.5C16.1044 23.5 15.4067 23.5 14.8389 23.6722C13.5605 24.06 12.56 25.0605 12.1722 26.3389C12 26.9067 12 27.6044 12 29M24.5 15.5C24.5 17.9853 22.4853 20 20 20C17.5147 20 15.5 17.9853 15.5 15.5C15.5 13.0147 17.5147 11 20 11C22.4853 11 24.5 13.0147 24.5 15.5Z" stroke="#475467" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                                    <rect x="29.25" y="29.25" width="11.5" height="11.5" rx="5.75" fill="#12B76A" />
                                    <rect x="29.25" y="29.25" width="11.5" height="11.5" rx="5.75" stroke="white" stroke-width="1.5" />
                                </svg>

                                <div className="text-xs">
                                    <div className="font-semibold">
                                        {user?.first_name}podcast
                                    </div>
                                    <div className="">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-1">
                        <Link href="/dashboard" className="py-[0.58rem] px-[0.61rem] rounded flex items-center gap-4 hover:bg-[#1D2939] ease transition-all mt-1">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.475 9.37496H13.1083C11.4333 9.37496 10.625 8.63329 10.625 7.09996V3.31663C10.625 1.78329 11.4417 1.04163 13.1083 1.04163H16.475C18.15 1.04163 18.9583 1.78329 18.9583 3.31663V7.09163C18.9583 8.63329 18.1417 9.37496 16.475 9.37496ZM13.1083 2.29163C11.9917 2.29163 11.875 2.60829 11.875 3.31663V7.09163C11.875 7.80829 11.9917 8.11663 13.1083 8.11663H16.475C17.5917 8.11663 17.7083 7.79996 17.7083 7.09163V3.31663C17.7083 2.59996 17.5917 2.29163 16.475 2.29163H13.1083Z" fill="#F9FAFB"/>
                                    <path d="M16.475 18.9583H13.1083C11.4333 18.9583 10.625 18.1417 10.625 16.475V13.1083C10.625 11.4333 11.4417 10.625 13.1083 10.625H16.475C18.15 10.625 18.9583 11.4417 18.9583 13.1083V16.475C18.9583 18.1417 18.1417 18.9583 16.475 18.9583ZM13.1083 11.875C12.125 11.875 11.875 12.125 11.875 13.1083V16.475C11.875 17.4583 12.125 17.7083 13.1083 17.7083H16.475C17.4583 17.7083 17.7083 17.4583 17.7083 16.475V13.1083C17.7083 12.125 17.4583 11.875 16.475 11.875H13.1083Z" fill="#F9FAFB"/>
                                    <path d="M6.89166 9.37496H3.52499C1.84999 9.37496 1.04166 8.63329 1.04166 7.09996V3.31663C1.04166 1.78329 1.85832 1.04163 3.52499 1.04163H6.89166C8.56666 1.04163 9.37499 1.78329 9.37499 3.31663V7.09163C9.37499 8.63329 8.55832 9.37496 6.89166 9.37496ZM3.52499 2.29163C2.40832 2.29163 2.29166 2.60829 2.29166 3.31663V7.09163C2.29166 7.80829 2.40832 8.11663 3.52499 8.11663H6.89166C8.00832 8.11663 8.12499 7.79996 8.12499 7.09163V3.31663C8.12499 2.59996 8.00832 2.29163 6.89166 2.29163H3.52499Z" fill="#F9FAFB"/>
                                    <path d="M6.89166 18.9583H3.52499C1.84999 18.9583 1.04166 18.1417 1.04166 16.475V13.1083C1.04166 11.4333 1.85832 10.625 3.52499 10.625H6.89166C8.56666 10.625 9.37499 11.4417 9.37499 13.1083V16.475C9.37499 18.1417 8.55832 18.9583 6.89166 18.9583ZM3.52499 11.875C2.54166 11.875 2.29166 12.125 2.29166 13.1083V16.475C2.29166 17.4583 2.54166 17.7083 3.52499 17.7083H6.89166C7.87499 17.7083 8.12499 17.4583 8.12499 16.475V13.1083C8.12499 12.125 7.87499 11.875 6.89166 11.875H3.52499Z" fill="#F9FAFB"/>
                                </svg>

                                <div className="text-sm font-medium">Dashboard</div>
                            </Link>
                            <Link href="/podcast/record-episode" className="py-[0.58rem] px-[0.61rem] flex items-center gap-4 hover:bg-[#1D2939]">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2034_57088)">
                                        <path d="M4.00065 7.33334V8.66668M6.66732 6.00001V10M9.33398 4.66668V11.3333M12.0007 7.33334V8.66668M14.6673 8.00001C14.6673 11.6819 11.6826 14.6667 8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8.00001C1.33398 4.31811 4.31875 1.33334 8.00065 1.33334C11.6826 1.33334 14.6673 4.31811 14.6673 8.00001Z" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2034_57088">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div className="text-sm font-medium">Record episode</div>
                            </Link>
                            <Link href="/podcast/create-podcast" className="py-[0.58rem] px-[0.61rem] flex items-center gap-4 hover:bg-[#1D2939]">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 5.33333V10.6667M5.33333 8H10.6667M5.2 14H10.8C11.9201 14 12.4802 14 12.908 13.782C13.2843 13.5903 13.5903 13.2843 13.782 12.908C14 12.4802 14 11.9201 14 10.8V5.2C14 4.0799 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.0799 2 5.2V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14Z" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                </svg>

                                <div className="text-sm font-medium">Create new podcast</div>
                            </Link>
                            <Link href="/podcast/import-podcast" className="py-[0.58rem] px-[0.61rem] flex items-center gap-4 hover:bg-[#1D2939]">
                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 9.66667L7.66667 7M7.66667 7L10.3333 9.66667M7.66667 7V13M13 10.1619C13.8143 9.48936 14.3333 8.47196 14.3333 7.33333C14.3333 5.30829 12.6917 3.66667 10.6667 3.66667C10.521 3.66667 10.3847 3.59066 10.3107 3.46516C9.44137 1.98989 7.83629 1 6 1C3.23858 1 1 3.23858 1 6C1 7.3774 1.55696 8.62472 2.45797 9.52902" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                </svg>

                                <div className="text-sm font-medium">Import podcast</div>
                            </Link>
                            <Link href="/podcast/import-podcast" className="py-[0.58rem] px-[0.61rem] flex items-center gap-4 hover:bg-[#1D2939]">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.26271 12.9141L6.65234 13.7904C6.76817 14.0512 6.95719 14.2728 7.19649 14.4284C7.43579 14.5839 7.71508 14.6667 8.00049 14.6666C8.2859 14.6667 8.56519 14.5839 8.80449 14.4284C9.04378 14.2728 9.23281 14.0512 9.34864 13.7904L9.73827 12.9141C9.87696 12.6031 10.1103 12.3439 10.4049 12.1733C10.7015 12.0023 11.0445 11.9294 11.3849 11.9652L12.3383 12.0666C12.622 12.0967 12.9084 12.0437 13.1627 11.9142C13.417 11.7847 13.6283 11.5842 13.7709 11.337C13.9136 11.09 13.9817 10.8068 13.9667 10.5219C13.9517 10.237 13.8543 9.96251 13.6864 9.73183L13.122 8.95628C12.921 8.67807 12.8136 8.34319 12.8153 7.99998C12.8152 7.65771 12.9236 7.32421 13.1249 7.04739L13.6894 6.27183C13.8573 6.04115 13.9547 5.76669 13.9696 5.48176C13.9846 5.19683 13.9166 4.91367 13.7738 4.66665C13.6312 4.41947 13.42 4.21897 13.1657 4.08946C12.9114 3.95996 12.625 3.907 12.3412 3.93702L11.3879 4.0385C11.0474 4.07425 10.7044 4.00139 10.4079 3.83035C10.1126 3.65881 9.87928 3.39822 9.74123 3.08591L9.34864 2.20961C9.23281 1.94876 9.04378 1.72712 8.80449 1.57158C8.56519 1.41603 8.2859 1.33327 8.00049 1.33331C7.71508 1.33327 7.43579 1.41603 7.19649 1.57158C6.95719 1.72712 6.76817 1.94876 6.65234 2.20961L6.26271 3.08591C6.12466 3.39822 5.89129 3.65881 5.59604 3.83035C5.29952 4.00139 4.95649 4.07425 4.61604 4.0385L3.65975 3.93702C3.37597 3.907 3.08957 3.95996 2.83529 4.08946C2.58101 4.21897 2.36976 4.41947 2.22715 4.66665C2.08437 4.91367 2.01634 5.19683 2.03133 5.48176C2.04632 5.76669 2.14368 6.04115 2.3116 6.27183L2.87604 7.04739C3.07734 7.32421 3.18574 7.65771 3.18567 7.99998C3.18574 8.34225 3.07734 8.67575 2.87604 8.95257L2.3116 9.72813C2.14368 9.95881 2.04632 10.2333 2.03133 10.5182C2.01634 10.8031 2.08437 11.0863 2.22715 11.3333C2.3699 11.5804 2.58117 11.7808 2.83542 11.9102C3.08967 12.0397 3.37599 12.0928 3.65975 12.0629L4.61308 11.9615C4.95353 11.9257 5.29656 11.9986 5.59308 12.1696C5.88943 12.3407 6.12389 12.6013 6.26271 12.9141Z" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                    <path d="M7.9993 9.99998C9.10387 9.99998 9.9993 9.10455 9.9993 7.99998C9.9993 6.89541 9.10387 5.99998 7.9993 5.99998C6.89473 5.99998 5.9993 6.89541 5.9993 7.99998C5.9993 9.10455 6.89473 9.99998 7.9993 9.99998Z" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                </svg>

                                <div className="text-sm font-medium">Account settings</div>
                            </Link>
                            <Link href="/podcast/import-podcast" className="py-[0.58rem] px-[0.61rem] rounded flex items-center gap-4 hover:bg-[#1D2939] ease transition-all">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_5024_6455)">
                                        <path d="M6.06065 5.99998C6.21739 5.55442 6.52675 5.17872 6.93395 4.9394C7.34116 4.70009 7.81991 4.61261 8.28544 4.69245C8.75096 4.7723 9.1732 5.01433 9.47737 5.37567C9.78154 5.737 9.94802 6.19433 9.94732 6.66665C9.94732 7.99998 7.94732 8.66665 7.94732 8.66665M8.00065 11.3333H8.00732M14.6673 7.99998C14.6673 11.6819 11.6826 14.6666 8.00065 14.6666C4.31875 14.6666 1.33398 11.6819 1.33398 7.99998C1.33398 4.31808 4.31875 1.33331 8.00065 1.33331C11.6826 1.33331 14.6673 4.31808 14.6673 7.99998Z" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_5024_6455">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <div className="text-sm font-medium">Help</div>
                            </Link>
                        </div>
                        <div onClick={() => {
                            dispatch(resetAuth());
                        }} className="border-t px-3 py-3 flex items-center gap-4 mt-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6M6 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.7157 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.07989 2 5.2V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14H6" stroke="#F9FAFB" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="text-sm font-medium">Logout</div>

                        </div>
                    </Popover.Panel>
                </Transition>
            </>
        )}
</Popover>
    )
}

export default HomeNavbarPopOver;