'use client';

import Button from "@/components/button";
import WokpaLogo from "@/components/wokpa-logo";
import Input from "@/components/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlan } from "@/app/api/general";
import { PlanModel } from "@/models/plan";
import { formatToCurrency } from "@/utils";
import { subscribeToPlan } from "@/app/api/publishers";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



const PaymentPageSolo = ({ params }: { params: { planId: string } }) => {
    const [plan, setPlan] = useState<PlanModel | null>(null);
    const navigate = useRouter();

    const handleSubscribe = async () => {
        try {
            const response = await subscribeToPlan(params.planId);
            window.location.href = response.data.data.authorization_url
            toast(response.data.message, { type: "success" });
            navigate.push("/dashboard")
        } catch (error: any) {
            if (error.response) {
                toast(error.response.data.message, { type: "error" });
            }
        }
    }

    useEffect(() => {
        (async () => {
            const response = await getPlan(params.planId);
            setPlan(response.data.data);
        })()
    }, []);

    return (
        <div>
            <div className="">
                <div className="bg-dark contianer md:px-24 py-8 min-h-screen">
                    <div className="text-center">
                        <WokpaLogo />
                    </div>
                    <div className="py-6 px-16 mt-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="bg-[#141414] p-8 flex flex-col gap-6 rounded-xl">
                                    <div className="font-raleway text-4xl">
                                        <span className="text-white font-medium">Subscribing to  <span className="text-teal-400 font-medium ">{plan?.name}</span></span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                            <path d="M14 40V10H15L33 38H34V8M8 20H40M8 28H40" stroke="#FCFCFD" strokeWidth="2" />
                                        </svg>
                                        <span className="font-medium md:text-4xl text-2xl font-raleway">
                                            {plan?.amount ? formatToCurrency(Number(plan?.amount / 100)) : ""}
                                            <span className="text-xl font-normal">
                                                Per month
                                            </span>
                                        </span>
                                    </div>
                                    <div className="font-lg ">
                                        No long term contracts, no hidden fees, and you can <br /> cancel at any time.
                                    </div>
                                    <div style={{ boxShadow: "0px 4px 4px 0px rgba(255, 255, 255, 0.25);" }} className="py-3 px-6 rounded-3xl bg-[#3F3F46]">
                                        <div className="flex gap-2 text-sm">
                                            <div>Save with annual billing</div>
                                            <div>
                                                ₦ 110,000/year
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="bg-[#141414] p-8 flex flex-col gap-6 rounded-xl">
                                        <div className="border-b flex justify-between pb-4">
                                            <div className="font-raleway text-2xl">
                                                {plan?.amount ? formatToCurrency(Number(plan?.amount / 100)) : "0"} (Monthly)
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label htmlFor="password" className="text-sm">
                                                    Account number
                                                </label>
                                                <div className="flex gap-2 w-11/12">
                                                    <div className="flex-1">
                                                        <Input name="email" placeholder="olivia@gmail.com" />
                                                    </div>
                                                    <div>
                                                        <Button className="">
                                                            Apply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="font-zl flex justify-between border-t pt-4">
                                            <div className="font-semibold">
                                                Am ount due today
                                            </div>
                                            <div className="font-semibold">
                                                ₦100,000
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="bg-[#141414] p-8 flex flex-col gap-6 rounded-xl">
                                        <div className="font-lg ">
                                            You’re subscribing to {plan?.name}. You’ll be charged  {plan?.amount ? formatToCurrency(Number(plan?.amount / 100)) : "0"} today and again automatically each month, until you cancel your subscription. Each month is paid in advance, and you can cancel at any time from your Account Settings. The payment will be processed by Stripe, a secure payment gateway.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-[#141414] p-8 flex flex-col gap-6 rounded-xl">
                                    <div className="font-raleway text-4xl font-medium">
                                        Pay with bank transfer
                                    </div>

                                    <div className="space-y-5">
                                        <div className="flex gap-2">
                                            <div className="w-10/12 space-y-4">
                                                <div>
                                                    <label htmlFor="password" className="text-sm">
                                                        Account number
                                                    </label>
                                                    <Input name="email" placeholder="olivia@gmail.com" className="!bg-[#202939] !border-none text-white placeholder:text-white" />
                                                </div>
                                                <div>
                                                    <label htmlFor="password" className="text-sm">
                                                        Bank name
                                                    </label>
                                                    <Input name="email" placeholder="olivia@gmail.com" className="!bg-[#202939] !border-none text-white placeholder:text-white" />
                                                </div>
                                                <div>
                                                    <label htmlFor="password" className="text-sm">
                                                        Account name
                                                    </label>
                                                    <Input name="email" placeholder="olivia@gmail.com" className="!bg-[#202939] !border-none text-white placeholder:text-white" />
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <div className="w-[92px] h-9 px-3.5 py-2 bg-[#E1E8EC] rounded-3xl border border-[#D0D5DD] justify-center items-center gap-2 inline-flex">
                                                    <div>
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#clip0_2775_50142)">
                                                                <path d="M4.16699 12.5001C3.39042 12.5001 3.00214 12.5001 2.69585 12.3732C2.28747 12.2041 1.96302 11.8796 1.79386 11.4712C1.66699 11.1649 1.66699 10.7767 1.66699 10.0001V4.33341C1.66699 3.39999 1.66699 2.93328 1.84865 2.57676C2.00844 2.26316 2.2634 2.00819 2.57701 1.8484C2.93353 1.66675 3.40024 1.66675 4.33366 1.66675H10.0003C10.7769 1.66675 11.1652 1.66675 11.4715 1.79362C11.8798 1.96277 12.2043 2.28723 12.3735 2.69561C12.5003 3.00189 12.5003 3.39018 12.5003 4.16675M10.167 18.3334H15.667C16.6004 18.3334 17.0671 18.3334 17.4236 18.1518C17.7372 17.992 17.9922 17.737 18.152 17.4234C18.3337 17.0669 18.3337 16.6002 18.3337 15.6667V10.1667C18.3337 9.23333 18.3337 8.76662 18.152 8.4101C17.9922 8.09649 17.7372 7.84153 17.4236 7.68174C17.0671 7.50008 16.6004 7.50008 15.667 7.50008H10.167C9.23357 7.50008 8.76686 7.50008 8.41034 7.68174C8.09674 7.84153 7.84177 8.09649 7.68198 8.4101C7.50033 8.76662 7.50033 9.23333 7.50033 10.1667V15.6667C7.50033 16.6002 7.50033 17.0669 7.68198 17.4234C7.84177 17.737 8.09674 17.992 8.41034 18.1518C8.76686 18.3334 9.23357 18.3334 10.167 18.3334Z" stroke="#063150" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_2775_50142">
                                                                    <rect width="20" height="20" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                    <div className="text-[#063150] text-[14px] font-semibold font-inter">Copy</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#141414] p-8 flex flex-col gap-6 rounded-xl">
                                    <div className="font-raleway text-4xl font-medium">
                                        Pay with bank transfer
                                    </div>

                                    <div className="space-y-5">
                                        <div className="">
                                            <div className=" space-y-4">
                                                <div>
                                                    <label htmlFor="password" className="text-sm">
                                                        Card information
                                                    </label>
                                                    <Input name="email" placeholder="olivia@gmail.com" className="" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <div>
                                                        <label htmlFor="password" className="text-sm">
                                                            Expiry date
                                                        </label>
                                                        <Input name="email" placeholder="olivia@gmail.com" className="" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="password" className="text-sm">
                                                            CVC
                                                        </label>
                                                        <Input name="email" placeholder="olivia@gmail.com" className="" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="password" className="text-sm">
                                                        ZIP / Postal Code
                                                    </label>
                                                    <Input name="email" placeholder="olivia@gmail.com" className="" />
                                                </div>
                                                <div>
                                                    <label htmlFor="password" className="text-sm">
                                                        Country
                                                    </label>
                                                    <Input name="email" placeholder="olivia@gmail.com" className="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="bg-[#141414] p-8 flex flex-col gap-6 rounded-xl">
                                        <div className="">

                                            <div className="space-y-4">
                                                <div className="">
                                                    <div className="text-sm font-normal text-gray-50">
                                                        <input type="checkbox" name="" id="" />
                                                        <label htmlFor="password" className="text-sm ml-2">
                                                            I accept <Link href="/" className=" text-[#25AEA4]"> Terms & Conditions </Link> and <Link href="/" className=" text-[#25AEA4]"> Privacy Policy.</Link>
                                                        </label>
                                                    </div>
                                                </div>
                                                <Button onClick={handleSubscribe} className="">
                                                    Subscribe
                                                </Button>

                                            </div>

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

export default PaymentPageSolo;