"use client";

import Link from "next/link";
import TransactionsTable from "../../components/transactions-table"

const PaymentHistoryPage = () => {

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
                        <Link href={"/monetize/wallet"}>

                            Monetize
                        </Link>
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium">
                        <Link href={"/monetize/wallet"}>
                            Wallet
                        </Link>
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Payment history
                    </div>
                </div>

                <div className="pr-5 mt-5">
                    <div className={`font-semibold text-xl pb-2`}>
                        Payment history
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <TransactionsTable showFilter={true} />
            </div>
        </div>
    )
}

export default PaymentHistoryPage