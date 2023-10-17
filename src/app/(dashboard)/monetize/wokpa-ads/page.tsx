"use client";

import Button from "@/components/button";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { Switch } from "@headlessui/react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Pie, PieChart, Cell } from 'recharts';


const data = [
    {
        name: 'Jan',
        uv: 70,
        pv: 14,
        amt: 64,
    },
    {
        name: 'Feb',
        uv: 28,
        pv: 44,
        amt: 34,
    },
    {
        name: 'Mar',
        uv: 12,
        pv: 24,
        amt: 41,
    },
    {
        name: 'Apr',
        uv: 15,
        pv: 44,
        amt: 32,
    },
    {
        name: 'May',
        uv: 20,
        pv: 24,
        amt: 34,
    },
    {
        name: 'Jun',
        uv: 42,
        pv: 27,
        amt: 38,
    },
    {
        name: 'Jul',
        uv: 50,
        pv: 54,
        amt: 44,
    },
    {
        name: 'Aug',
        uv: 70,
        pv: 14,
        amt: 64,
    },
    {
        name: 'Sep',
        uv: 28,
        pv: 44,
        amt: 34,
    },
    {
        name: 'Oct',
        uv: 12,
        pv: 24,
        amt: 41,
    },
    {
        name: 'Nov',
        uv: 50,
        pv: 54,
        amt: 44,
    },
    {
        name: 'Dec',
        uv: 50,
        pv: 54,
        amt: 44,
    },
];

const Chart = () => {
    return (
        <div className="">


            <div className="py-6 px-6 rounded-xl mt-3 space-y-10 ">
                <div className="flex justify-end gap-2">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#92D6D1] rounded-full"></span>
                        <div className="text-xs text-[#344054]">Revenue</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#19746D] rounded-full"></span>
                        <div className="text-xs text-[#344054]">Impressions</div>
                    </div>
                </div>
                <div className="">
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart
                            width={500}
                            height={170}
                            data={data}
                        >
                            <XAxis fill="#F2F4F7" className="font-inter text-xs text-[#F2F4F7]" axisLine={false} tickLine={false} dataKey="name" />
                            <YAxis axisLine={false} tickLine={false} className="font-inter text-xs text-[#F2F4F7]" label={{ value: 'Last 30 days of revenue', angle: -90, position: 'insideLeft' }} />
                            <CartesianGrid vertical={false} />
                            <Bar dataKey="uv" stackId="a" fill="#19746D" barSize={32} />
                            <Bar dataKey="pv" stackId="a" fill="#92D6D1" barSize={32} radius={[6, 6, 0, 0]} />


                        </BarChart>
                    </ResponsiveContainer>
                </div>



            </div>
        </div>
    )
}


