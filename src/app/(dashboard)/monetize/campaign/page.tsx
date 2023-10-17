"use client";

import Button from "@/components/button";
import { useAppSelector, useAppDispatch } from "@/hooks";
import Link from "next/link";
import { useEffect } from "react";


const CampaignPage = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const handleProfile = async () => {
        // try {
        //     const response = await getProfile();
        //     dispatch(updateUser({ user: response.data.data }));
        // } catch (error) {

        // }
    }

    useEffect(() => {
        handleProfile()
    }, [])
    return (
        <div id="dashboard">
            <div className="relative">
                <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium">
                        <Link href={"/dashboard"}>
                            All Podcasts
                        </Link>
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium">
                        Monetize
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Campaign
                    </div>
                </div>
                <div className="pr-5 mt-8">
                    <div className={`font-semibold text-xl pb-2`}>
                        Campaigns
                    </div>
                    <div>
                        <p className="text-sm">
                            Design your monetization strategy, profit 100% from your deals
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="">
                    <div className="space-y-5">
                        <div className="flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <div className="text-sm">
                                Fully control where you want your ads inserted
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <div className="text-sm">
                                No need to find sponsors, we take care of this
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <div className="text-sm">
                                Earn from every listen: no matter the listener's app or location
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                            <div className="text-sm">
                                Generate money from your entire catalog
                            </div>
                        </div>

                        <div>
                            <div>
                                <Button className="text-sm font-semibold">
                                    Visit portal
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampaignPage