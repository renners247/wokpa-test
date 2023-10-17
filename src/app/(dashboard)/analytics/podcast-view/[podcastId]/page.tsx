"use client";

import { archiveEpisode, getArchivedEpisodes, getEpisodes, getEpisodesArchive, getPodcastEpisodes, getPodcastsById, removeArchiveEpisode } from "@/app/api/publishers";
import Button from "@/components/button";
import Input from "@/components/input";
import Modal from "@/components/modal";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { EpisodeModel } from "@/models/episode";
import { PodcastModel } from "@/models/podcast";
import { APICall } from "@/utils";
import { Listbox, Switch, Tab } from "@headlessui/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEffectOnce } from "react-use";
import ReactPaginate from "react-paginate";
import { refreshPodcasts } from "@/redux/podcast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Pie, PieChart, Cell } from 'recharts';
import { formatTimeW } from "@/utils/audio-player";

const followersData = [
    {
        v: 42
    },
    {
        v: 33
    },
    {
        v: 66
    },
    {
        v: 57
    },
    {
        v: 24
    },
    {
        v: 29
    },
    {
        v: 27
    },
    {
        v: 31
    },
    {
        v: 21
    },
    {
        v: 55
    },
    {
        v: 67
    },

];

const ageData = [
    {
        name: '10-16',
        uv: 70,
        pv: 14,
        amt: 64,
    },
    {
        name: '16-21',
        uv: 28,
        pv: 44,
        amt: 34,
    },
    {
        name: '22-28',
        uv: 12,
        pv: 24,
        amt: 41,
    },
    {
        name: '25-43',
        uv: 15,
        pv: 44,
        amt: 32,
    },
    {
        name: '35-44',
        uv: 20,
        pv: 24,
        amt: 34,
    },
    {
        name: '45-59',
        uv: 42,
        pv: 27,
        amt: 38,
    },
    {
        name: '60-50',
        uv: 50,
        pv: 54,
        amt: 44,
    },
    {
        name: 'Unknown',
        uv: 30,
        pv: 64,
        amt: 24,
    },
];

const COLORS = ["#1849A9", "#B2DDFF", "#FFBB28", "#FF8042"];

const CustomLabel: React.FC<any> = ({ viewBox, labelText, value }) => {
    const { cx, cy } = viewBox;
    return (
        <g>
            <text
                x={cx}
                y={cy}
                className="recharts-text recharts-label text-xs text-[#1D2939]"
                textAnchor="middle"
                dominantBaseline="central"
                alignmentBaseline="middle"
            >
                {labelText}
            </text>
            <text
                x={cx}
                y={cy + 20}
                className="recharts-text recharts-label text-xl font-medium text-[#98A2B3]"
                textAnchor="middle"
                dominantBaseline="central"
                alignmentBaseline="middle"
            >
                {value}
            </text>
        </g>
    );
};

