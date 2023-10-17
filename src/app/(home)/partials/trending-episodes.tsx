
"use client";

import Button from "@/components/button";
import { Tab, Disclosure } from '@headlessui/react'
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { SwiperOptions, PaginationOptions } from 'swiper/types';


export const FeaturedPodcasts = () => {
    const pagination: PaginationOptions = {
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '"> </span>';
        },
    };

    return (

        <section className="relative">
            <div className="mx-auto py-24">
                <div className="text-center">
                    <h2 className="md:text-5xl text-2xl font-raleway font-bold">
                        Featured Podcasts
                    </h2>
                    <p className="md:text-lg text-sm max-w-4xl mx-auto mt-6">
                        Discover our top podcasts
                    </p>
                </div>
                <div className="mt-10  mx-auto">
                    <Swiper
                        slidesPerView={"auto"}
                        initialSlide={6}
                        spaceBetween={10}
                        centeredSlides
                        pagination={pagination}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {/* episode-card */}
                        {[1, 2, 2, 1, 1, 3, 4, 5, 1, 1, 1, 1].map((i) => <SwiperSlide className="!w-[280px] !h-[320px]">  <div className="w-[280px] h-[280px]">
                            <img width={280} height={280} src={("/images/podcast-image" + ((i % 4) + 1) + ".png")} alt="" />
                        </div>
                        </SwiperSlide>)}
                    </Swiper>

                    <div className="text-center mt-12">
                        <Button className="font-medium !from-transparent !to-transparent border bg-gradient-to-r bg-clip-text !border-[#083F62]">
                            See more
                        </Button>
                    </div>
                </div>
            </div>
        </section>





    )
}

export const FictionAndDrama = () => {
    const pagination: PaginationOptions = {
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '"> </span>';
        },
    };

    return (

        <section className="relative">
            <div className="mx-auto py-24">
                <div className="text-center">
                    <h2 className="md:text-5xl text-2xl font-raleway font-bold">
                        Fiction & Drama
                    </h2>
                    <p className="md:text-lg text-sm max-w-4xl mx-auto mt-6">
                        Discover our top podcasts
                    </p>
                </div>
                <div className="mt-10  mx-auto">
                    <Swiper
                        slidesPerView={"auto"}
                        initialSlide={6}
                        spaceBetween={10}
                        centeredSlides
                        pagination={pagination}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {/* episode-card */}
                        {[1, 2, 2, 1, 1, 3, 4, 5, 1, 1, 1, 1].map((i) => <SwiperSlide className="!w-[280px] !h-[320px]">  <div className="w-[280px] h-[280px]">
                            <img width={280} height={280} src={("/images/podcast-image" + ((i % 4) + 1) + ".png")} alt="" />
                        </div>
                        </SwiperSlide>)}
                    </Swiper>

                    <div className="text-center mt-12">
                        <Button className="font-medium !from-transparent !to-transparent border bg-gradient-to-r bg-clip-text !border-[#083F62]">
                            See more
                        </Button>
                    </div>
                </div>
            </div>
        </section>





    )
}

export const RadioPrograms = () => {
    const pagination: PaginationOptions = {
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '"> </span>';
        },
    };

    return (

        <section className="relative  bg-[#141414]">
            <div className="mx-auto py-24">
                <div className="text-center">
                    <h2 className="md:text-5xl text-2xl font-raleway font-bold">
                        Radio Programs
                    </h2>
                    <p className="md:text-lg text-sm max-w-4xl mx-auto mt-6">
                        Discover our top podcasts
                    </p>
                </div>
                <div className="mt-10  mx-auto">
                    <Swiper
                        slidesPerView={"auto"}
                        initialSlide={6}
                        spaceBetween={10}
                        centeredSlides
                        pagination={pagination}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {/* episode-card */}
                        {[1, 2, 2, 1, 1, 3, 4, 5, 1, 1, 1, 1].map((i) => <SwiperSlide className="!w-[280px] !h-[320px]">  <div className="w-[280px] h-[280px]">
                            <img width={280} height={280} src={("/images/podcast-image" + ((i % 4) + 1) + ".png")} alt="" />
                        </div>
                        </SwiperSlide>)}
                    </Swiper>

                    <div className="text-center mt-12">
                        <Button className="font-medium !from-transparent !to-transparent border bg-gradient-to-r bg-clip-text !border-[#083F62]">
                            See more
                        </Button>
                    </div>
                </div>
            </div>
        </section>

    )
}

