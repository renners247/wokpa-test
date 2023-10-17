"use client";

import Button from "@/components/button";
import { Tab, Disclosure } from '@headlessui/react'
import Image from "next/image";
import { motion } from "framer-motion";

const AllInOne = () => {

    return (

        <section>
            <div className="container  px-4 mx-auto py-24">
                <div className="text-center">
                    <h2 className="md:text-5xl text-2xl font-raleway font-bold">
                        All-In-<span className="text-primary">One</span>
                    </h2>
                    <p className="md:text-lg text-sm max-w-4xl mx-auto mt-6">
                        Wokpa is the ultimate all-in-one podcasting platform. We've bundled all your podcasting needs — record, edit, distribute and monetize all from the same place. It's never been easier to podcast.
                    </p>
                </div>
                <div className="mt-10 container  mx-auto px-4">
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-full bg-[#18181B]  max-w-lg mx-auto md:text-base text-xs">
                            {["Record", "Produce", "Host", "Analyse", "Monetize"].map((category) => (
                                <Tab
                                    key={category}
                                    className={({ selected }) =>
                                        `w-full rounded-full py-3  leading-5 outline-none ${selected ? 'bg-[#FCFCFD] text-[#101828] font-semibold' : 'hover:bg-white/[0.12] text-[#667085]  font-medium'}`
                                    }
                                >
                                    {category}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels >
                            <Tab.Panel as="div" className="mt-12">
                                <div className="flex md:flex-row flex-col gap-6 md:gap-24 items-center">
                                    <div
                                        className="">
                                        <img width={539} height={500} src={"/images/record-image.png"} alt="" />
                                    </div>

                                    <div className="md:md:w-6/12">
                                        <motion.div
                                            initial={{ translateX: -350, opacity: 0 }}
                                            whileInView={{ translateX: 0, opacity: 1 }}
                                            transition={{
                                                type: "tween",
                                                ease: "easeIn",
                                                duration: 0.3
                                            }}
                                            className="text-left">
                                            <h2 className="md:text-4xl text-2xl font-raleway font-bold">
                                                Tips & support -<span className="text-primary">Income</span>
                                            </h2>
                                            <p className="md:md:text-xl text-sm max-w-4xl mx-auto mt-6">
                                                Wokpa records audio mp3 to give you the picture-perfect quality that your video podcast deserves.Record in 16-bit 48k WAV audio track per guest, regardless of internet connection (local recording), with no time limits.
                                            </p>
                                            <div className="mt-4 md:text-left text-center">
                                                <Button className="text-sm py-2">Try Wokpa for free</Button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel as="div" className="mt-16">
                                <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-24 items-center">
                                    <motion.div
                                        initial={{ translateX: -350, opacity: 0 }}
                                        whileInView={{ translateX: 0, opacity: 1 }}
                                        transition={{
                                            type: "tween",
                                            ease: "easeIn",
                                            duration: 0.3
                                        }}
                                        className="">
                                        <img width={568} height={335} src={'/images/produce-image.png'} alt="produce image" />
                                    </motion.div>
                                    <div className="md:w-6/12">
                                        <motion.div
                                            initial={{ translateX: 350, opacity: 0 }}
                                            whileInView={{ translateX: 0, opacity: 1 }}
                                            transition={{
                                                type: "tween",
                                                ease: "easeIn",
                                                duration: 0.3
                                            }}
                                            className="text-left">
                                            <h2 className="md:text-4xl text-2xl font-raleway font-bold">
                                                Robust wallet<span className="text-primary">System</span>
                                            </h2>
                                            <p className="md:md:text-xl text-sm max-w-4xl mx-auto mt-6">
                                                Wokpa’s postproduction process takes the headache out of audio production. Set the right podcast loudness and levels while reducing background noise with a click of a button.
                                            </p>
                                            <div className="mt-4 md:text-left text-center">
                                                <Button className="text-sm py-2">Try Wokpa for free</Button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel as="div" className="mt-16">
                                <div className="flex md:flex-row flex-col gap-6 md:gap-24 items-center">
                                    <motion.div
                                        initial={{ translateX: 350, opacity: 0 }}
                                        whileInView={{ translateX: 0, opacity: 1 }}
                                        transition={{
                                            type: "tween",
                                            ease: "easeIn",
                                            duration: 0.3
                                        }}
                                        className="">
                                        <img width={574} height={335} src={"/images/host-image.png"} alt="" />
                                    </motion.div>
                                    <div className="md:w-6/12">
                                        <motion.div
                                            initial={{ translateX: -350, opacity: 0 }}
                                            whileInView={{ translateX: 0, opacity: 1 }}
                                            transition={{
                                                type: "tween",
                                                ease: "easeIn",
                                                duration: 0.3
                                            }}
                                            className="text-left">
                                            <h2 className="md:text-4xl text-2xl font-raleway font-bold">
                                                <span className="text-primary">Unlimited</span> Audio Distribution
                                            </h2>
                                            <p className="md:md:text-xl text-sm max-w-4xl mx-auto mt-6">
                                                It doesn’t matter if you publish your podcast on a daily, weekly, or monthly schedule, there are no caps on your uploads or downloads.
                                            </p>
                                            <div className="mt-4 md:text-left text-center">
                                                <Button className="text-sm py-2">Try Wokpa for free</Button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel as="div" className="mt-16">
                                <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-24 items-center">
                                    <motion.div
                                        initial={{ translateX: -350, opacity: 0 }}
                                        whileInView={{ translateX: 0, opacity: 1 }}
                                        transition={{
                                            type: "tween",
                                            ease: "easeIn",
                                            duration: 0.3
                                        }}
                                        className="">

                                        <img width={568} height={335} src={"/images/analyse-image.png"} alt="" />
                                    </motion.div>
                                    <div className="md:w-6/12">
                                        <motion.div
                                            initial={{ translateX: 350, opacity: 0 }}
                                            whileInView={{ translateX: 0, opacity: 1 }}
                                            transition={{
                                                type: "tween",
                                                ease: "easeIn",
                                                duration: 0.3
                                            }}
                                            className="text-left">
                                            <h2 className="md:text-4xl text-2xl font-raleway font-bold">
                                                Robost Analytics Sytem
                                            </h2>
                                            <p className="md:md:text-xl text-sm max-w-4xl mx-auto mt-6">
                                                Understand where your listeners are located and what platforms they use to listen. With download by location, go beyond the country level and also see what regions/states and cities your audience are listening from.
                                            </p>
                                            <div className="mt-4 md:text-left text-center">
                                                <Button className="text-sm py-2">Try Wokpa for free</Button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </Tab.Panel>
                            <Tab.Panel as="div" className="mt-16">
                                <div className="flex md:flex-row flex-col flex-1 gap-6 md:gap-24 items-center">
                                    <motion.div
                                        initial={{ translateX: 350, opacity: 0 }}
                                        whileInView={{ translateX: 0, opacity: 1 }}
                                        transition={{
                                            type: "tween",
                                            ease: "easeIn",
                                            duration: 0.3
                                        }}
                                        className="">
                                        <img width={574} height={335} src={"/images/monetize-image.png"} alt="" />
                                    </motion.div>
                                    <div className="md:w-6/12">
                                        <motion.div
                                            initial={{ translateX: -350, opacity: 0 }}
                                            whileInView={{ translateX: 0, opacity: 1 }}
                                            transition={{
                                                type: "tween",
                                                ease: "easeIn",
                                                duration: 0.3
                                            }}
                                            className="text-left">
                                            <h2 className="md:text-4xl text-2xl font-raleway font-bold">
                                                Robost Ad Managment Sytem
                                            </h2>
                                            <p className="md:md:text-xl text-sm max-w-4xl mx-auto mt-6">
                                                Connect your show and access Wokpa’s Ad Marketplace, and let AI match your show with the right brands that resonate with your audience. You don’t need a massive audience to make money podcasting, so we’ve created a flexible way for you to earn.
                                            </p>
                                            <div className="mt-4 md:text-left text-center">
                                                <Button className="text-sm py-2">Try Wokpa for free</Button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </section>


    )
}

export default AllInOne;