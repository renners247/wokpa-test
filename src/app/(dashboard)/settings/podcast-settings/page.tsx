"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { Switch } from "@headlessui/react";


const PodcastSettingsPage

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
                            Podcast settings
                        </div>

                    </div>
                </div>
                <div className="mt-8">
                    <div className="pr-5">
                        <div className={`font-bold text-xl pb-2`}>
                            Podcast settings
                        </div>
                        <div>
                            <p className="text-sm">
                                Here you can customize the podcasts basic information as well as more advanced details such as the RSS Tags
                            </p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div>
                            <div className="space-y-8">
                                <div className="flex">
                                    <div className="w-8/12">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            Podcast Title
                                        </label>
                                        <Input name="email" placeholder="Enter podcast title" />
                                        <div className="text-xs text-[#D0D5DD] mt-1">
                                            Learn how to write a professional podcast title.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-8/12">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            Permalink
                                        </label>
                                        <Input name="email" placeholder="www.wokpa.com/emax-podcast" />
                                    </div>
                                </div>

                                <div>
                                    <div className="font-medium">
                                        Picture
                                    </div>
                                    <div className="w-[348px] py-4">
                                        <div className="text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 inline">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                            </svg>
                                            <div className="text-xs text-[#EAECF0] px-6">
                                                We recommend uploading an artwork of at least 1400x1400 pixels and maximum 5MB. We support jpg, png, gif and tiff formats.
                                            </div>
                                            <div className="mt-4">
                                                <button className="bg-[#F9F5FF] rounded-full py-2 px-4 text-sm font-semibold text-[#042946]">
                                                    Upload image
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="md:w-6/12">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            Description
                                        </label>
                                        <textarea rows={8} className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500 `} name="email" placeholder="Enter descrption" />
                                        <div className="text-xs text-[#D0D5DD] mt-1">
                                            Listeners want to know what your podcast is about before they tune in. Hook them in with a persuasive description that quickly sums up what the main concept and structure of your podcast is.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="md:w-6/12">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            Language
                                        </label>
                                        <select name="language" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                            <option value="">Select preferred language</option>
                                            <option value="English">English</option>
                                            <option value="Yoruba">Yoruba</option>
                                            <option value="Igbo">Igbo</option>
                                            <option value="Hausa">Hausa</option>


                                        </select>
                                        {/* <Input name="language" placeholder="Select language" /> */}
                                    </div>
                                    <div className="md:w-6/12">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Category
                                        </label>
                                        <Input name="email" placeholder="Select a category" />
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="w-8/12">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input name="email" placeholder="Enter email" />
                                        <div className="text-xs text-[#D0D5DD] mt-1">
                                            By adding your email address here, it will be displayed on your podcast page and RSS feed. This email address allows you to confirm the ownership into platforms like Spotify and Google Podcasts.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="md:w-6/12">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            Author name
                                        </label>
                                        <Input name="email" placeholder="Enter author's name" />
                                    </div>
                                    <div className="md:w-6/12">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Copyright
                                        </label>
                                        <Input name="email" placeholder="Enter copyright" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

export default PodcastSettingsPage