const TransactionsTable = () => {
    const [viewMode, setViewMode] = useState<"list" | "card">("list");
    return (
        <div className="mt-4">
            <div className="mt-8">
                <div>
                    <div className="overflow-x-auto mt-8 md:h-auto h-96 rounded-lg">
                        <table className="border-collapse table-auto w-full whitespace-nowrap">
                            <thead className="bg-[#101828] rounded-t-lg text-base  text-white text-left border-none">
                                <tr>
                                    <th className="py-4 pl-10 font-medium text-xs">Purpose</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Type</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Date & Time</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Payment ID</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Amount</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Status</th>
                                    <th className="py-4 pl-6 font-medium text-xs"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-[#141414]">
                                {
                                    [1, 2, 3, 4, 5,].map(() => {
                                        return <tr>
                                            <td className="py-4 border-b pl-10 text-xs font-medium border-t border-[#667085]">
                                                <div className="">
                                                    <input className="rounded-md border-[#D0D5DD] bg-white" type="checkbox" name="" id="" />
                                                    <span className="ml-2">Package subscription</span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="inline-flex gap-1 text-sm font-medium rounded-full py-1 px-3 border-2 text-red-500 border-red-500 items-center">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span>
                                                            Debit
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div>June 10,2023 9:23AM</div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="">
                                                    #202310412
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="text-sm font-bold ">
                                                    <span className="">
                                                        ₦
                                                    </span>
                                                    <span className="ml-1">10,000</span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    <span className="bg-green-200 text-green-600 rounded-full py-2 px-4">
                                                        Completed
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="flex items-center gap-6">
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.0002 10.6663C17.4668 10.6663 18.6668 9.46634 18.6668 7.99967C18.6668 6.53301 17.4668 5.33301 16.0002 5.33301C14.5335 5.33301 13.3335 6.53301 13.3335 7.99967C13.3335 9.46634 14.5335 10.6663 16.0002 10.6663ZM16.0002 13.333C14.5335 13.333 13.3335 14.533 13.3335 15.9997C13.3335 17.4663 14.5335 18.6663 16.0002 18.6663C17.4668 18.6663 18.6668 17.4663 18.6668 15.9997C18.6668 14.533 17.4668 13.333 16.0002 13.333ZM16.0002 21.333C14.5335 21.333 13.3335 22.533 13.3335 23.9997C13.3335 25.4663 14.5335 26.6663 16.0002 26.6663C17.4668 26.6663 18.6668 25.4663 18.6668 23.9997C18.6668 22.533 17.4668 21.333 16.0002 21.333Z" fill="#F2F4F7" />
                                                    </svg>

                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}

const WokpaAdsPage = () => {
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
                        Monetize
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Wokpa Ads
                    </div>
                </div>
                <div className="pr-5 mt-5">
                    <div className={`font-semibold text-xl pb-2`}>
                        Wokpa Ads
                    </div>
                    <div>
                        <p className="text-sm">
                            We monetize your podcast so you don't have to.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="py-4 px-6 rounded-xl bg-grayTrue">
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
                        <div className="flex items-center gap-2 py-2">
                            <Switch
                                checked={true}
                                onChange={() => { }}
                                className={`${true ? 'bg-[#21A79C]' : 'bg-teal-700'} relative inline-flex h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    className={`${true ? 'translate-x-[0.82rem]' : 'translate-x-0'} pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                            <div className="text-sm font-medium">
                                Ads exchange activation
                            </div>
                        </div>
                        <div>
                            <div>
                                <Button className="!from-transparent !to-transparent text-sm font-semibold border bg-gradient-to-r bg-clip-text py-2">
                                    Learn more about wokpa ads
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="py-6 px-6 rounded-xl bg-grayTrue">
                    <div className="flex justify-between">
                        <div className="text-lg font-medium">
                            Ads exchange stats
                        </div>
                        <div>
                            <Button className="!from-white !to-white text-sm !text-[#042946] font-semibold py-2">
                                View more
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="py-6 px-6 rounded-xl bg-white">
                            <div className="flex gap-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 13V17M16 11V17M12 7V17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z" stroke="#BA24D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <div>
                                    <div className="text-sm font-medium text-[#344054]">Last 30 days impressions</div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between font-">
                                <div className="text-xl font-bold font-raleway text-[#101828]">4,000</div>
                                <span className="text-sm font-medium bg-green-100 py-1 px-3 rounded-full inline-flex items-center gap-1 font-inter text-green-600">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>7.2%</span>
                                </span>

                            </div>
                        </div>
                        <div className="py-6 px-6 rounded-xl bg-white">
                            <div className="flex gap-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 9.5V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.7157 19.2843 4.40974 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H5.2C4.0799 4 3.51984 4 3.09202 4.21799C2.7157 4.40973 2.40973 4.71569 2.21799 5.09202C2 5.51984 2 6.0799 2 7.2V16.8C2 17.9201 2 18.4802 2.21799 18.908C2.40973 19.2843 2.71569 19.5903 3.09202 19.782C3.51984 20 4.07989 20 5.2 20L16.8 20C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V14.5M15 12C15 11.5353 15 11.303 15.0384 11.1098C15.1962 10.3164 15.8164 9.69624 16.6098 9.53843C16.803 9.5 17.0353 9.5 17.5 9.5H19.5C19.9647 9.5 20.197 9.5 20.3902 9.53843C21.1836 9.69624 21.8038 10.3164 21.9616 11.1098C22 11.303 22 11.5353 22 12C22 12.4647 22 12.697 21.9616 12.8902C21.8038 13.6836 21.1836 14.3038 20.3902 14.4616C20.197 14.5 19.9647 14.5 19.5 14.5H17.5C17.0353 14.5 16.803 14.5 16.6098 14.4616C15.8164 14.3038 15.1962 13.6836 15.0384 12.8902C15 12.697 15 12.4647 15 12Z" stroke="#BA24D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                <div>
                                    <div className="text-sm font-medium text-[#344054]">Last 30 days revenue</div>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between font-">
                                <div className="text-xl font-bold font-raleway text-[#101828]"><span className="font-medium">₦</span> 4,000</div>
                                <span className="text-sm font-medium bg-green-100 py-1 px-3 rounded-full inline-flex items-center gap-1 font-inter text-green-600">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>7.2%</span>
                                </span>

                            </div>
                        </div>
                    </div>
                    <Chart />
                </div>
                <div className="my-4">
                    <div className="font-medium">
                        Activate your episodes to receive ads on it. Don't miss out on any monetization opportunity!
                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto mt-8 md:h-auto h-96 rounded-lg">
                        <table className="border-collapse table-auto w-full whitespace-nowrap">
                            <thead className="ext-left border-none">
                                <tr>
                                    <th className="py-4 pl-10 font-medium text-lg">Episode title</th>
                                    <th className="py-4 pl-6 font-medium text-lg">Activation status</th>
                                    <th className="py-4 pl-6 font-medium text-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    [1, 2, 3, 4, 5,].map(() => {
                                        return <tr>
                                            <td className="py-3 pl-10 font-medium border-b-4 border-dark bg-[#141414] rounded-l-xl">
                                                <div className="">
                                                    <span className="ml-2">Episode sample title</span>
                                                </div>
                                            </td>
                                            <td className="py-3 pl-6  font-medium border-b-4 border-dark bg-[#141414]">
                                                <div className="">
                                                    <Button className="!from-white !to-white text-sm font-semibold !text-[#042946]">
                                                        Inactive
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="py-3 pl-6 font-medium border-b-4 border-dark bg-[#141414] rounded-r-xl">
                                                <div>
                                                    <Button className="text-sm font-semibold">
                                                        Active
                                                    </Button>
                                                </div>
                                            </td>

                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default WokpaAdsPage