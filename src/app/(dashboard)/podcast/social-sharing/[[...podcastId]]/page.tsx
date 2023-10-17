"use client";

import { getArchivePodcastsById, getPodcastsById } from "@/app/api/publishers";
import Button from "@/components/button";
import Input from "@/components/input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { PodcastModel } from "@/models/podcast";
import { APICall, getIcon } from "@/utils";
import { Disclosure, Switch } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { useEffectOnce } from "react-use";

const SocialSharingPage = ({ params }: { params: { podcastId: string[] } }) => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const [podcast, setPodcast] = useState<PodcastModel | null>(null);
    const [isArchive, setIsArchive] = useState(params.podcastId[1] == "archive" ? true : false);

    const handleGetPodcast = async () => {
        try {
            const podcastResponse = await APICall(isArchive ? getArchivePodcastsById : getPodcastsById, params.podcastId[0]);
            setPodcast(podcastResponse.data.data);

        } catch (error) {
            console.log(error)
        }
    }


    useEffectOnce(() => {
        handleGetPodcast();
    });


    return (
        <div id="dashboard">
            <div className="relative">
                <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium">
                        <Link href={`/dashboard`}>
                            All Podcasts
                        </Link>
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium">
                        {
                            podcast ? <Link href={`/podcast/podcast-view/${podcast?.id}`}>
                                {podcast?.title}
                            </Link> : <div className="h-2 w-32 bg-gray-100 animate-pulse rounded"></div>
                        }

                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Social Distribution
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="pr-5">
                    <div className={`font-semibold text-xl pb-2`}>
                        Social sharing
                    </div>
                    <div>
                        <p className="text-sm">
                            Let your listeners know a new episode is out! Enable autosharing in your podcast’s settings so that every time you publish a new episode, it gets automatically shared to your connected social networks.
                        </p>
                    </div>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="flex justify-between items-center px-6 py-4 bg-[#141414] rounded-xl">
                        <div className="flex items-center gap-4">
                            <div>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2048_69643)">
                                        <path d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 29.9824 7.31367 38.2566 16.875 39.757V25.7813H11.7969V20H16.875V15.5938C16.875 10.5813 19.8609 7.8125 24.4293 7.8125C26.6168 7.8125 28.9062 8.20312 28.9062 8.20312V13.125H26.3844C23.9 13.125 23.125 14.6668 23.125 16.25V20H28.6719L27.7852 25.7813H23.125V39.757C32.6863 38.2566 40 29.9824 40 20Z" fill="#1877F2" />
                                        <path d="M27.7852 25.7812L28.6719 20H23.125V16.25C23.125 14.6684 23.9 13.125 26.3844 13.125H28.9062V8.20312C28.9062 8.20312 26.6176 7.8125 24.4293 7.8125C19.8609 7.8125 16.875 10.5813 16.875 15.5938V20H11.7969V25.7812H16.875V39.757C18.9457 40.081 21.0543 40.081 23.125 39.757V25.7812H27.7852Z" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2048_69643">
                                            <rect width="40" height="40" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                            </div>
                            <div className="text-left">

                                <div className="">
                                    You must connect your Facebook account first in order to enable autosharing.
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button className="py-2"> Connect</Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-6 py-4 bg-[#141414] rounded-xl">
                        <div className="flex items-center gap-4">
                            <div>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 38.75C29.665 38.75 37.5 30.915 37.5 21.25C37.5 11.585 29.665 3.75 20 3.75C10.335 3.75 2.5 11.585 2.5 21.25C2.5 24.3886 3.32625 27.3342 4.77309 29.8812L2.5 38.75L11.6436 36.6297C14.1267 37.9818 16.9736 38.75 20 38.75ZM20 36.0577C28.1781 36.0577 34.8077 29.4281 34.8077 21.25C34.8077 13.0719 28.1781 6.44231 20 6.44231C11.8219 6.44231 5.19231 13.0719 5.19231 21.25C5.19231 24.4076 6.18063 27.3343 7.8648 29.7378L6.53846 34.7115L11.5999 33.4462C13.9867 35.0932 16.8807 36.0577 20 36.0577Z" fill="#BFC8D0" />
                                    <path d="M35 20C35 28.2843 28.2843 35 20 35C16.8402 35 13.9086 34.023 11.4908 32.3546L6.36364 33.6364L7.7072 28.598C6.00116 26.1633 5 23.1986 5 20C5 11.7157 11.7157 5 20 5C28.2843 5 35 11.7157 35 20Z" fill="url(#paint0_linear_2048_69652)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 37.5C29.665 37.5 37.5 29.665 37.5 20C37.5 10.335 29.665 2.5 20 2.5C10.335 2.5 2.5 10.335 2.5 20C2.5 23.1386 3.32625 26.0842 4.77309 28.6312L2.5 37.5L11.6436 35.3797C14.1267 36.7318 16.9736 37.5 20 37.5ZM20 34.8077C28.1781 34.8077 34.8077 28.1781 34.8077 20C34.8077 11.8219 28.1781 5.19231 20 5.19231C11.8219 5.19231 5.19231 11.8219 5.19231 20C5.19231 23.1576 6.18063 26.0843 7.8648 28.4878L6.53846 33.4615L11.5999 32.1962C13.9867 33.8432 16.8807 34.8077 20 34.8077Z" fill="white" />
                                    <path d="M15.625 11.8747C15.2089 11.039 14.5707 11.113 13.9258 11.113C12.7735 11.113 10.9766 12.4934 10.9766 15.0623C10.9766 17.1677 11.9043 19.4724 15.0305 22.92C18.0476 26.2472 22.0117 27.9684 25.3027 27.9098C28.5938 27.8512 29.2709 25.0192 29.2709 24.0628C29.2709 23.6389 29.0078 23.4274 28.8266 23.3699C27.7051 22.8317 25.6367 21.8288 25.166 21.6404C24.6954 21.452 24.4496 21.7068 24.2969 21.8455C23.8701 22.2522 23.0241 23.4509 22.7344 23.7205C22.4447 23.9901 22.0129 23.8536 21.8331 23.7517C21.1718 23.4863 19.3787 22.6887 17.9493 21.3032C16.1817 19.5896 16.0779 19.0001 15.7449 18.4753C15.4784 18.0554 15.674 17.7978 15.7715 17.6853C16.1524 17.2458 16.6783 16.5674 16.9141 16.2302C17.1499 15.893 16.9627 15.3812 16.8504 15.0623C16.3672 13.6911 15.9579 12.5433 15.625 11.8747Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear_2048_69652" x1="33.125" y1="8.75" x2="5" y2="35" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#5BD066" />
                                            <stop offset="1" stopColor="#27B43E" />
                                        </linearGradient>
                                    </defs>
                                </svg>


                            </div>
                            <div className="text-left">

                                <div className="">
                                    You must connect your whatsapp account first in order to enable autosharing.
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button className="py-2"> Connect</Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-6 py-4 bg-[#141414] rounded-xl">
                        <div className="flex items-center gap-4">
                            <div>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="20" r="17.5" fill="url(#paint0_linear_2048_69659)" />
                                    <path d="M28.7332 12.761C28.8891 11.7541 27.9318 10.9594 27.0365 11.3525L9.20602 19.1811C8.56404 19.4629 8.611 20.4353 9.27683 20.6474L12.9539 21.8183C13.6557 22.0418 14.4157 21.9263 15.0285 21.5029L23.3187 15.7753C23.5687 15.6026 23.8412 15.9581 23.6276 16.1783L17.6601 22.3308C17.0813 22.9276 17.1962 23.9389 17.8925 24.3756L24.5737 28.5654C25.3231 29.0353 26.2871 28.5632 26.4273 27.6577L28.7332 12.761Z" fill="white" />
                                    <defs>
                                        <linearGradient id="paint0_linear_2048_69659" x1="20" y1="2.5" x2="20" y2="37.5" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#37BBFE" />
                                            <stop offset="1" stopColor="#007DBB" />
                                        </linearGradient>
                                    </defs>
                                </svg>


                            </div>
                            <div className="text-left">

                                <div className="">
                                    You must connect your Telegram account first in order to enable autosharing.
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button className="py-2"> Connect</Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-6 py-4 bg-[#141414] rounded-xl">
                        <div className="flex items-center gap-4">
                            <div>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.25 20V30C6.25 31.875 8.125 33.75 10 33.75H30C31.875 33.75 33.75 31.875 33.75 30V20M6.25 20H13.125C13.125 20 14.375 24.375 20 24.375C25.625 24.375 26.875 20 26.875 20H33.75M6.25 20V24.375M6.25 20L7.5 13.75M33.75 20L32.5 13.75M16.875 11.25H23.125M16.875 16.25H23.125M11.875 16.25V6.25H28.125V16.25" stroke="#FCFCFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="text-left">

                                <div className="">
                                    You must connect your email account first in order to enable autosharing.
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button className="py-2"> Connect</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SocialSharingPage
