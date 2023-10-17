"use client";

import { resetAuth } from "@/redux/auth";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { Disclosure, Transition } from "@headlessui/react";
import { PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavLinkProps extends PropsWithChildren {
    href: string;
    exact: boolean;
    className: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, exact, children, ...props }) => {
    const pathname = usePathname()
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += ' active';
    }

    return (
        <Link href={href}>
            <div {...props}>
                {children}
            </div>
        </Link>
    );
}

const Sidebar = () => {
    const minimized = useAppSelector(state => state.sidebar.minimized);
    const user = useAppSelector(state => state.auth.user);

    const dispatch = useAppDispatch();

    // useEffectOnce(() => {
    //     // initFlowbite();
    // })

    return (
        <>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-10 w-[20-2rem] h-screen transition-transform -translate-x-full sm:translate-x-0 !bg-grayTrue" aria-label="Sidebar">
                <div className={`h-screen overflow-y-auto fixed inset-0 pt-7 pb-12 w-[20.2rem] tracking-normal z-10 bg-grayTrue`}>
                    <div>
                        <div className="px-6 space-y-8">
                            <div className="flex gap-2 items-center">
                                <div>
                                    {
                                        <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_3125_62387" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="150" height="40">
                                                <path d="M149.855 0H0V39.9784H149.855V0Z" fill="white" />
                                            </mask>
                                            <g mask="url(#mask0_3125_62387)">
                                                <path d="M33.941 0H5.96547C2.67082 0 0 2.67563 0 5.97622V34.0022C0 37.3027 2.67082 39.9784 5.96547 39.9784H33.941C37.2356 39.9784 39.9065 37.3027 39.9065 34.0022V5.97622C39.9065 2.67563 37.2356 0 33.941 0Z" fill="#083F62" />
                                                <path d="M15.8072 30.0238C16.0036 30.0238 16.2821 29.9632 16.6339 29.5913L16.1331 31.6303C15.9672 32.3055 15.5816 32.9061 15.0373 33.3377C14.4929 33.7693 13.8208 34.0071 13.1266 34.0138C12.4325 34.0205 11.7558 33.7957 11.2033 33.3747C10.6508 32.9537 10.2538 32.3606 10.0749 31.6886L5.67631 15.04C5.59699 14.7449 5.57722 14.4368 5.61816 14.134C5.65913 13.8311 5.75996 13.5394 5.9148 13.2761C6.06963 13.0127 6.27534 12.7829 6.51989 12.6001C6.76445 12.4174 7.04293 12.2854 7.33904 12.2117C7.63516 12.1381 7.94295 12.1244 8.24442 12.1714C8.54588 12.2184 8.83496 12.3251 9.09475 12.4854C9.35455 12.6457 9.5798 12.8563 9.75737 13.1048C9.93493 13.3534 10.0612 13.6349 10.1288 13.933L13.1677 27.0357H13.2281L13.608 25.5481C13.813 26.6162 14.5576 29.9784 15.8072 30.0238Z" fill="#25AEA4" />
                                                <path d="M28.3661 31.5006L28.3273 31.6454C28.1738 32.2666 27.8343 32.826 27.3543 33.2485C26.8746 33.6709 26.2771 33.936 25.6424 34.0087C24.9099 34.0813 24.1759 33.8876 23.5743 33.4629C22.9728 33.0381 22.544 32.4106 22.3661 31.6952L19.2496 19.1546H19.1805L16.9122 28.4346C16.8873 28.5403 16.8363 28.6381 16.7639 28.7189C16.6915 28.7998 16.6 28.8612 16.4978 28.8973C16.4035 28.9295 16.3034 28.9412 16.2042 28.9319C15.6863 28.8692 15.369 28.1687 14.9309 26.9535C14.6611 26.1946 14.3287 25.1957 14.0028 23.9892L16.4589 14.346C16.6181 13.7233 16.9803 13.1717 17.4879 12.7786C17.9955 12.3854 18.6196 12.1733 19.2612 12.1758C19.9028 12.1783 20.5252 12.3952 21.0298 12.7923C21.5344 13.1893 21.8922 13.7437 22.0467 14.3676L25.2323 27.2368C25.2496 27.3276 25.2712 27.4184 25.2928 27.5092C25.2919 27.5142 25.2919 27.5194 25.2928 27.5243C25.3769 27.9027 25.4719 28.2984 25.5777 28.7006C25.6964 29.1546 25.8259 29.5892 25.9553 29.9979C25.9545 30.0065 25.9545 30.0152 25.9553 30.0238C26.3266 31.0443 26.8381 31.9503 27.4812 31.9697C27.7014 31.9827 27.9971 31.9049 28.3661 31.5006Z" fill="#25AEA4" />
                                                <path d="M28.6769 30.2378C28.6368 30.3764 28.5625 30.5029 28.4611 30.6054C28.323 30.7176 28.146 30.7703 27.969 30.7524C27.9112 30.7448 27.8546 30.7297 27.8007 30.707H27.7877C27.3561 30.4908 27.0733 29.7816 26.7237 28.7913C26.4345 27.9675 26.0762 26.8454 25.7072 25.4897L29.8575 7.70807C29.924 7.41497 30.0479 7.13806 30.2223 6.8935C30.3964 6.64893 30.6179 6.44163 30.873 6.2837C31.1283 6.1258 31.4123 6.02042 31.7087 5.97373C32.005 5.92705 32.3076 5.94003 32.599 6.01185C32.8903 6.0837 33.1644 6.21298 33.4053 6.39213C33.6461 6.57131 33.8488 6.79676 34.0016 7.05533C34.1546 7.31391 34.2546 7.60042 34.2956 7.8981C34.3368 8.19581 34.3182 8.49871 34.241 8.78915L28.7482 30.0367L28.6769 30.2378Z" fill="#25AEA4" />
                                                <path d="M72.066 12.5879L68.6553 26.7702L64.5904 13.5319C64.2555 12.3695 63.1886 11.527 61.9271 11.527C60.6345 11.527 59.5522 12.4007 59.233 13.5943L55.604 26.7702L51.7806 12.6269C51.5158 11.6284 50.6204 10.9029 49.538 10.9029C48.2609 10.9029 47.2174 11.9483 47.2174 13.2276C47.2174 13.4695 47.2565 13.7035 47.3264 13.9219L52.3958 30.5227C52.7931 31.7864 53.9611 32.6991 55.355 32.6991C56.7721 32.6991 57.9714 31.7317 58.3295 30.4213L61.8417 18.3529L65.6961 30.4915C66.0777 31.7709 67.2613 32.6991 68.6631 32.6991C70.0724 32.6991 71.2716 31.7473 71.6376 30.4524L76.3176 13.7113C76.3722 13.5085 76.4033 13.3134 76.4033 13.1028C76.4033 11.8858 75.4144 10.9029 74.1995 10.9029C73.164 10.9029 72.2996 11.6128 72.066 12.5879ZM85.3375 32.9097C90.3134 32.9097 93.9032 29.2197 93.9032 24.5782C93.9032 19.9366 90.3134 16.2466 85.3375 16.2466C80.3538 16.2466 76.764 19.9366 76.764 24.5782C76.764 29.2197 80.3538 32.9097 85.3375 32.9097ZM85.3375 28.9077C82.9548 28.9077 81.226 27.0589 81.226 24.5782C81.226 22.0896 82.9548 20.2408 85.3375 20.2408C87.7127 20.2408 89.4412 22.0896 89.4412 24.5782C89.4412 27.0589 87.7127 28.9077 85.3375 28.9077ZM110.781 29.29L106.833 23.9073L110.345 19.8897C110.898 19.2423 110.976 18.6884 110.976 18.1891C110.976 17.1984 110.221 16.4573 109.084 16.4573C108.453 16.4573 107.815 16.7849 107.285 17.4168L103.119 22.3237H101.32V10.8093C101.32 9.59232 100.347 8.61719 99.1476 8.61719C97.9407 8.61719 96.9594 9.59232 96.9594 10.8093V30.5071C96.9594 31.724 97.9407 32.6991 99.1476 32.6991C100.347 32.6991 101.32 31.724 101.32 30.5071V25.9512H103.111L107.394 31.8098C107.768 32.3324 108.461 32.6991 109.193 32.6991C110.392 32.6991 111.249 31.802 111.249 30.6865C111.249 30.1715 111.109 29.7425 110.781 29.29ZM122.983 16.2466C120.67 16.2466 118.988 17.2062 117.898 18.7586V18.4387C117.898 17.2218 116.925 16.2466 115.726 16.2466C114.518 16.2466 113.537 17.2218 113.537 18.4387V36.7713C113.537 37.9882 114.518 38.9633 115.726 38.9633C116.925 38.9633 117.898 37.9882 117.898 36.7713V30.3979C118.988 31.9501 120.67 32.9097 122.983 32.9097C127.523 32.9097 130.583 29.2667 130.583 24.5782C130.583 19.8819 127.523 16.2466 122.983 16.2466ZM121.908 28.9624C119.471 28.9624 117.742 27.0122 117.742 24.5782C117.742 22.1443 119.471 20.194 121.908 20.194C124.338 20.194 126.067 22.1443 126.067 24.5782C126.067 27.0122 124.338 28.9624 121.908 28.9624ZM140.777 16.3559C138.48 16.3559 136.682 16.8629 135.42 17.3934C134.47 17.8069 133.948 18.5012 133.948 19.3671C133.948 20.4436 134.774 21.0677 135.56 21.0677C136.152 21.0677 136.557 20.9195 137.125 20.7011C137.803 20.4592 138.737 20.155 139.983 20.155C142.397 20.155 143.316 21.1847 143.316 23.0569V23.4625C142.023 23.0414 140.871 22.8463 139.703 22.8463C135.856 22.8463 133.022 24.6796 133.022 27.9482C133.022 31.178 135.521 32.9097 138.48 32.9097C140.567 32.9097 142.288 32.0282 143.332 30.2729V30.5071C143.332 31.724 144.313 32.6991 145.52 32.6991C146.719 32.6991 147.692 31.724 147.692 30.5071V22.6747C147.692 18.1657 145.38 16.3559 140.777 16.3559ZM139.594 29.6645C138.13 29.6645 137.141 29.0014 137.141 27.5503C137.141 26.076 138.215 25.3036 140.295 25.3036C141.206 25.3036 142.257 25.4909 143.324 25.9434V26.0604C143.261 28.2682 141.587 29.6645 139.594 29.6645Z" fill="#25AEA4" />
                                            </g>
                                        </svg>
                                    }

                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div>
                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="32" cy="32" r="32" fill="url(#paint0_linear_3125_62399)" />
                                        <path d="M32 32C35.3137 32 38 29.3137 38 26C38 22.6863 35.3137 20 32 20C28.6863 20 26 22.6863 26 26C26 29.3137 28.6863 32 32 32Z" fill="#E5F5F4" />
                                        <path d="M42.6667 44C42.6667 42.1392 42.6667 41.2089 42.4371 40.4518C41.92 38.7473 40.5861 37.4134 38.8816 36.8963C38.1245 36.6667 37.1941 36.6667 35.3334 36.6667H28.6667C26.806 36.6667 25.8756 36.6667 25.1185 36.8963C23.414 37.4134 22.0801 38.7473 21.563 40.4518C21.3334 41.2089 21.3334 42.1392 21.3334 44M38 26C38 29.3137 35.3137 32 32 32C28.6863 32 26 29.3137 26 26C26 22.6863 28.6863 20 32 20C35.3137 20 38 22.6863 38 26Z" stroke="#E5F5F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <defs>
                                            <linearGradient id="paint0_linear_3125_62399" x1="-0.000996671" y1="63.9996" x2="63.9992" y2="-0.000779231" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#083F62" />
                                                <stop offset="1" stopColor="#25AEA4" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>

                                <div className="flex-1">
                                    <Disclosure>

                                        <Disclosure.Button className="w-full outline-none">
                                            <div className="flex justify-between items-center font-medium">
                                                <div className="text-xs">
                                                    {user?.first_name} {user?.last_name} Podcast
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </div>

                                            {user?.current_subscription && <div className="flex">
                                                <div className="bg-[#344054] px-2 py-[1px] border rounded-3xl">
                                                    <div className="justify-start items-center gap-1 inline-flex">
                                                        <div className="w-2 h-2 relative">
                                                            <div className="w-1.5 h-1.5 left-[1px] top-[1px] absolute bg-emerald-500 rounded-full" />
                                                        </div>
                                                        <div className="text-center text-gray-50 text-xs font-normal leading-[18px]">{user?.current_subscription?.name}</div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </Disclosure.Button>
                                        <Disclosure.Panel>
                                            <div className="flex mt-5">
                                                <div className="flex-1 border-r flex border-[#667085]">
                                                    <div className="text-center">
                                                        <div className="font-semibold">
                                                            ₦0
                                                        </div>
                                                        <div className="text-xs text-[#D0D5DD]">Earned</div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 flex justify-center border-[#667085]">
                                                    <div className="text-center">
                                                        <div className="font-semibold">
                                                            0
                                                        </div>
                                                        <div className="text-xs text-[#D0D5DD">Plays</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </Disclosure>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="mt-12 px-4 md:px-6">
                        <div className="space-y-1">
                            <div>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className={`w-full outline-none py-2 px-3 rounded-lg ${open ? "bg-[#344054]" : ""}`}>
                                                <div className="flex justify-between items-center font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.1189 18C19.4623 16.4151 21 13.7779 21 10.785C21 5.9333 16.9704 2 12 2C7.02958 2 3 5.9333 3 10.785C3 13.7779 4.53771 16.4151 6.88113 18M8.35967 14C7.51875 13.15 7 12.0086 7 10.7505C7 8.12711 9.23881 6 12 6C14.7612 6 17 8.12711 17 10.7505C17 12.0095 16.4813 13.15 15.6403 14M12 22C10.8954 22 10 21.1046 10 20V18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18V20C14 21.1046 13.1046 22 12 22ZM13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11Z" stroke="#BEE7E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>

                                                        <div className="font-semibold">
                                                            Podcast
                                                        </div>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </div>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <Disclosure.Panel>
                                                    <div className="space-y-1 mt-2">
                                                        <div>
                                                            <Link href="/dashboard" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Dashboard
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link href="/podcast/episodes" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Episodes
                                                            </Link>
                                                        </div>
                                                        {/* <div>
                                                            <Link href="/podcast/distribution" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Distribution
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link href="/podcast/social-distribution" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Social distribution
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link href="/podcast/embedded-player" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Embedded player
                                                            </Link>
                                                        </div> */}
                                                    </div>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                            <div>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className={`w-full outline-none py-2 px-3 rounded-lg ${open ? "bg-[#344054]" : ""}`}>
                                                <div className="flex justify-between items-center font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13.41 18.09V20H10.74V18.07C9.03 17.71 7.58 16.61 7.47 14.67H9.43C9.53 15.72 10.25 16.54 12.08 16.54C14.04 16.54 14.48 15.56 14.48 14.95C14.48 14.12 14.04 13.34 11.81 12.81C9.33 12.21 7.63 11.19 7.63 9.14C7.63 7.42 9.02 6.3 10.74 5.93V4H13.41V5.95C15.27 6.4 16.2 7.81 16.26 9.34H14.3C14.25 8.23 13.66 7.47 12.08 7.47C10.58 7.47 9.68 8.15 9.68 9.11C9.68 9.95 10.33 10.5 12.35 11.02C14.37 11.54 16.53 12.41 16.53 14.93C16.52 16.76 15.15 17.76 13.41 18.09Z" fill="#BEE7E4" />
                                                        </svg>

                                                        <div className="font-semibold">
                                                            Monetize
                                                        </div>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </div>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <Disclosure.Panel>
                                                    <div className="space-y-1 mt-2">
                                                        <div>
                                                            <Link href="/monitize/wallet" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Wallet
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link href="/wokpa-ads" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Wokpa Ads
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link href="/tips-and-donations" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Tips and donations
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link href="/campaign" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Campaign
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            </div>

                            <div>
                                <NavLink href="/analytics" exact={false} className={`block w-full outline-none py-2 px-3 gap-2 rounded-lg`}>
                                    <div className="flex gap-2">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 13V15M10 9V15M14 5V15M5.8 19H14.2C15.8802 19 16.7202 19 17.362 18.673C17.9265 18.3854 18.3854 17.9265 18.673 17.362C19 16.7202 19 15.8802 19 14.2V5.8C19 4.11984 19 3.27976 18.673 2.63803C18.3854 2.07354 17.9265 1.6146 17.362 1.32698C16.7202 1 15.8802 1 14.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V14.2C1 15.8802 1 16.7202 1.32698 17.362C1.6146 17.9265 2.07354 18.3854 2.63803 18.673C3.27976 19 4.11984 19 5.8 19Z" stroke="#BEE7E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        <div className="font-semibold">
                                            Analytics
                                        </div>
                                    </div>
                                </NavLink>
                            </div>

                            <div>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className={`w-full outline-none py-2 px-3 rounded-lg ${open ? "bg-[#344054]" : ""}`}>
                                                <div className="flex justify-between items-center font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.39504 19.3711L9.97949 20.6856C10.1532 21.0768 10.4368 21.4093 10.7957 21.6426C11.1547 21.8759 11.5736 22.0001 12.0017 22C12.4298 22.0001 12.8488 21.8759 13.2077 21.6426C13.5667 21.4093 13.8502 21.0768 14.0239 20.6856L14.6084 19.3711C14.8164 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5677 17.8941 17.0784 17.9478L18.5084 18.1C18.934 18.145 19.3636 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8714 16.635 20.9735 16.2103 20.951 15.7829C20.9285 15.3555 20.7825 14.9438 20.5306 14.5978L19.6839 13.4344C19.3825 13.0171 19.2214 12.5148 19.2239 12C19.2238 11.4866 19.3864 10.9864 19.6884 10.5711L20.535 9.40778C20.7869 9.06175 20.933 8.65007 20.9554 8.22267C20.9779 7.79528 20.8759 7.37054 20.6617 7C20.4478 6.62923 20.1309 6.32849 19.7495 6.13423C19.3681 5.93997 18.9385 5.86053 18.5128 5.90556L17.0828 6.05778C16.5722 6.11141 16.0576 6.00212 15.6128 5.74556C15.1699 5.48825 14.8199 5.09736 14.6128 4.62889L14.0239 3.31444C13.8502 2.92317 13.5667 2.59072 13.2077 2.3574C12.8488 2.12408 12.4298 1.99993 12.0017 2C11.5736 1.99993 11.1547 2.12408 10.7957 2.3574C10.4368 2.59072 10.1532 2.92317 9.97949 3.31444L9.39504 4.62889C9.18797 5.09736 8.83792 5.48825 8.39504 5.74556C7.95026 6.00212 7.43571 6.11141 6.92504 6.05778L5.4906 5.90556C5.06493 5.86053 4.63534 5.93997 4.25391 6.13423C3.87249 6.32849 3.55561 6.62923 3.34171 7C3.12753 7.37054 3.02549 7.79528 3.04798 8.22267C3.07046 8.65007 3.2165 9.06175 3.46838 9.40778L4.31504 10.5711C4.61698 10.9864 4.77958 11.4866 4.77949 12C4.77958 12.5134 4.61698 13.0137 4.31504 13.4289L3.46838 14.5922C3.2165 14.9382 3.07046 15.3499 3.04798 15.7773C3.02549 16.2047 3.12753 16.6295 3.34171 17C3.55582 17.3706 3.87274 17.6712 4.25411 17.8654C4.63548 18.0596 5.06496 18.1392 5.4906 18.0944L6.9206 17.9422C7.43127 17.8886 7.94581 17.9979 8.3906 18.2544C8.83513 18.511 9.18681 18.902 9.39504 19.3711Z" stroke="#BEE7E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <path d="M11.9999 15C13.6568 15 14.9999 13.6569 14.9999 12C14.9999 10.3431 13.6568 9 11.9999 9C10.3431 9 8.99992 10.3431 8.99992 12C8.99992 13.6569 10.3431 15 11.9999 15Z" stroke="#BEE7E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>


                                                        <div className="font-semibold">
                                                            Settings
                                                        </div>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </div>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <Disclosure.Panel>
                                                    <div className="space-y-1 mt-2">
                                                        <div>
                                                            <Link href="/settings/podcast-settings" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Podcast settings
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link href="/settings/website-page-settings" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Website page settings
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link href="/settings/rss-settings" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Rss settings
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link href="/settings/collaborators" className={`block w-full outline-none py-2 px-6 font-medium rounded-lg bg-[#101828]`}>
                                                                Collaborators
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            </div>

                        </div>

                        <div className="mt-12">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.25001 15C8.25001 14.5858 8.58579 14.25 9.00001 14.25H15C15.1381 14.25 15.25 14.1381 15.25 14L15.25 2C15.25 1.86193 15.1381 1.75 15 1.75L9 1.75C8.58579 1.75 8.25001 1.41421 8.25001 1C8.25001 0.585788 8.58579 0.25 9 0.25H15C15.9665 0.25 16.75 1.0335 16.75 2V14C16.75 14.9665 15.9665 15.75 15 15.75H9.00001C8.58579 15.75 8.25001 15.4142 8.25001 15Z" fill="#BEE7E4" />
                                        <path d="M12.6116 9.11522C12.6116 9.6675 12.1639 10.1152 11.6116 10.1152H6.75562C6.73269 10.4706 6.70399 10.8258 6.66951 11.1805L6.63985 11.4857C6.59162 11.982 6.06466 12.2791 5.61504 12.0637C3.78712 11.1876 2.13234 9.98887 0.730282 8.525L0.700325 8.49372C0.433225 8.21485 0.433225 7.77506 0.700325 7.49619L0.730283 7.46491C2.13234 6.00104 3.78712 4.80226 5.61504 3.92625C6.06466 3.71077 6.59162 4.00796 6.63985 4.5042L6.66951 4.8094C6.70399 5.16413 6.73269 5.51928 6.75562 5.8747L11.6116 5.87471C12.1639 5.87471 12.6116 6.32242 12.6116 6.8747V9.11522Z" fill="#BEE7E4" />
                                    </svg>
                                </div>
                                {!minimized && <div
                                    onClick={() => {
                                        dispatch(resetAuth());
                                    }}
                                    className="font-source font-medium text-sm cursor-pointer">
                                    Logout
                                </div>}
                            </div>
                        </div>
                    </div>
                </div >
            </aside >

        </>
    )
};

export default Sidebar;