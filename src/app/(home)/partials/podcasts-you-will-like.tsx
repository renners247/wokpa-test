
"use client";

import Button from "@/components/button";
import { Tab, Disclosure } from '@headlessui/react'
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { SwiperOptions, PaginationOptions } from 'swiper/types';



const PodcastYouLike = () => {
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
                        <span className="text-primary">Podcasts</span> we think you'll like
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

export default PodcastYouLike;