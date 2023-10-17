"use client";

import { archiveEpisode, getArchivePodcastsById, getEpisodesArchive, getPodcastEpisodes, getPodcastsById, removeArchiveEpisode } from "@/app/api/publishers";
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
import { EpisodeLiveView, LiveViewAboutPodcastTab, LiveViewListOnTab } from "@/app/(dashboard)/components/Episode";
import { formatTimeW } from "@/utils/audio-player";
// import ShowMoreText from "react-show-more-text";


const LivePlayerView = ({ params }: { params: { podcastId: string[] } }) => {
    const user = useAppSelector(state => state.auth.user);
    const refresh = useAppSelector(state => state.podcasts.refresh)
    const dispatch = useAppDispatch();

    const [showTippingModal, setShowTippingModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalContent, setTotalContent] = useState(0);
    const [isArchive, setIsArchive] = useState(params.podcastId[1] == "archive" ? true : false);

    const [podcast, setPodcast] = useState<PodcastModel | null>(null);
    const [episodes, setEpidoes] = useState<EpisodeModel[]>([]);

    const handleGetEpisodes = async (page?: number) => {
        try {
            console.log(page)
            const response = await APICall(getPodcastEpisodes, [params.podcastId[0], page ? page : currentPage, 15, isArchive ? true : ""]);
            setEpidoes(response.data.data.data);
            setTotalContent(response.data.data.total);

        } catch (error) {
            console.log(error)

        }
    }

    const handleGetPodcasts = async () => {
        try {
            const podcastResponse = await APICall(isArchive ? getArchivePodcastsById : getPodcastsById, params.podcastId[0]);
            setPodcast(podcastResponse.data.data);

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
    }, [isArchive, refresh]);

    useEffectOnce(() => {
        handleGetPodcasts();
    });

    return (
        <div id="">
            <div className="h-[260px]">
                {
                    podcast?.cover_picture_url ? <img className="rounded-t-3xl h-[260px] w-full o object-cover" src={podcast.cover_picture_url} alt="" /> :
                        <img className="rounded-t-3xl h-[160px] w-full o object-cover" src={("/images/gradient.jpeg")} alt="" />
                }
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 w-full px-10">
                <div className="w-full p-5 flex flex-col">
                    <div className="!h-[206px] relative -top-32">
                        {podcast?.picture_url ? <img className="!w-[250px] !h-[250px] rounded-lg border-2 border-[#BEE7E4] object-cover" src={podcast?.picture_url} alt="" /> :
                            <div className="bg-zinc-300 h-[206px] rounded-lg" ></div>
                        }

                    </div>
                </div>
                <div className="col-span-2 flex flex-col justify-start items-start pt-10 w-full">
                    <div className="">
                        <div className=" py-6">
                            <div className="flex gap-4">

                                <div className="flex-1">
                                    <div className="flex gap-4 items-center">
                                        <Link href="/">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66667 14.1668H13.3333M9.18141 2.30345L3.52949 6.69939C3.15168 6.99324 2.96278 7.14017 2.82669 7.32417C2.70614 7.48716 2.61633 7.67078 2.56169 7.866C2.5 8.08639 2.5 8.3257 2.5 8.80433V14.8334C2.5 15.7669 2.5 16.2336 2.68166 16.5901C2.84144 16.9037 3.09641 17.1587 3.41002 17.3185C3.76654 17.5001 4.23325 17.5001 5.16667 17.5001H14.8333C15.7668 17.5001 16.2335 17.5001 16.59 17.3185C16.9036 17.1587 17.1586 16.9037 17.3183 16.5901C17.5 16.2336 17.5 15.7669 17.5 14.8334V8.80433C17.5 8.3257 17.5 8.08639 17.4383 7.866C17.3837 7.67078 17.2939 7.48716 17.1733 7.32417C17.0372 7.14017 16.8483 6.99324 16.4705 6.69939L10.8186 2.30345C10.5258 2.07574 10.3794 1.96189 10.2178 1.91812C10.0752 1.87951 9.92484 1.87951 9.78221 1.91812C9.62057 1.96189 9.47418 2.07574 9.18141 2.30345Z" stroke="#FCFCFD" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </Link>
                                        <div>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="text-sm font-medium">
                                            <Link href="/dashboard">
                                                Podcasts
                                            </Link>
                                        </div>
                                        <div>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="text-sm font-medium text-[#66C6BF]">
                                            {
                                                podcast?.title ? <span>{podcast?.title}</span> : <div className="h-2 w-48 bg-[#66C6BF] animate-pulse rounded"></div>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex justify-between flex-col gap-3 mt-5">

                                        <div className="mb-5">
                                            <div className="font-bold font-raleway text-2xl">

                                                {podcast?.title ? <span>{podcast?.title}</span> : <div className="h-2 w-96 bg-slate-100 animate-pulse rounded"></div>}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="">
                        {/* <div className="flex justify-end gap-4">
                    <Button className=" !from-transparent !to-transparent text-sm !text-white border !border-[#042946] !py-2">Record new episode</Button>
                    <Link href="/podcast/create-episode" className="rounded-[40px] px-5 inline-block bg-white text-sm !text-[#042946] !py-2 font-semibold">Upload new episode</Link>
                </div> */}
                        <Tab.Group>
                            <Tab.List className="flex border-b gap-2 border-[#98A2B3]">
                                <Tab className="outline-none">
                                    {({ selected }) => (
                                        <div className={`${selected ? "border-[#36FFE8] text-[#36FFE8]" : "text-[#EAECF0] border-transparent"} border-b-2 px-4 pb-2 ease transition-all text-sm`}>
                                            Episodes
                                        </div>
                                    )}
                                </Tab>
                                <Tab className="outline-none">
                                    {({ selected }) => (
                                        <div className={`${selected ? "border-[#36FFE8] text-[#36FFE8]" : "text-[#EAECF0] border-transparent"} text-sm px-4 pb-2 border-b-2 ease transition-all`}>
                                            About this podcast
                                        </div>
                                    )}
                                </Tab>
                                <Tab className="outline-none">
                                    {({ selected }) => (
                                        <div className={`${selected ? "border-[#36FFE8] text-[#36FFE8]" : "text-[#EAECF0] border-transparent"} text-sm px-4 pb-2 border-b-2 ease transition-all`}>
                                            Listen to on
                                        </div>
                                    )}
                                </Tab>
                                <Tab className="outline-none">
                                    {({ selected }) => (
                                        <div className={`${selected ? "border-b-2 border-[#36FFE8] text-[#36FFE8]" : "text-[#EAECF0] border-transparent"} text-sm px-4 pb-2 ease transition-all`}>
                                            Tips & supporters
                                        </div>
                                    )}
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <EpisodeLiveView
                                        episodes={episodes}
                                        isArchive={isArchive}
                                        view={params.podcastId[1] == "table" ? "table" : "list"}
                                        setIsArchive={(value) => setIsArchive(value)}
                                        setEpisodes={(episodes: EpisodeModel[], page?: number) => {
                                            setEpidoes(episodes);
                                            page && setCurrentPage(page)
                                        }} />

                                </Tab.Panel>
                                <Tab.Panel>
                                    <LiveViewAboutPodcastTab />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <LiveViewListOnTab />
                                </Tab.Panel>
                                <Tab.Panel><p></p></Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
                <div className="rounded-lg border border-[#667085] p-5 mt-10 h-fit mx-10">
                    <div className="hover:text-black text-xs text-white stroke-white hover:stroke-black hover:bg-white ease transition-all rounded-full px-5 py-3 border border-white flex flex-row justify-center items-center gap-3 mt-5 active:bg-gray-300 focus:bg-gray-400 cursor-pointer">
                        <svg className="" width="20" height="19" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.2218 13.8098C25.5473 13.5308 25.7101 13.3913 25.7697 13.2253C25.822 13.0796 25.822 12.9202 25.7697 12.7745C25.7101 12.6085 25.5473 12.469 25.2218 12.19L13.9275 2.5092C13.3672 2.02893 13.0871 1.7888 12.8499 1.78292C12.6437 1.77781 12.4468 1.86837 12.3166 2.02821C12.1667 2.21212 12.1667 2.5811 12.1667 3.31907V9.04608C9.32043 9.54402 6.71546 10.9862 4.77961 13.1517C2.6691 15.5126 1.50165 18.5678 1.5 21.7345V22.5505C2.89912 20.8651 4.64601 19.5019 6.62101 18.5545C8.36226 17.7191 10.2446 17.2243 12.1667 17.0939V22.6807C12.1667 23.4187 12.1667 23.7877 12.3166 23.9716C12.4468 24.1314 12.6437 24.222 12.8499 24.2169C13.0871 24.211 13.3672 23.9709 13.9275 23.4906L25.2218 13.8098Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Share</span>
                    </div>
                    <div className="hover:text-black text-xs text-white stroke-white hover:stroke-black hover:bg-white ease transition-all rounded-full px-5 py-3 border border-white flex flex-row justify-center items-center gap-3 mt-5 active:bg-gray-300 focus:bg-gray-400 cursor-pointer">
                        <svg className="" width="20" height="19" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.50033 14.3633C8.41362 13.3238 13.1745 18.0862 12.1365 24.9995M1.50033 7.71713C12.084 6.67766 19.8223 14.4159 18.7828 24.9996M1.50033 1.06949C15.7559 0.0315196 26.4686 10.7442 25.4306 24.9998M4.16667 25C2.69421 25 1.5 23.8058 1.5 22.3333C1.5 20.8609 2.69421 19.6667 4.16667 19.6667C5.63912 19.6667 6.83333 20.8609 6.83333 22.3333C6.83333 23.8058 5.63912 25 4.16667 25Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span>RSS feed</span>
                    </div>
                    <hr className="my-10 " />
                    <div className="w-full mb-5 text-xs">
                        <p className="font-semibold mb-2">Host</p>
                        <p className="text-[#D0D5DD]">Joseph Emmanuel</p>
                    </div>
                    <div className="w-full mb-5 text-xs">
                        <p className="font-semibold mb-2">Guest</p>
                        <p className="text-[#D0D5DD]">Host</p>
                    </div>
                    <div className="w-full text-xs mb-5">
                        <p className="font-semibold mb-2">Category</p>
                        <p className="text-[#D0D5DD]">Socciety & culture</p>
                    </div>
                    <div className="w-full text-xs mb-5">
                        <p className="font-semibold mb-2">Release Date</p>
                        <p className="text-[#D0D5DD]">April 28, 2023</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LivePlayerView