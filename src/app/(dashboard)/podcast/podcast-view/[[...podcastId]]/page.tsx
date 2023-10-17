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
import { EpisodeView } from "@/app/(dashboard)/components/Episode";
import { formatTimeW } from "@/utils/audio-player";
import ShowMoreText from "react-show-more-text";


const PodcastView = ({ params }: { params: { podcastId: string[] } }) => {
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
        <div id="dashboard">
            <Modal size="md2" open={showTippingModal} onClose={(val) => setShowTippingModal(val)}>
                <div className="border-b text-center text-2xl font-raleway font-bold py-5">
                    Copy tipping link
                </div>



                <div className="py-20 text-center px-10">
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.8928 18.9287C20.2594 18.9287 18.9265 20.2617 18.9265 21.895C18.9265 23.5283 20.2594 24.8613 21.8928 24.8613C23.5261 24.8613 24.859 23.5283 24.859 21.895C24.859 20.2617 23.5261 18.9287 21.8928 18.9287ZM30.7893 21.895C30.7893 20.6667 30.8005 19.4494 30.7315 18.2233C30.6625 16.7992 30.3376 15.5352 29.2962 14.4938C28.2525 13.4502 26.9908 13.1275 25.5667 13.0585C24.3383 12.9895 23.1211 13.0007 21.895 13.0007C20.6667 13.0007 19.4494 12.9895 18.2233 13.0585C16.7992 13.1275 15.5352 13.4524 14.4938 14.4938C13.4502 15.5375 13.1275 16.7992 13.0585 18.2233C12.9895 19.4517 13.0007 20.6689 13.0007 21.895C13.0007 23.1211 12.9895 24.3406 13.0585 25.5667C13.1275 26.9908 13.4524 28.2548 14.4938 29.2962C15.5375 30.3398 16.7992 30.6625 18.2233 30.7315C19.4517 30.8005 20.6689 30.7893 21.895 30.7893C23.1233 30.7893 24.3406 30.8005 25.5667 30.7315C26.9908 30.6625 28.2548 30.3376 29.2962 29.2962C30.3398 28.2525 30.6625 26.9908 30.7315 25.5667C30.8027 24.3406 30.7893 23.1233 30.7893 21.895ZM21.8928 26.459C19.3671 26.459 17.3288 24.4207 17.3288 21.895C17.3288 19.3693 19.3671 17.331 21.8928 17.331C24.4184 17.331 26.4568 19.3693 26.4568 21.895C26.4568 24.4207 24.4184 26.459 21.8928 26.459ZM26.6437 18.21C26.054 18.21 25.5778 17.7338 25.5778 17.1441C25.5778 16.5544 26.054 16.0782 26.6437 16.0782C27.2334 16.0782 27.7096 16.5544 27.7096 17.1441C27.7098 17.2841 27.6823 17.4228 27.6288 17.5522C27.5753 17.6816 27.4968 17.7992 27.3978 17.8982C27.2988 17.9972 27.1812 18.0757 27.0518 18.1292C26.9224 18.1827 26.7837 18.2102 26.6437 18.21Z" fill="white" />
                                    <rect x="0.5" y="0.5" width="42.7903" height="42.79" rx="21.395" stroke="white" />
                                </svg>

                                <div className="text-xl">Share link to Instagram</div>
                            </div>
                            <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.999999 17.1445L10 8.89453L1 0.644531" stroke="white" stroke-width="1.5" />
                            </svg>

                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.7902 17.1686C30.136 17.4585 29.4332 17.6544 28.6943 17.7429C29.4567 17.2867 30.027 16.5688 30.2989 15.7231C29.5827 16.1485 28.7988 16.4479 27.9813 16.6084C27.4316 16.0215 26.7035 15.6324 25.91 15.5017C25.1166 15.371 24.3021 15.5059 23.5932 15.8854C22.8842 16.265 22.3204 16.868 21.9893 17.6009C21.6582 18.3337 21.5783 19.1553 21.762 19.9382C20.3107 19.8654 18.891 19.4882 17.5949 18.8311C16.2988 18.174 15.1554 17.2518 14.2389 16.1242C13.9255 16.6648 13.7453 17.2916 13.7453 17.9591C13.7449 18.5601 13.8929 19.1518 14.1761 19.6818C14.4593 20.2119 14.8689 20.6638 15.3687 20.9975C14.7891 20.9791 14.2223 20.8225 13.7155 20.5408V20.5878C13.7154 21.4306 14.007 22.2475 14.5407 22.8999C15.0743 23.5522 15.8173 23.9998 16.6434 24.1668C16.1058 24.3123 15.5421 24.3337 14.9949 24.2294C15.228 24.9547 15.6821 25.5888 16.2935 26.0432C16.9049 26.4975 17.6431 26.7493 18.4047 26.7633C17.1118 27.7782 15.5151 28.3287 13.8714 28.3263C13.5803 28.3264 13.2893 28.3094 13.0002 28.2754C14.6686 29.3481 16.6108 29.9175 18.5943 29.9153C25.3088 29.9153 28.9795 24.354 28.9795 19.5308C28.9795 19.3741 28.9756 19.2159 28.9685 19.0592C29.6825 18.5428 30.2988 17.9034 30.7886 17.1709L30.7902 17.1686Z" fill="white" />
                                    <rect x="0.5" y="1.28906" width="42.7903" height="42.79" rx="21.395" stroke="white" />
                                </svg>

                                <div className="text-xl">Share link to Twitter</div>
                            </div>
                            <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.999999 17.1445L10 8.89453L1 0.644531" stroke="white" stroke-width="1.5" />
                            </svg>

                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.7902 16.9596C30.136 17.2495 29.4332 17.4454 28.6943 17.5339C29.4567 17.0778 30.027 16.3598 30.2989 15.5141C29.5827 15.9395 28.7988 16.239 27.9813 16.3994C27.4316 15.8125 26.7035 15.4234 25.91 15.2927C25.1166 15.162 24.3021 15.2969 23.5932 15.6764C22.8842 16.056 22.3204 16.659 21.9893 17.3919C21.6582 18.1247 21.5783 18.9464 21.762 19.7293C20.3107 19.6564 18.891 19.2792 17.5949 18.6221C16.2988 17.965 15.1554 17.0428 14.2389 15.9152C13.9255 16.4558 13.7453 17.0826 13.7453 17.7502C13.7449 18.3511 13.8929 18.9428 14.1761 19.4729C14.4593 20.0029 14.8689 20.4548 15.3687 20.7885C14.7891 20.7701 14.2223 20.6135 13.7155 20.3318V20.3788C13.7154 21.2216 14.007 22.0385 14.5407 22.6909C15.0743 23.3432 15.8173 23.7908 16.6434 23.9578C16.1058 24.1033 15.5421 24.1247 14.9949 24.0205C15.228 24.7457 15.6821 25.3798 16.2935 25.8342C16.9049 26.2885 17.6431 26.5403 18.4047 26.5543C17.1118 27.5692 15.5151 28.1198 13.8714 28.1173C13.5803 28.1174 13.2893 28.1004 13.0002 28.0664C14.6686 29.1392 16.6108 29.7085 18.5943 29.7063C25.3088 29.7063 28.9795 24.145 28.9795 19.3218C28.9795 19.1651 28.9756 19.0069 28.9685 18.8502C29.6825 18.3338 30.2988 17.6944 30.7886 16.962L30.7902 16.9596Z" fill="white" />
                                    <rect x="0.5" y="1.08008" width="42.7903" height="42.79" rx="21.395" stroke="white" />
                                </svg>

                                <div className="text-xl">Share link to Facebook</div>
                            </div>
                            <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.999999 17.1445L10 8.89453L1 0.644531" stroke="white" stroke-width="1.5" />
                            </svg>

                        </div>
                    </div>
                </div>
                <div className="px-12 pb-12">
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M33.941 0.369141H5.96547C2.67082 0.369141 0 3.04477 0 6.34536V34.3713C0 37.6718 2.67082 40.3475 5.96547 40.3475H33.941C37.2356 40.3475 39.9065 37.6718 39.9065 34.3713V6.34536C39.9065 3.04477 37.2356 0.369141 33.941 0.369141Z" fill="#083F62" />
                                    <path d="M15.8075 30.3934C16.0039 30.3934 16.2823 30.3329 16.6341 29.961L16.1334 31.9999C15.9674 32.6751 15.5819 33.2758 15.0375 33.7073C14.4932 34.1389 13.821 34.3767 13.1269 34.3835C12.4327 34.3902 11.7561 34.1653 11.2036 33.7443C10.651 33.3233 10.2541 32.7303 10.0751 32.0583L5.67655 15.4096C5.59724 15.1145 5.57747 14.8065 5.61841 14.5036C5.65937 14.2007 5.76021 13.909 5.91504 13.6457C6.06988 13.3823 6.27558 13.1525 6.52014 12.9698C6.76469 12.787 7.04317 12.655 7.33929 12.5813C7.6354 12.5077 7.94319 12.494 8.24466 12.541C8.54613 12.588 8.83521 12.6948 9.095 12.855C9.35479 13.0153 9.58005 13.2259 9.75761 13.4745C9.93517 13.723 10.0615 14.0046 10.1291 14.3026L13.1679 27.4053H13.2284L13.6082 25.9177C13.8132 26.9858 14.5578 30.348 15.8075 30.3934Z" fill="#25AEA4" />
                                    <path d="M28.3672 31.8697L28.3284 32.0146C28.1749 32.6358 27.8354 33.1951 27.3554 33.6176C26.8757 34.0401 26.2782 34.3052 25.6435 34.3778C24.911 34.4505 24.1769 34.2567 23.5754 33.8321C22.9739 33.4072 22.5451 32.7798 22.3672 32.0643L19.2507 19.5238H19.1816L16.9133 28.8038C16.8884 28.9095 16.8374 29.0072 16.765 29.0881C16.6926 29.1689 16.6011 29.2303 16.4989 29.2665C16.4046 29.2987 16.3045 29.3103 16.2053 29.3011C15.6874 29.2383 15.3701 28.5378 14.932 27.3227C14.6622 26.5638 14.3298 25.5648 14.0039 24.3583L16.46 14.7151C16.6192 14.0924 16.9814 13.5408 17.489 13.1477C17.9966 12.7546 18.6207 12.5425 19.2623 12.5449C19.9039 12.5474 20.5263 12.7644 21.0309 13.1614C21.5355 13.5585 21.8933 14.1129 22.0478 14.7367L25.2334 27.6059C25.2507 27.6967 25.2723 27.7875 25.2939 27.8783C25.293 27.8833 25.293 27.8885 25.2939 27.8935C25.378 28.2719 25.473 28.6675 25.5787 29.0697C25.6975 29.5238 25.827 29.9583 25.9564 30.367C25.9556 30.3756 25.9556 30.3843 25.9564 30.3929C26.3277 31.4135 26.8392 32.3194 27.4823 32.3389C27.7025 32.3519 27.9982 32.274 28.3672 31.8697Z" fill="#25AEA4" />
                                    <path d="M28.6768 30.6079C28.6367 30.7465 28.5624 30.873 28.461 30.9755C28.3229 31.0877 28.1459 31.1405 27.9689 31.1225C27.9111 31.1149 27.8545 31.0998 27.8006 31.0771H27.7876C27.356 30.8609 27.0732 30.1517 26.7236 29.1614C26.4344 28.3376 26.0761 27.2155 25.707 25.8598L29.8574 8.07819C29.9239 7.78508 30.0478 7.50818 30.2221 7.26361C30.3963 7.01905 30.6178 6.81174 30.8729 6.65382C31.1282 6.49592 31.4122 6.39053 31.7085 6.34385C32.0049 6.29717 32.3075 6.31014 32.5988 6.38197C32.8902 6.45382 33.1643 6.58309 33.4052 6.76225C33.646 6.94143 33.8487 7.16688 34.0015 7.42545C34.1545 7.68402 34.2544 7.97053 34.2955 8.26822C34.3367 8.56593 34.3181 8.86882 34.2408 9.15927L28.748 30.4068L28.6768 30.6079Z" fill="#25AEA4" />
                                </svg>
                                <div className="text-[#667085]">www.wokpa.app</div>
                            </div>
                            <div className="text-lg text-black font-medium">
                                Copy
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="relative">
                <div className="h-[160px]">
                    {
                        podcast?.cover_picture_url ? <img className="rounded-t-3xl h-[160px] w-full o object-cover" src={podcast.cover_picture_url} alt="" /> :
                            <img className="rounded-t-3xl h-[160px] w-full o object-cover" src={("/images/gradient.jpeg")} alt="" />
                    }
                </div>
                <div className="pl-12 flex-1 py-6">
                    <div className="flex gap-4">

                        <div className="">
                            <div className="!w-[206px] !h-[206px] relative -top-16">
                                {podcast?.picture_url ? <img className="!w-[206px] !h-[206px] rounded-lg border-2 border-[#BEE7E4] object-cover" src={podcast?.picture_url} alt="" /> :
                                    <div className="bg-zinc-300 h-[206px] rounded-lg" ></div>
                                }

                            </div>
                        </div>
                        <div className="flex-1">
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
                                    {
                                        podcast?.title ? <span>{podcast?.title}</span> : <div className="h-2 w-48 bg-[#66C6BF] animate-pulse rounded"></div>
                                    }
                                </div>
                            </div>
                            <div className="flex justify-between flex-col gap-3 mt-5">

                                <div>
                                    <div className="font-medium font-raleway text-3xl">

                                        {podcast?.title ? <span>{podcast?.title}</span> : <div className="h-2 w-96 bg-slate-100 animate-pulse rounded"></div>}

                                    </div>
                                </div>
                                <div className="text-sm text-[#D0D5DD]">
                                    {podcast?.description ? <ShowMoreText
                                        /* Default options */
                                        lines={4}
                                        more="Show more"
                                        less="Show less"
                                        className="text-xs"
                                        anchorClass="show-more-less-clickable"
                                        // onClick={this.executeOnClick}
                                        expanded={false}
                                        // width={280}
                                        truncatedEndingComponent={"... "}
                                    >

                                        <p className="" dangerouslySetInnerHTML={{ __html: podcast?.description as string }}></p>
                                    </ShowMoreText> : <div className="grid grid-cols-4 gap-y-4 gap-x-2 mt-4">
                                        <div className="h-2 bg-slate-100 animate-pulse rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-100 animate-pulse rounded col-span-1"></div>
                                        <div className="h-2 bg-slate-100 animate-pulse rounded w-16"></div>
                                        <div className="h-2 bg-slate-100 animate-pulse rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-100 animate-pulse rounded col-span-2"></div>
                                        <div className="h-2 bg-slate-100 animate-pulse rounded col-span-3"></div>
                                        <div className="h-2 bg-slate-100 animate-pulse rounded w-28"></div>
                                        <div className="h-2 bg-slate-100 animate-pulse rounded"></div>
                                        <div className="h-2 bg-slate-100 animate-pulse rounded col-span-3"></div>

                                    </div>
                                    }


                                </div>
                                <div className="flex gap-2 items-center text-[#D0D5DD]">
                                    <div className="flex gap-1 items-center">
                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 13.6195L13.635 16.417L12.405 11.1445L16.5 7.59699L11.1075 7.13949L9 2.16699L6.8925 7.13949L1.5 7.59699L5.595 11.1445L4.365 16.417L9 13.6195Z" fill="#D0D5DD" />
                                        </svg>
                                        <div className="text-sm font-semibold">
                                            {podcast?.average_rating ? podcast.average_rating : "1.0"}
                                            <span className="font-normal ml-1">
                                                ({Number(podcast?.rating_count ? podcast.rating_count : "0")})
                                            </span>
                                        </div>
                                    </div>
                                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2.66699" r="2" fill="#D0D5DD" />
                                    </svg>

                                    <div className="text-sm">
                                        {podcast?.category_name}
                                    </div>

                                    <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2" cy="2.66699" r="2" fill="#D0D5DD" />
                                    </svg>

                                    <div className="text-sm">
                                        Weekly
                                    </div>

                                </div>
                                <div className="space-y-5">
                                    <div className="flex gap-5 items-center">
                                        <div className="">
                                            <div className="text-xs text-[#0D0D0D] font-semibold bg-white rounded-full py-2 px-4">
                                                {(podcast?.episode_count ? podcast.episode_count : 0)} Episodes
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium">
                                                Published:  {moment(podcast?.created_at).format("DD MMM, YYYY")}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.66675 13.3337H9.33341V2.66699H6.66675V13.3337ZM2.66675 13.3337H5.33341V8.00033H2.66675V13.3337ZM10.6667 6.00033V13.3337H13.3334V6.00033H10.6667Z" fill="#E5F5F4" />
                                            </svg>

                                            <div>
                                                {podcast?.play_count} Plays
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.1333 7.66667L13.8004 9L12.4666 7.66667M13.9634 8.66667C13.9876 8.44778 14 8.22534 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C9.88484 14 11.5667 13.1309 12.6667 11.7716M8 4.66667V8L10 9.33333" stroke="#E5F5F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div>
                                                {formatTimeW(podcast?.total_duration)}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <div>
                                                ₦
                                            </div>
                                            <div>
                                                0
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-wrap">
                                        <Link href={`/podcast/edit-podcast/${podcast?.id}`} className="rounded-[40px] px-5 font-medium inline-block bg-transparent text-sm !text-white border !border-[#042946] !py-2">Edit podcast</Link>
                                        <Button onClick={() => setShowTippingModal(true)} className="!from-white !to-white text-sm !text-[#042946] !py-2 font-semibold">Copy tipping link</Button>
                                        <Link href={`/live-player/${podcast?.id}`} className="rounded-[40px] px-5 font-medium inline-block bg-gradient-to-r from-[#083F62] to-[#25AEA4] text-sm !text-white border !border-[#042946] !py-2">View Live</Link>
                                        <Link href={`/podcast/distribution/${podcast?.id}/${isArchive ? "archive" : ""}`} className="rounded-[40px] px-5 font-medium inline-block bg-white text-sm !text-[#042946] !py-2">Distribution</Link>
                                        <Link href={`/podcast/social-sharing/${podcast?.id}/${isArchive ? "archive" : ""}`} className="rounded-[40px] px-5 font-medium inline-block bg-transparent text-sm !text-white border !border-[#042946] !py-2">Social Distribution </Link>
                                        <Link href={`/podcast/embedded-player/${podcast?.id}/${isArchive ? "archive" : ""}`} className="rounded-[40px] px-5 font-medium inline-block bg-gradient-to-r from-[#083F62] to-[#25AEA4] text-sm !text-white border !border-[#042946] !py-2">Embeded Player</Link>
                                        <Button onClick={() => setShowTippingModal(true)} className="!from-white !to-white text-sm !text-[#042946] !py-2 font-semibold">RSS Feed</Button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-8">
                <div className="flex justify-end gap-4">
                    <Button className=" !from-transparent !to-transparent text-sm !text-white border !border-[#042946] !py-2">Record new episode</Button>
                    <Link href="/podcast/create-episode" className="rounded-[40px] px-5 inline-block bg-white text-sm !text-[#042946] !py-2 font-semibold">Upload new episode</Link>
                </div>
                <Tab.Group>
                    <Tab.List className="flex border-b gap-2 border-[#98A2B3]">
                        <Tab className="outline-none">
                            {({ selected }) => (
                                <div className={`${selected ? "border-b-2 border-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-xl pb-2`}>
                                    All Episodes
                                </div>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <EpisodeView
                                episodes={episodes}
                                isArchive={isArchive}
                                view={params.podcastId[1] == "table" ? "table" : "list"}
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
                                        onPageChange={handlePageClick}
                                        forcePage={(currentPage - 1)}
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
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

export default PodcastView