const TrendingEpisodes = () => {
    const pagination: PaginationOptions = {
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '"> </span>';
        },
    };

    return (

        <section className="relative bg-[#141414]">
            <div className="absolute left-0 -top-10">
                <svg width="213" height="176" viewBox="0 0 213 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M200.904 115.922C201.208 116.692 202.08 117.069 202.85 116.765C203.621 116.46 203.998 115.588 203.693 114.818L200.904 115.922ZM89.2248 101.275L88.9036 102.74L88.904 102.74L89.2248 101.275ZM123.13 44.0481L121.923 44.9389L121.923 44.939L123.13 44.0481ZM11.6845 97.5159C11.4802 98.3188 11.9655 99.1352 12.7683 99.3394C13.5712 99.5437 14.3876 99.0584 14.5919 98.2556L11.6845 97.5159ZM209.586 102.518C209.864 101.737 209.457 100.879 208.676 100.601C207.896 100.323 207.038 100.731 206.76 101.511L209.586 102.518ZM202.94 116.706L202.621 118.172C203.359 118.332 204.1 117.92 204.353 117.209L202.94 116.706ZM187.725 112.192C186.902 112.101 186.16 112.694 186.069 113.518C185.977 114.341 186.571 115.082 187.394 115.174L187.725 112.192ZM202.298 115.37C203.693 114.818 203.693 114.817 203.692 114.816C203.692 114.815 203.691 114.814 203.691 114.813C203.69 114.81 203.688 114.807 203.687 114.802C203.683 114.792 203.677 114.779 203.67 114.761C203.656 114.726 203.635 114.675 203.608 114.608C203.554 114.474 203.473 114.277 203.366 114.022C203.152 113.512 202.833 112.769 202.411 111.826C201.567 109.939 200.309 107.252 198.649 104.037C195.331 97.6092 190.394 89.0484 183.922 80.5361C171.036 63.585 151.77 46.4513 126.822 47.403L126.937 50.4009C150.361 49.5072 168.805 65.6075 181.534 82.3517C187.871 90.687 192.719 99.0892 195.983 105.413C197.615 108.573 198.848 111.208 199.672 113.051C200.084 113.972 200.394 114.694 200.6 115.184C200.702 115.429 200.779 115.616 200.83 115.74C200.855 115.802 200.874 115.849 200.886 115.879C200.893 115.895 200.897 115.906 200.9 115.913C200.901 115.917 200.902 115.919 200.903 115.921C200.903 115.921 200.903 115.922 200.904 115.922C200.904 115.922 200.904 115.922 202.298 115.37ZM126.822 47.403C102.123 48.3453 87.1654 60.6298 81.0302 73.4835C77.9782 79.8778 77.0908 86.467 78.3775 91.843C79.6758 97.2678 83.2229 101.494 88.9036 102.74L89.5461 99.8096C85.1885 98.8541 82.3768 95.6642 81.2951 91.1447C80.2017 86.5765 80.913 80.6936 83.7376 74.7757C89.3559 63.0049 103.264 51.304 126.937 50.4009L126.822 47.403ZM88.904 102.74C94.3732 103.938 100.691 102.578 106.655 99.5753C112.641 96.5614 118.419 91.8216 122.866 86.0167C131.771 74.3911 135.47 58.2362 124.337 43.1571L121.923 44.939C132.043 58.6459 128.826 73.3022 120.484 84.1924C116.307 89.6453 110.879 94.0895 105.306 96.8958C99.7091 99.7134 94.1135 100.81 89.5457 99.8095L88.904 102.74ZM124.337 43.1573C118.683 35.4974 109.548 31.6912 99.045 31.0609C88.544 30.4307 76.5357 32.9561 64.8272 38.1084C41.4306 48.404 18.8445 69.371 11.6845 97.5159L14.5919 98.2556C21.4694 71.2208 43.2567 50.8781 66.0355 40.8543C77.4146 35.8469 88.9444 33.4602 98.8652 34.0555C108.784 34.6508 116.955 38.2078 121.923 44.9389L124.337 43.1573ZM206.76 101.511L201.527 116.203L204.353 117.209L209.586 102.518L206.76 101.511ZM202.94 116.706C203.259 115.24 203.259 115.24 203.259 115.24C203.259 115.24 203.259 115.24 203.259 115.24C203.258 115.24 203.258 115.24 203.257 115.24C203.256 115.239 203.253 115.239 203.25 115.238C203.244 115.237 203.235 115.235 203.223 115.232C203.2 115.227 203.165 115.22 203.119 115.21C203.027 115.19 202.893 115.161 202.721 115.124C202.377 115.049 201.882 114.943 201.279 114.814C200.073 114.557 198.432 114.21 196.696 113.852C193.263 113.145 189.335 112.371 187.725 112.192L187.394 115.174C188.832 115.333 192.594 116.07 196.091 116.79C197.818 117.146 199.451 117.492 200.653 117.748C201.253 117.876 201.746 117.982 202.088 118.056C202.259 118.093 202.393 118.122 202.483 118.142C202.529 118.152 202.563 118.159 202.586 118.164C202.598 118.167 202.607 118.168 202.613 118.17C202.616 118.17 202.618 118.171 202.619 118.171C202.62 118.171 202.62 118.171 202.621 118.172C202.621 118.172 202.621 118.172 202.621 118.172C202.621 118.172 202.621 118.172 202.94 116.706Z" fill="#4FFFEB" />
                </svg>
            </div>
            <div className="mx-auto py-24">
                <div className="text-center">
                    <h2 className="md:text-5xl text-2xl font-raleway font-bold">
                        Trending <span className="text-primary">episodes</span> today
                    </h2>
                    <p className="md:text-lg text-sm max-w-4xl mx-auto mt-6">
                        Discover fresh content
                    </p>
                </div>
                <div className="mt-10 mx-auto">
                    <Swiper
                        slidesPerView={"auto"}
                        initialSlide={4}
                        spaceBetween={10}
                        centeredSlides
                        pagination={pagination}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {/* episode-card */}
                        {[1, 2, 2, 1, 1, 3, 4, 5].map(() => <SwiperSlide className="!w-[400px]"> <div className="w-[400px] h-[262px] rounded-2xl p-5 bg-[#26272B]">
                            <div className="flex gap-4">
                                <img src={("/images/episode-card-image.png")} alt="" width={80} height={80} />
                                <div className="py-1">
                                    <h6 className="text-lg font-semibold">7 good memories</h6>
                                    <p className="text-sm text-[#EAECF0]">8 hours ago</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h6 className="text-lg font-semibold">
                                    7 good minutes  - Ep1, the commodity that is the most sample title .
                                </h6>
                            </div>
                            <div className="mt-4">
                                <div className="flex gap-5 items-center">
                                    <div className="flex justify-center items-center rounded-full w-16 h-16  bg-gradient-to-r from-[#083F62] to-[#25AEA4]">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23.3207 12.8L7.46732 22.36C6.53398 22.92 5.33398 22.2534 5.33398 21.16V10.4934C5.33398 5.84002 10.3607 2.93335 14.4007 5.25335L20.5207 8.77335L23.3073 10.3734C24.2273 10.92 24.2407 12.2534 23.3207 12.8Z" fill="#E5F5F4" />
                                            <path d="M24.1204 20.6132L18.7204 23.7332L13.3337 26.8399C11.4004 27.9465 9.21373 27.7199 7.62707 26.5999C6.85373 26.0665 6.94707 24.8799 7.7604 24.3999L24.7071 14.2399C25.5071 13.7599 26.5604 14.2132 26.7071 15.1332C27.0404 17.1999 26.1871 19.4265 24.1204 20.6132Z" fill="#E5F5F4" />
                                        </svg>
                                    </div>
                                    <span className="text-xl">
                                        20:30
                                    </span>
                                    <span className="text-sm font-semibold">
                                        By: Joseph Emmanuel
                                    </span>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>)}
                    </Swiper>
                    <div className="text-center mt-12">
                        <Button className="font-medium !from-transparent !to-transparent border bg-gradient-to-r bg-clip-text !border-[#083F62]">
                            See more
                        </Button>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default TrendingEpisodes;