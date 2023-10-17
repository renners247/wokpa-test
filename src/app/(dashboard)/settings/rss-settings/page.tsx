"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { Switch } from "@headlessui/react";


const RssSettingsPage

    = () => {
        const user = useAppSelector(state => state.auth.user);
        const dispatch = useAppDispatch();


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
                            RSS settings
                        </div>

                    </div>
                </div>
                <div className="mt-8">
                    <div className="pr-5">
                        <div className={`font-bold text-xl pb-2`}>
                            RSS settings
                        </div>
                        <div>
                            <p className="text-sm">
                                Here you can set advanced settings for the RSS feed such as redirection and tracking URL prefix
                            </p>
                        </div>
                        <div className="mt-2">
                            <span className="inline-flex items-center gap-4 rounded-xl py-2 px-6 bg-blue-100">
                                <div>
                                    <svg width="22" height="36" viewBox="0 0 22 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0835 13.4163H11.9168V15.2497H10.0835V13.4163ZM10.0835 17.083H11.9168V22.583H10.0835V17.083ZM11.0002 8.83301C5.94016 8.83301 1.8335 12.9397 1.8335 17.9997C1.8335 23.0597 5.94016 27.1663 11.0002 27.1663C16.0602 27.1663 20.1668 23.0597 20.1668 17.9997C20.1668 12.9397 16.0602 8.83301 11.0002 8.83301ZM11.0002 25.333C6.95766 25.333 3.66683 22.0422 3.66683 17.9997C3.66683 13.9572 6.95766 10.6663 11.0002 10.6663C15.0427 10.6663 18.3335 13.9572 18.3335 17.9997C18.3335 22.0422 15.0427 25.333 11.0002 25.333Z" fill="#2196F3" />
                                    </svg>

                                </div>
                                <div className="text-sm text-indigo-900">
                                    Want to know what an RSS feed is and how it can help you distribute your podcast?  Find out
                                </div>
                                <svg className="ml-4" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8332 5.34102L14.6582 4.16602L9.99984 8.82435L5.3415 4.16602L4.1665 5.34102L8.82484 9.99935L4.1665 14.6577L5.3415 15.8327L9.99984 11.1743L14.6582 15.8327L15.8332 14.6577L11.1748 9.99935L15.8332 5.34102Z" fill="#2196F3" />
                                    <path d="M15.8332 5.34102L14.6582 4.16602L9.99984 8.82435L5.3415 4.16602L4.1665 5.34102L8.82484 9.99935L4.1665 14.6577L5.3415 15.8327L9.99984 11.1743L14.6582 15.8327L15.8332 14.6577L11.1748 9.99935L15.8332 5.34102Z" fill="black" fillOpacity="0.6" />
                                </svg>

                            </span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className="space-y-8">
                                <div className="flex">
                                    <div className="w-9/12 items-center gap-8">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            RSS URL:
                                        </label>
                                        <div className="flex gap-8 items-center">
                                            <div className="flex-1">
                                                <input placeholder="https://www.wokpa.com/emax-podcast" type="text" className="w-full py-3 px-4 rounded-lg bg-[#202939] text-[#F2F4F7] placeholder:text-[#F2F4F7] border-0" />
                                            </div>
                                            <div>
                                                <button className="bg-white inline-flex items-center gap-2 rounded-full py-2 px-3">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_3344_57533)">
                                                            <path d="M4.16699 12.5003C3.39042 12.5003 3.00214 12.5003 2.69585 12.3735C2.28747 12.2043 1.96302 11.8798 1.79386 11.4715C1.66699 11.1652 1.66699 10.7769 1.66699 10.0003V4.33366C1.66699 3.40024 1.66699 2.93353 1.84865 2.57701C2.00844 2.2634 2.2634 2.00844 2.57701 1.84865C2.93353 1.66699 3.40024 1.66699 4.33366 1.66699H10.0003C10.7769 1.66699 11.1652 1.66699 11.4715 1.79386C11.8798 1.96302 12.2043 2.28747 12.3735 2.69585C12.5003 3.00214 12.5003 3.39042 12.5003 4.16699M10.167 18.3337H15.667C16.6004 18.3337 17.0671 18.3337 17.4236 18.152C17.7372 17.9922 17.9922 17.7372 18.152 17.4236C18.3337 17.0671 18.3337 16.6004 18.3337 15.667V10.167C18.3337 9.23357 18.3337 8.76686 18.152 8.41034C17.9922 8.09674 17.7372 7.84177 17.4236 7.68198C17.0671 7.50033 16.6004 7.50033 15.667 7.50033H10.167C9.23357 7.50033 8.76686 7.50033 8.41034 7.68198C8.09674 7.84177 7.84177 8.09674 7.68198 8.41034C7.50033 8.76686 7.50033 9.23357 7.50033 10.167V15.667C7.50033 16.6004 7.50033 17.0671 7.68198 17.4236C7.84177 17.7372 8.09674 17.9922 8.41034 18.152C8.76686 18.3337 9.23357 18.3337 10.167 18.3337Z" stroke="#063150" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3344_57533">
                                                                <rect width="20" height="20" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                    <span className="text-sm !text-[#063150] font-semibold">Copy</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-9/12 items-center gap-8">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            RSS EMAIl:
                                        </label>
                                        <div className="flex gap-8 items-center">
                                            <div className="flex-1">
                                                <input placeholder="jospehg@fgmail,.com" type="text" className="w-full py-3 px-4 rounded-lg bg-[#202939] text-[#F2F4F7] placeholder:text-[#F2F4F7] border-0" />
                                            </div>
                                            <div>
                                                <button className="bg-white inline-flex items-center gap-2 rounded-full py-2 px-3">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_3344_57533)">
                                                            <path d="M4.16699 12.5003C3.39042 12.5003 3.00214 12.5003 2.69585 12.3735C2.28747 12.2043 1.96302 11.8798 1.79386 11.4715C1.66699 11.1652 1.66699 10.7769 1.66699 10.0003V4.33366C1.66699 3.40024 1.66699 2.93353 1.84865 2.57701C2.00844 2.2634 2.2634 2.00844 2.57701 1.84865C2.93353 1.66699 3.40024 1.66699 4.33366 1.66699H10.0003C10.7769 1.66699 11.1652 1.66699 11.4715 1.79386C11.8798 1.96302 12.2043 2.28747 12.3735 2.69585C12.5003 3.00214 12.5003 3.39042 12.5003 4.16699M10.167 18.3337H15.667C16.6004 18.3337 17.0671 18.3337 17.4236 18.152C17.7372 17.9922 17.9922 17.7372 18.152 17.4236C18.3337 17.0671 18.3337 16.6004 18.3337 15.667V10.167C18.3337 9.23357 18.3337 8.76686 18.152 8.41034C17.9922 8.09674 17.7372 7.84177 17.4236 7.68198C17.0671 7.50033 16.6004 7.50033 15.667 7.50033H10.167C9.23357 7.50033 8.76686 7.50033 8.41034 7.68198C8.09674 7.84177 7.84177 8.09674 7.68198 8.41034C7.50033 8.76686 7.50033 9.23357 7.50033 10.167V15.667C7.50033 16.6004 7.50033 17.0671 7.68198 17.4236C7.84177 17.7372 8.09674 17.9922 8.41034 18.152C8.76686 18.3337 9.23357 18.3337 10.167 18.3337Z" stroke="#063150" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3344_57533">
                                                                <rect width="20" height="20" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                    <span className="text-sm !text-[#063150] font-semibold">Copy</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-9/12 items-center gap-8">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            MANAGE RSS
                                        </label>
                                        <div className="flex justify-between">
                                            <div>
                                                <input type="radio" name="" id="" />
                                                <span className="text-sm ml-1">
                                                    Enabled
                                                </span>
                                            </div>
                                            <div>
                                                <input type="radio" name="" id="" />
                                                <span className="text-sm ml-1">
                                                    Redirected
                                                </span>
                                            </div>
                                            <div>
                                                <input type="radio" name="" id="" />
                                                <span className="text-sm ml-1">
                                                    Disabled
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-9/12 items-center gap-8">
                                        <span className="inline-flex items-center gap-4 rounded-xl py-2 px-6 bg-blue-100">
                                            <div>
                                                <svg width="22" height="36" viewBox="0 0 22 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.0835 13.4163H11.9168V15.2497H10.0835V13.4163ZM10.0835 17.083H11.9168V22.583H10.0835V17.083ZM11.0002 8.83301C5.94016 8.83301 1.8335 12.9397 1.8335 17.9997C1.8335 23.0597 5.94016 27.1663 11.0002 27.1663C16.0602 27.1663 20.1668 23.0597 20.1668 17.9997C20.1668 12.9397 16.0602 8.83301 11.0002 8.83301ZM11.0002 25.333C6.95766 25.333 3.66683 22.0422 3.66683 17.9997C3.66683 13.9572 6.95766 10.6663 11.0002 10.6663C15.0427 10.6663 18.3335 13.9572 18.3335 17.9997C18.3335 22.0422 15.0427 25.333 11.0002 25.333Z" fill="#2196F3" />
                                                </svg>

                                            </div>
                                            <div className="text-sm text-indigo-900">
                                                Once Enabled, your RSS feed is automatically updated with the Podcast settings you already set. Updates on podcast distribution platforms can take some time to sync.
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

export default RssSettingsPage
