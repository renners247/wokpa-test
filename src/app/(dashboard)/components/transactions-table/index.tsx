"use client";

import { getTransactions } from "@/app/api/publishers";
import { TransactionModel } from "@/models/transaction";
import { APICall, formatToCurrency } from "@/utils";
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { Listbox, Popover } from "@headlessui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { usePopper } from "react-popper";


const TransactionsTable: React.FC<{ showFilter?: boolean }> = ({ showFilter }) => {
    const [viewMode, setViewMode] = useState<"list" | "card">("list");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalContent, setTotalContent] = useState(0);

    const [transactions, setTransactions] = useState<TransactionModel[]>([]);
    const [selectedRange, setSelectedRange] = useState("");
    let [referenceElement, setReferenceElement] = useState<any>()
    let [popperElement, setPopperElement] = useState<any>()
    let { styles, attributes } = usePopper(referenceElement, popperElement);

    const [dateRange, setDateRange] = useState<{ startDate: string | Date, endDate: string | Date, key: string }[]>([
        {
            startDate: "", endDate: "",
            key: 'selection'
        }
    ]);

    const onChange = (ranges: RangeKeyDict) => {
        const [start, end] = [ranges.selection.startDate as Date, ranges.selection.endDate as Date];
        setDateRange([{ startDate: start, endDate: end, key: "selection" }]);
    };

    const handleGetTransactions = async (page?: number) => {
        try {
            switch (selectedRange) {
                case "12": {
                    const response = await APICall(getTransactions, [page ? page : currentPage, 15, moment().subtract(12, "months").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")], true);
                    setTransactions(response.data.data.results);
                    setTotalContent(response.data.data.total);
                    break;
                }
                case "30": {
                    const response = await APICall(getTransactions, [page ? page : currentPage, 15, moment().subtract(30, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")], true);
                    setTransactions(response.data.data.results);
                    setTotalContent(response.data.data.total);
                    break;
                }
                case "7": {
                    const response = await APICall(getTransactions, [page ? page : currentPage, 15, moment().subtract(7, "days").format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")], true);
                    setTransactions(response.data.data.results);
                    setTotalContent(response.data.data.total);
                    break;
                }
                case "custom": {
                    if (moment(dateRange[0].startDate).isValid() && moment(dateRange[0].endDate).isValid()) {
                        const response = await APICall(getTransactions, [page ? page : currentPage, 15, moment(dateRange[0].startDate).format("YYYY-MM-DD"), moment(dateRange[0].endDate).format("YYYY-MM-DD")], true);
                        setTransactions(response.data.data.results);
                        setTotalContent(response.data.data.total);
                    }

                    break;
                }
                default: {
                    const response = await APICall(getTransactions, [page ? page : currentPage, 15], true);
                    setTransactions(response.data.data.results);
                    setTotalContent(response.data.data.total);
                }
            }



        } catch (error) {
            console.log(error);
        }
    }

    const handlePageClick = (event: any) => {
        setCurrentPage(++event.selected);
        handleGetTransactions((event.selected + 1))
    };

    useEffect(() => {
        handleGetTransactions()
    }, [selectedRange]);

    useEffect(() => {
        if (dateRange[0].startDate && dateRange[0].endDate)
            handleGetTransactions()
    }, [dateRange]);


    return (
        <div className="mt-4">
            <div className="mt-8">
                {showFilter && <div className="flex">
                    <div className="rounded-lg border border-[#D0D5DD] flex">
                        <div onClick={() => setSelectedRange("12")} className={`rounded-l-lg border-r border-[#D0D5DD] text-sm font-inter font-semibold py-[10px] px-4 hover:text-[#101828] hover:bg-white cursor-pointer ${selectedRange == "12" ? "bg[#101828]" : "bg-[#26272B]"}`}>
                            12 months</div>
                        <div onClick={() => setSelectedRange("30")} className={`border-r border-[#D0D5DD] text-sm font-inter font-semibold py-[10px] px-4 hover:text-[#101828] hover:bg-white cursor-pointer ${selectedRange == "30" ? "bg[#101828]" : "bg-[#26272B]"}`}>
                            30 days</div>
                        <div onClick={() => setSelectedRange("7")} className={`border-r border-[#D0D5DD] text-sm font-inter font-semibold py-[10px] px-4 hover:text-[#101828] hover:bg-white cursor-pointer ${selectedRange == "7" ? "bg[#101828]" : "bg-[#26272B]"}`}>
                            7 days</div>
                        <div  >
                            <Popover onClick={() => setSelectedRange("custom")} className={`relative`}>
                                <Popover.Button className={`relative outline-none  rounded-r-lg border-r border-[#D0D5DD] text-sm font-inter font-semibold py-[10px] px-4 hover:text-[#101828] hover:bg-white cursor-pointer ${selectedRange == "custom" ? "bg[#101828]" : "bg-[#26272B]"}`} ref={setReferenceElement} >
                                    <div className="flex items-center-gap-2">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0001 4.16602V15.8327M4.16675 9.99935H15.8334" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span> Custom</span>
                                    </div>
                                </Popover.Button>

                                <Popover.Panel
                                    ref={setPopperElement}
                                    style={styles.popper}
                                    {...attributes.popper}
                                    className="absolute z-30 text-black shadow-md">
                                    <DateRangePicker
                                        ranges={dateRange as any}
                                        onChange={onChange}
                                    />
                                </Popover.Panel>
                            </Popover>

                        </div>

                    </div>
                </div>}
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
                                    transactions?.map((transaction) => {
                                        return <tr key={transaction.reference_number}>
                                            <td className="py-4 border-b pl-10 text-xs font-medium border-t border-[#667085]">
                                                <div className="">
                                                    <input className="rounded-md border-[#D0D5DD] bg-white" type="checkbox" name="" id="" />
                                                    <span className="ml-2">{transaction.narration}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="">
                                                    <span className={`inline-flex gap-1 text-sm font-medium rounded-full py-1 px-3 border-2 ${transaction.type.toLowerCase() == "credit" ? "text-green-500 border-green-500" : "text-red-500 border-red-500"}  items-center`}>
                                                        <svg className={`${transaction.type.toLowerCase() == "credit" ? "rotate-180 text-600" : "text-[#F04438]"}`} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span>
                                                            {
                                                                transaction.type
                                                            }
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div>
                                                    {moment(transaction.transaction_time).format("MMM DD, YYYY h:mm a")}
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                <div className="">
                                                    #{transaction.reference_number}
                                                </div>
                                            </td>
                                            <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                <div className="text-sm font-bold ">
                                                    <span className="">
                                                        ₦
                                                    </span>
                                                    <span className="ml-1">{formatToCurrency(transaction.amount / 100)}</span>
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
                                                <Listbox as={"div"} className="relative">
                                                    <Listbox.Button className="">
                                                        <div className="flex items-center gap-6">
                                                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M16.0002 10.6663C17.4668 10.6663 18.6668 9.46634 18.6668 7.99967C18.6668 6.53301 17.4668 5.33301 16.0002 5.33301C14.5335 5.33301 13.3335 6.53301 13.3335 7.99967C13.3335 9.46634 14.5335 10.6663 16.0002 10.6663ZM16.0002 13.333C14.5335 13.333 13.3335 14.533 13.3335 15.9997C13.3335 17.4663 14.5335 18.6663 16.0002 18.6663C17.4668 18.6663 18.6668 17.4663 18.6668 15.9997C18.6668 14.533 17.4668 13.333 16.0002 13.333ZM16.0002 21.333C14.5335 21.333 13.3335 22.533 13.3335 23.9997C13.3335 25.4663 14.5335 26.6663 16.0002 26.6663C17.4668 26.6663 18.6668 25.4663 18.6668 23.9997C18.6668 22.533 17.4668 21.333 16.0002 21.333Z" fill="#F2F4F7" />
                                                            </svg>
                                                        </div>
                                                    </Listbox.Button>
                                                    <Listbox.Options className="absolute mt-4 w-[205px] overflow-auto bg-[#141414] rounded-lg text-sm font-medium right-4 drop-shadow-[0px_3px_5px_rgba(255,255,255,0.1)] z-20">
                                                        <div className="p-2">
                                                            <Listbox.Option value={"1"}>
                                                                {({ active }) => (
                                                                    <div
                                                                        className={`py-[0.63rem] px-2 rounded-lg bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                                                    >
                                                                        Download
                                                                    </div>
                                                                )}
                                                            </Listbox.Option>
                                                            <Listbox.Option value={"1"}>
                                                                {({ active }) => (
                                                                    <div
                                                                        className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] ${active ? 'bg-[#1D2939]' : ""}`}
                                                                    >
                                                                        Contact support
                                                                    </div>
                                                                )}
                                                            </Listbox.Option>

                                                        </div>

                                                    </Listbox.Options>
                                                </Listbox>

                                            </td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <div className="py-5 px-4 mt-6">
                    <ReactPaginate
                        breakLabel="..."
                        containerClassName='flex items-center justify-between'
                        nextClassName='flex-1 flex justify-end'
                        pageClassName='flex items-center justify-center w-[40px] h-[40px]'
                        pageLinkClassName='font-inter text-sm font-medium'
                        activeClassName='bg-white text-dark rounded-full'
                        previousClassName='flex-1 '
                        previousLabel={
                            <div className='flex items-center gap-2'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.8332 10.0003H4.1665M4.1665 10.0003L9.99984 15.8337M4.1665 10.0003L9.99984 4.16699" stroke="#EAECF0" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm font-semibold">
                                    Previous
                                </span>
                            </div>
                        }
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        forcePage={(currentPage - 1)}
                        pageCount={Math.ceil(totalContent / 15)}
                        nextLabel={
                            <div className='flex items-center gap-2'>

                                <span className="text-sm font-semibold">
                                    Next
                                </span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337" stroke="#EAECF0" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>


                            </div>
                        }
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div >
    )
}

export default TransactionsTable;