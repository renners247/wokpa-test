"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { Switch, Listbox, Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { EpisodeModel } from "@/models/episode";
import { getArchivedEpisodes, getEpisodes, getEpisodesArchive, getPodcastEpisodes } from "@/app/api/publishers";
import { APICall } from "@/utils";
import ReactPaginate from "react-paginate";
import { EpisodeView } from "../../components/Episode";
import Link from "next/link";


const EpisodesPage = () => {
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
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Episodes
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <div>
                        <Button onClick={() => { router.push("/podcast/record-audio") }} className="!from-white !to-white !text-[#063150] text-sm font-semibold">
                            Record new episode
                        </Button>
                    </div>
                    <div>
                        <Button className="font-semibold text-sm">
                            Upload new episode
                        </Button>
                    </div>
                </div>

            </div>

            <div className="mt-8">
                <Tab.Group>
                    <Tab.List className="flex border-b gap-2 border-[#98A2B3]">
                        <Tab className="outline-none">
                            {({ selected }) => (
                                <div className={`${selected ? "border-b-2 border-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-xl pb-2`}>
                                    Episodes List
                                </div>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="mt-8">
                                <EpisodeView
                                    episodes={episodes}
                                    isArchive={isArchive}
                                    view="list"
                                    setIsArchive={(value) => setIsArchive(value)}
                                    setEpisodes={(episodes: EpisodeModel[], page?: number) => {
                                        setEpidoes(episodes);
                                        page && setCurrentPage(page)
                                    }} />
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
                                            forcePage={(currentPage - 1)}

                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={5}
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
                            </div>
                        </Tab.Panel>

                    </Tab.Panels>
                </Tab.Group>
            </div>

        </div>
    )
}

export default EpisodesPage