const TimeListenedChart = () => {
    return (

        <div className="">
            <div className="text-sm">
                Time listened
            </div>
            {/* total income */}
            <div className="py-6 px-6 rounded-xl mt-3 bg-white space-y-10 h-[230px]">
                <div className="flex items-center gap-4">
                    <div className="">
                        <ResponsiveContainer width={160} height={160}>
                            <PieChart width={160} height={160}>
                                <Pie
                                    data={[{ v: 90 }, { v: 10 }]} dataKey="v" innerRadius={70} outerRadius={80}>
                                    <Cell fill={COLORS[0]} />
                                    <Cell fill={COLORS[1]} />
                                    <Label
                                        content={<CustomLabel labelText="Hours" value={15} />}
                                        position="center"
                                    />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#1849A9] rounded-full"></span>
                            <div className="text-[#101828]">
                                <span className="text-lg font-bold">90%</span>
                                <span className="text-xs ml-1">150</span>
                            </div>
                        </div>
                        <div className="text-xs text-[#344054]  ml-4">Not following</div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#B2DDFF] rounded-full"></span>
                            <div className="text-[#101828]">
                                <span className="text-lg font-bold">10%</span>
                                <span className="text-xs ml-1">150</span>
                            </div>
                        </div>
                        <div className="text-xs text-[#344054] ml-4">following</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const FollowersChart = () => {
    return (
        <div className="">
            <div className="text-sm">
                New followers
            </div>
            {/* total income */}
            <div className="py-6 px-6 rounded-xl mt-3 bg-white space-y-10">
                <div className="flex gap-4 py-1">
                    <div className="flex-1">
                        <div className="text-3xl font-raleway font-medium text-[#101828]">2k</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1 items-center">
                            <svg width="51" height="20" viewBox="0 0 51 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.3332 5.83203L11.776 12.3892C11.446 12.7192 11.281 12.8842 11.0907 12.9461C10.9233 13.0004 10.743 13.0004 10.5757 12.9461C10.3854 12.8842 10.2204 12.7192 9.89036 12.3892L7.60931 10.1082C7.2793 9.77816 7.11429 9.61315 6.92402 9.55133C6.75665 9.49695 6.57636 9.49695 6.40899 9.55133C6.21872 9.61315 6.05371 9.77816 5.72369 10.1082L1.6665 14.1654M18.3332 5.83203H12.4998M18.3332 5.83203V11.6654" stroke="#17B26A" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm font-bold text-[#067647]">15%</span>
                        </div>
                        <span className="text-sm text-[#1D2939]">
                            vs last month
                        </span>
                    </div>
                </div>
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={100}>
                        <AreaChart width={300} height={100} data={followersData}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#17B26A" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#17B26A" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="linear" dataKey="v" stroke="#17B26A" strokeWidth={3} fill="url(#colorUv)" dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

const TopCountries = () => {
    return (
        <div className="">
            <div className="text-sm font-medium">
                Top Countries / Regions <span className="text-xs text-[#98A2B3]">Streams</span>
            </div>
            <div className="divide-y">
                {[1, 1, 1, 1, 1].map((v) => {
                    return (
                        <div className="">
                            <div className="flex justify-between py-4 text-sm font-semibold text-[#98A2B3]">
                                <div className="">Nigeria</div>
                                <div className="font-medium text-[#D0D5DD]">4000</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const GendersChart = () => {
    return (
        <div className="">
            <div className="text-sm">
                Gender
            </div>

            <div className="py-6 px-6 rounded-xl mt-3 bg-white space-y-10 h-[230px]">
                <div className="flex items-center gap-4">
                    <div className="">
                        <ResponsiveContainer width={200} height={200}>
                            <PieChart width={180} height={180}>
                                <Pie
                                    data={[{ v: 60 }, { v: 40 }]} dataKey="v">
                                    <Cell fill={"#BA24D5"} />
                                    <Cell fill={"#F6D0FE"} />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#BA24D5] rounded-full"></span>
                            <div className="text-[#101828]">
                                <span className="text-lg font-bold">90%</span>
                                <span className="text-xs ml-1">150</span>
                            </div>
                        </div>
                        <div className="text-xs text-[#344054]  ml-4">Male</div>
                    </div>
                    <div className="">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#F6D0FE] rounded-full"></span>
                            <div className="text-[#101828]">
                                <span className="text-lg font-bold">10%</span>
                                <span className="text-xs ml-1">150</span>
                            </div>
                        </div>
                        <div className="text-xs text-[#344054] ml-4">Female</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const AgeChart = () => {
    return (
        <div className="">
            <div className="text-sm">
                Gender
            </div>

            <div className="py-6 px-6 rounded-xl mt-3 bg-white space-y-10 ">
                <div className="flex justify-end gap-2">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#F6D0FE] rounded-full"></span>
                        <div className="text-xs text-[#344054]">Male</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#9E77ED] rounded-full"></span>
                        <div className="text-xs text-[#344054]">Female</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#6941C6] rounded-full"></span>
                        <div className="text-xs text-[#344054]">Unspecified</div>
                    </div>
                </div>
                <div className="">
                    <ResponsiveContainer width="100%" height={170}>
                        <BarChart
                            width={500}
                            height={170}
                            data={ageData}
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="pv" stackId="a" fill="#6941C6" barSize={32} />
                            <Bar dataKey="uv" stackId="a" fill="#9E77ED" barSize={32} />
                            <Bar dataKey="amt" stackId="a" fill="#EAECF0" barSize={32} radius={[6, 6, 0, 0]} />

                        </BarChart>
                    </ResponsiveContainer>
                </div>



            </div>
        </div>
    )
}

const RecentEpisodes = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalContent, setTotalContent] = useState(0);
    const [isArchive, setIsArchive] = useState(false);
    const router = useRouter()

    const refresh = useAppSelector(state => state.podcasts.refresh);
    const [episodes, setEpidoes] = useState<EpisodeModel[]>([]);

    const handleGetEpisodes = async (page?: number) => {
        try {
            console.log(page)
            const response = await APICall(isArchive ? getArchivedEpisodes : getEpisodes, [page ? page : currentPage, 15]);
            setEpidoes(response.data.data.data);
            console.log(response.data.data.total)
            setTotalContent(response.data.data.total);

        } catch (error) {
            console.log(error)

        }
    }

    const handlePageClick = (event: any) => {
        setCurrentPage(++event.selected);
        handleGetEpisodes((event.selected + 1))
    };


    useEffect(() => {
        handleGetEpisodes(1)
    }, [refresh]);

    useEffect(() => {
        handleGetEpisodes()
    }, [isArchive]);

    return (
        <div className="">
            <div className="text-sm">
                Recent Episodes
            </div>
            {
                <div className="mt-3">
                    {
                        <div>
                            <div className="overflow-x-scroll mt-8 md:h-auto h-96 rounded-lg">
                                <table className="border-collapse table-auto w-full whitespace-nowrap">
                                    <thead className="text-white text-left border-b-2 border-[#EAECF0]">
                                        <tr>
                                            <th className="py-4 pl-6 font-medium text-sm">Name</th>
                                            <th className="py-4 pl-6 font-medium text-sm text-right">Date uploaded</th>
                                            <th className="py-4 pl-6 font-medium text-sm text-right">Duration</th>
                                            <th className="py-4 pl-6 font-medium text-sm text-right">Tips and Ads</th>
                                            <th className="py-4 px-6 font-medium text-sm text-right">Plays</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {
                                            episodes.map((episode) => {
                                                return <tr className="hover:bg-grayTrue cursor-pointer">
                                                    <td className="py-4 border-b pl-6 text-xs font-bold border-t border-[#667085]">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-[40px] h-[40px] rounded">
                                                                <img src={episode.picture_url} alt="" className="w-full h-full rounded" /></div>
                                                            <span className="">{episode.title}</span>
                                                        </div>
                                                    </td>

                                                    <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] text-right">
                                                        <div className="">
                                                            {moment(episode.created_at).format("MMM YYYY, DD")}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] text-right">
                                                        <div>
                                                            {formatTimeW(episode.duration)}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] text-right">
                                                        <div className="">
                                                            {0}
                                                        </div>
                                                    </td>

                                                    <td className="py-4 border-b px-6 text-xs border-t border-[#667085] text-right">
                                                        <div className="">
                                                            {episode.play_count}
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
    )
}

const PodcastView = ({ params }: { params: { podcastId: string } }) => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalContent, setTotalContent] = useState(0);
    const [isArchive, setIsArchive] = useState(false);

    const [podcast, setPodcast] = useState<PodcastModel | null>(null);
    const [episodes, setEpidoes] = useState<EpisodeModel[]>([]);


    const filters = [
        { id: 1, name: 'Last 7 days' },
        { id: 2, name: 'By podcast title' },
        { id: 3, name: 'By listens' },
        { id: 4, name: 'Ascending' },
        { id: 5, name: 'Descending' },

    ]

    const [selectedFilter, setSelectedFilter] = useState(filters[0]);

    const handleGetEpisodes = async (page?: number) => {
        try {
            console.log(page)
            const response = await APICall(isArchive ? getEpisodesArchive : getPodcastEpisodes, [params.podcastId, page ? page : currentPage, 15]);
            setEpidoes(response.data.data.data);
            setTotalContent(response.data.data.total);

        } catch (error) {
            console.log(error)

        }
    }

    const handleGetPodcasts = async () => {
        try {
            const podcastResponse = await APICall(getPodcastsById, params.podcastId);
            setPodcast(podcastResponse.data.data);

        } catch (error) {
            console.log(error)
        }
    }

    const handlePageClick = (event: any) => {
        setCurrentPage(++event.selected);
        handleGetEpisodes((event.selected + 1))
    };

    const handleRedorder = (v: any) => {
        try {

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        handleGetEpisodes(1)
    }, [isArchive]);

    useEffectOnce(() => {
        handleGetPodcasts();
    });

    return (
        <div id="dashboard">
            <div className="relative">
                <div className="flex gap-4 items-center">
                    <div className="text-sm font-medium">
                        <Link href="/dashboard">
                            All Podcasts
                        </Link>
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        {podcast?.title}
                    </div>
                </div>


                <div className="border rounded-lg p-2 flex items-center gap-8 mt-6">
                    <div className="!w-[100px] !h-[100px]">
                        <img className="!w-[100px] !h-[100px] rounded-lg border-2 border-[#BEE7E4] object-cover" src={podcast?.picture_url} alt="" />
                    </div>
                    <div className="mt-2">
                        <div className="text-xl font-bold">
                            {podcast?.title}
                        </div>
                        <div className="text-sm font-medium mt-2">
                            By: {podcast?.title}
                        </div>
                        <div className="text-sm mt-2">
                            {podcast?.episode_count} Episodes
                        </div>
                    </div>
                </div>


                <div className="mt-8">
                    <Tab.Group>
                        <div className="flex gap-8">
                            <div className="flex-1">
                                <Tab.List className="flex border-b gap-2 border-[#98A2B3]">
                                    <div>
                                        <Tab className="outline-none">
                                            {({ selected }) => (
                                                <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                                    Overview
                                                </div>
                                            )}
                                        </Tab>
                                    </div>
                                    <div>
                                        <Tab className="outline-none">
                                            {({ selected }) => (
                                                <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                                    Trends
                                                </div>
                                            )}
                                        </Tab>
                                    </div>
                                    <div>
                                        <Tab className="outline-none">
                                            {({ selected }) => (
                                                <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                                    Episodes
                                                </div>
                                            )}
                                        </Tab>
                                    </div>
                                </Tab.List>
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
                                <Listbox.Options className="absolute mt-1 w-[205px] overflow-auto bg-[#141414] rounded-lg text-xs font-medium z-20">
                                    <div className="p-2">
                                        {
                                            filters.slice(0, 3).map(filter => {
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
                                        <Listbox.Option className={"cursor-pointer"} value={filters[3]}>
                                            {({ active, selected }) => (
                                                <div
                                                    className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] `}
                                                >
                                                    {filters[3].name}
                                                </div>
                                            )}
                                        </Listbox.Option>
                                        <Listbox.Option className={"cursor-pointer"} value={filters[4]}>
                                            {({ active, selected }) => (
                                                <div
                                                    className={`py-[0.63rem] px-2 rounded-lg hover:bg-[#1D2939] `}
                                                >
                                                    {filters[4].name}

                                                </div>
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
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="mt-8 space-y-8">
                                    <div className="grid grid-cols-4 gap-8  ">

                                        {/* total income */}
                                        <div className="py-6 px-6 rounded-xl bg-grayTrue space-y-2">
                                            <div className="flex gap-6">
                                                <div>
                                                    <div className="text-sm font-medium">Tips & donations</div>
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
                                                        400k
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-xs text-[#98A2B3]">All time</div>
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
                                                    <div className="text-sm font-medium">Wokpa ads</div>
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
                                                        2M
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-xs text-[#98A2B3]">All time</div>
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
                                                        800
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
                                                    <div className="text-sm font-medium">Plays</div>
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
                                                        0
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-xs text-[#98A2B3]">All time</div>
                                                <span className="text-sm font-medium bg-[#ECFDF3] py-1 pl-[8px] pr-[10px] rounded-full inline-flex items-center gap-1 font-inter text-[#027A48]">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 9.5V2.5M6 2.5L2.5 6M6 2.5L9.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span>7.2%</span>
                                                </span>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 ">
                                        <FollowersChart />
                                        <TimeListenedChart />
                                        <TopCountries />
                                        <GendersChart />
                                    </div>
                                    <AgeChart />
                                    <RecentEpisodes />
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>
                                {/* <Episodes /> */}
                            </Tab.Panel>
                            <Tab.Panel>
                                <div>
                                    <RecentEpisodes />
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                </div>
            </div>

        </div>
    )
}

export default PodcastView