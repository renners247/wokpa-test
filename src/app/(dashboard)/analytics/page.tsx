"use client";

import { getAnalytics, getPodcastArchive, getPodcasts } from "@/app/api/publishers";
import Button from "@/components/button";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { PodcastModel } from "@/models/podcast";
import { pushPodcasts } from "@/redux/podcast";
import { APICall, formatToCurrency } from "@/utils";
import { Listbox, Popover, Switch } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import { usePopper } from "react-popper";
import { updateAnalytics } from "@/redux/analytics";
import { useEffectOnce } from "react-use";

const PodcastTable = () => {
    const dispatch = useAppDispatch();
    const navigate = useRouter();

    const [podcasts, setPodcasts] = useState<PodcastModel[]>([]);
    const refresh = useAppSelector(state => state.podcasts.refresh);
    const podcastsCache = useAppSelector(state => state.podcasts.podcasts);
    const analytics = useAppSelector(state => state.analytics.analytics)

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

    const [podcastLoaded, setPodcastLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isArchive, setIsArchive] = useState(false);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalContent, setTotalContent] = useState(0);


    const filters = [
        { id: 1, name: 'Last 7 days' },
        { id: 2, name: 'Last 14 days' },
        { id: 3, name: 'Last 30 days' },
        { id: 4, name: 'First 90 days' },
        { id: 5, name: 'All time' },

    ]

    const [selectedFilter, setSelectedFilter] = useState(filters[0]);

    const handleGetPodcast = async (page?: number) => {
        try {
            const response = await APICall(isArchive ? getPodcastArchive : getPodcasts, page ? page : currentPage);
            setPodcasts(response.data.data.data);
            setTotalContent(response.data.data.total);
            setPodcastLoaded(true);

            if (currentPage == 1)
                dispatch(pushPodcasts({ podcasts: response.data.data.data }))

        } catch (error) {
            console.log(error);
        }
    }

    const handlePageClick = (event: any) => {
        setCurrentPage(++event.selected);
        handleGetPodcast((event.selected + 1))
    };

    const handleRedorder = (v: any) => {
        try {
            switch (v.id) {
                case 1:
                    {
                        const _podcasts = [...podcasts]
                        setPodcasts(_podcasts.sort((a, b) => new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()));
                        break;
                    }
                case 2:
                    {

                        const _podcasts = [...podcasts]
                        const n = _podcasts.sort((a, b) => a.title.localeCompare(b.title))
                        setPodcasts(n);
                        break;
                    }
                case 3:
                    {
                        const _podcasts = [...podcasts]
                        setPodcasts(_podcasts.sort((a, b) => Number(a.play_count) - Number(b.play_count)));
                        break;
                    }
                case 4:
                    {
                        const _podcasts = [...podcasts]
                        setPodcasts(_podcasts.reverse());
                        break;
                    }
                case 5:
                    {
                        const _podcasts = [...podcasts]
                        setPodcasts(_podcasts.reverse());
                        break;
                    }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetPodcast()
    }, [isArchive, refresh]);

    return (
        <div className="mt-8">
            <div className="">
                <div className="flex gap-6 items-center">
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute pl-3 flex items-center h-full justify-center">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#98A2B3" stroke-width="1.66667" stroke-linecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>
                            <input type="text" placeholder="Search" className="text-xs placeholder:text-xs w-full placeholder:text-[#98A2B3] pl-10 pr-3 py-[10px] rounded-lg border border-gray-300 bg-transparent" />
                        </div>
                    </div>
                    <Listbox value={selectedFilter} onChange={(v) => {
                        setSelectedFilter(v);
                        handleRedorder(v)
                    }} as={"div"} className="relative">
                        <Listbox.Button className="inline-flex justify-between text-xs font-medium gap-2 items-center border rounded-lg py-[10px] px-4 border-[#36FFE8] w-[244px]">
                            {selectedFilter.name}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 w-[205px] bg-[#141414] rounded-lg text-xs font-medium z-20">
                            <div className="p-2">
                                {
                                    filters.map(filter => {
                                        return <Listbox.Option className={"cursor-pointer"} key={filter.name} value={filter}>
                                            {({ active, selected }) => (
                                                <div
                                                    className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] `}
                                                >
                                                    {filter.name}
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    })
                                }
                            </div>
                            <hr />
                            <div className="p-2">
                                <Listbox.Option className={"cursor-pointer"} value={{ id: 6, name: "Custom range" }}>
                                    {({ active, selected }) => (

                                        <Popover className={``}>
                                            <Popover.Button ref={setReferenceElement} className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] w-full text-left `} >
                                                <span>  Choose a date range</span>
                                            </Popover.Button>

                                            <Popover.Panel
                                                ref={setPopperElement}
                                                style={styles.popper}
                                                {...attributes.popper}
                                                className="text-black shadow-md">
                                                <DateRangePicker
                                                    ranges={dateRange as any}
                                                    onChange={onChange}
                                                />
                                            </Popover.Panel>
                                        </Popover>
                                    )}
                                </Listbox.Option>

                            </div>
                        </Listbox.Options>
                    </Listbox>
                    <button>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="4" fill="#1D2939" />
                            <path d="M29 23V24.2C29 25.8802 29 26.7202 28.673 27.362C28.3854 27.9265 27.9265 28.3854 27.362 28.673C26.7202 29 25.8802 29 24.2 29H15.8C14.1198 29 13.2798 29 12.638 28.673C12.0735 28.3854 11.6146 27.9265 11.327 27.362C11 26.7202 11 25.8802 11 24.2V23M25 18L20 23M20 23L15 18M20 23V11" stroke="#EAECF0" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>


            </div>
            <div className="mt-8">
                {
                    <div>
                        {
                            <div>
                                <div className="overflow-x-scroll mt-8 md:h-auto h-96 rounded-lg">
                                    <table className="border-collapse table-auto w-full whitespace-nowrap">
                                        <thead className="text-white text-left border-b-2 border-[#EAECF0]">
                                            <tr>
                                                <th className="py-4 pl-6 font-medium text-sm">{totalContent} podcasts</th>
                                                <th className="py-4 pl-6 font-medium text-sm text-right">Subscribers</th>
                                                <th className="py-4 pl-6 font-medium text-sm text-right">Wokpa Ads</th>
                                                <th className="py-4 pl-6 font-medium text-sm text-right">Tips and Donation</th>
                                                <th className="py-4 px-6 font-medium text-sm text-right">Plays</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {
                                                podcasts.map((podcast) => {
                                                    return <tr onClick={() => navigate.push(`/analytics/podcast-view/${podcast.id}`)} className="hover:bg-grayTrue cursor-pointer">
                                                        <td className="py-4 border-b pl-6 text-xs font-bold border-t border-[#667085]">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-[40px] h-[40px] rounded">
                                                                    <img src={podcast.picture_url} alt="" className="w-full h-full rounded" /></div>
                                                                <span className="">{podcast.title}</span>
                                                            </div>
                                                        </td>

                                                        <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] text-right">
                                                            <div className="">
                                                                {podcast.subscriber_count}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] text-right">
                                                            <div>{0}</div>
                                                        </td>
                                                        <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] text-right">
                                                            <div className="">
                                                                {0}
                                                            </div>
                                                        </td>

                                                        <td className="py-4 border-b px-6 text-xs border-t border-[#667085] text-right">
                                                            <div className="">
                                                                {podcast.play_count}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }

                    </div>
                }
            </div>
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
        </div >
    )
}

const AnalyticsPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useRouter();

    const user = useAppSelector(state => state.auth.user);
    const analytics = useAppSelector(state => state.analytics.analytics)

    const handleGetAnalytics = async (page?: number) => {
        try {
            const response = await getAnalytics();
            dispatch(updateAnalytics(response.data.data));

        } catch (error) {
            console.log(error);
        }
    }

    useEffectOnce(() => {
        handleGetAnalytics();
    })


    return (
        <div id="dashboard">
            <div className="relative">
                <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium">
                        Analytics
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className="text-sm font-medium text-[#66C6BF]">
                        Overview
                    </div>
                </div>
                <div className="pr-5 mt-5">
                    <div className={`font-semibold text-xl pb-2`}>
                        Analytics
                    </div>
                    <div>
                        <p className="text-sm">
                            All podcasts
                        </p>
                    </div>
                </div>
            </div>


            <div className="mt-8">
                <div className="grid grid-cols-3 gap-8  ">

                    {/* total income */}
                    <div className="py-6 px-6 rounded-xl bg-grayTrue space-y-2">
                        <div className="flex gap-6">
                            <div>
                                <div className="text-sm font-medium">Total income</div>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_5552_61211)">
                                    <path d="M9.99984 13.3346V10.0013M9.99984 6.66797H10.0082M18.3332 10.0013C18.3332 14.6037 14.6022 18.3346 9.99984 18.3346C5.39746 18.3346 1.6665 14.6037 1.6665 10.0013C1.6665 5.39893 5.39746 1.66797 9.99984 1.66797C14.6022 1.66797 18.3332 5.39893 18.3332 10.0013Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5552_61211">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="flex items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 20V5H7.5L16.5 19H17V4M4 10H20M4 14H20" stroke="#F9FAFB" stroke-width="2" />
                            </svg>
                            <div>
                                <span className="text-2xl font-raleway font-bold">
                                    {formatToCurrency(Number(analytics.total_income))}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-xs text-[#98A2B3]">Last 30 days</div>
                            <span className="text-sm font-medium bg-[#ECFDF3] py-1 pl-[8px] pr-[10px] rounded-full inline-flex items-center gap-1 font-inter text-[#027A48]">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>7.2%</span>
                            </span>

                        </div>
                    </div>

                    {/* followers */}
                    <div className="py-6 px-6 rounded-xl bg-grayTrue space-y-2">
                        <div className="flex gap-6">
                            <div>
                                <div className="text-sm font-medium">Followers</div>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_5552_61211)">
                                    <path d="M9.99984 13.3346V10.0013M9.99984 6.66797H10.0082M18.3332 10.0013C18.3332 14.6037 14.6022 18.3346 9.99984 18.3346C5.39746 18.3346 1.6665 14.6037 1.6665 10.0013C1.6665 5.39893 5.39746 1.66797 9.99984 1.66797C14.6022 1.66797 18.3332 5.39893 18.3332 10.0013Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5552_61211">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="flex items-center">

                            <div>
                                <span className="text-2xl font-raleway font-bold">
                                    {formatToCurrency(Number(analytics.follower_count))}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-xs text-[#98A2B3]">Last 30 days</div>
                            <span className="text-sm font-medium bg-[#ECFDF3] py-1 pl-[8px] pr-[10px] rounded-full inline-flex items-center gap-1 font-inter text-[#027A48]">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>7.2%</span>
                            </span>

                        </div>
                    </div>

                    {/* listeners */}
                    <div className="py-6 px-6 rounded-xl bg-grayTrue space-y-2">
                        <div className="flex gap-6">
                            <div>
                                <div className="text-sm font-medium">Listeners</div>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_5552_61211)">
                                    <path d="M9.99984 13.3346V10.0013M9.99984 6.66797H10.0082M18.3332 10.0013C18.3332 14.6037 14.6022 18.3346 9.99984 18.3346C5.39746 18.3346 1.6665 14.6037 1.6665 10.0013C1.6665 5.39893 5.39746 1.66797 9.99984 1.66797C14.6022 1.66797 18.3332 5.39893 18.3332 10.0013Z" stroke="#D0D5DD" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5552_61211">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className="flex items-center">
                            <div>
                                <span className="text-2xl font-raleway font-bold">
                                    {formatToCurrency(Number(analytics.listener_count))}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-xs text-[#98A2B3]">Last 30 days</div>
                            <span className="text-sm font-medium bg-[#ECFDF3] py-1 pl-[8px] pr-[10px] rounded-full inline-flex items-center gap-1 font-inter text-[#027A48]">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>7.2%</span>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <PodcastTable />
            </div>


        </div>
    )
}

export default AnalyticsPage