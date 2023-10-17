"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { getIcon } from "@/utils";
import { Disclosure, Switch } from "@headlessui/react";


const DistributionPage
    = () => {
        const user = useAppSelector(state => state.auth.user);
        const dispatch = useAppDispatch();


        return (
            <div id="dashboard">
                <div className="relative">
                    <div className="flex gap-3 items-center">
                        <div className="text-sm font-medium">
                            All Podcasts
                        </div>
                        <div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="text-sm font-medium">
                            Emax podcast
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
                </div>
                <div className="mt-8">
                    <div className="pr-5">
                        <div className={`font-semibold text-xl pb-2`}>
                            Distribution
                        </div>
                        <div>
                            <p className="text-sm">
                                Find new listeners by distributing your podcast to all the major listening platforms. You'll be able to measure the results from the Statistics page and monetize your podcast whenever it’s listened to.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <Disclosure as="div" className="bg-[#141414] rounded-xl">
                            <Disclosure.Button className="w-full">
                                <div className="flex justify-between items-center px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <img className="w-16 h-16 rounded-xl" src={("/icons/podcast.png")} alt="" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-lg font-bold">
                                                Apple podcast
                                            </div>
                                            <div className="text-sm mt-2">
                                                Distribute to Apple Podcasts
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 15L20 25L30 15" stroke="#F2F4F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                </div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="border-t px-6 py-6">
                                <div>
                                    <div className="pr-6">
                                        Thousands of podcasts are distributed by Apple podcast, one of the most downloaded apps and used websites in the US for podcast listening.
                                    </div>
                                    <div className="mt-4">
                                        <Button className="py-2">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure as="div" className="bg-[#141414] rounded-xl">
                            <Disclosure.Button className="w-full">
                                <div className="flex justify-between items-center px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M54.335 0H9.54991C4.27562 0 0 4.28333 0 9.56712V54.4329C0 59.7166 4.27562 64 9.54991 64H54.335C59.6092 64 63.8849 59.7166 63.8849 54.4329V9.56712C63.8849 4.28333 59.6092 0 54.335 0Z" fill="#083F62" />
                                                <path d="M25.3055 48.0644C25.6199 48.0644 26.0656 47.9675 26.6288 47.3722L25.8272 50.6362C25.5615 51.7172 24.9443 52.6787 24.0729 53.3696C23.2015 54.0605 22.1254 54.4413 21.0142 54.452C19.903 54.4627 18.8198 54.1027 17.9352 53.4288C17.0507 52.7549 16.4152 51.8055 16.1287 50.7297L9.08724 24.0774C8.96027 23.605 8.92862 23.1119 8.99416 22.627C9.05974 22.1421 9.22116 21.6752 9.46903 21.2536C9.7169 20.832 10.0462 20.4641 10.4377 20.1716C10.8292 19.879 11.275 19.6676 11.7491 19.5497C12.2231 19.4319 12.7158 19.4099 13.1984 19.4852C13.681 19.5604 14.1438 19.7313 14.5597 19.9879C14.9756 20.2445 15.3362 20.5816 15.6205 20.9795C15.9047 21.3774 16.1069 21.8281 16.2151 22.3052L21.0799 43.2809H21.1767L21.7848 40.8995C22.113 42.6094 23.305 47.9918 25.3055 48.0644Z" fill="#25AEA4" />
                                                <path d="M45.4107 50.4286L45.3486 50.6605C45.1029 51.6549 44.5594 52.5504 43.791 53.2267C43.0229 53.903 42.0666 54.3274 41.0504 54.4437C39.8777 54.56 38.7027 54.2499 37.7397 53.5701C36.7768 52.8899 36.0903 51.8854 35.8056 50.7401L30.8164 30.6644H30.7058L27.0745 45.5204C27.0346 45.6896 26.953 45.8461 26.8371 45.9756C26.7212 46.105 26.5747 46.2033 26.4111 46.2611C26.2601 46.3127 26.1 46.3314 25.9412 46.3165C25.112 46.2161 24.6041 45.0946 23.9027 43.1494C23.4708 41.9345 22.9387 40.3353 22.417 38.4039L26.3489 22.9664C26.6038 21.9696 27.1835 21.0865 27.9962 20.4572C28.8088 19.8278 29.8078 19.4882 30.835 19.4922C31.8621 19.4962 32.8585 19.8435 33.6663 20.4791C34.4741 21.1147 35.0468 22.0022 35.2942 23.001L40.3939 43.6028C40.4216 43.7482 40.4561 43.8936 40.4907 44.0389C40.4893 44.0469 40.4893 44.0552 40.4907 44.0632C40.6254 44.6689 40.7775 45.3023 40.9468 45.9461C41.1368 46.673 41.3441 47.3687 41.5514 48.0229C41.55 48.0368 41.55 48.0506 41.5514 48.0645C42.1457 49.6982 42.9645 51.1485 43.9942 51.1797C44.3466 51.2004 44.8199 51.0758 45.4107 50.4286Z" fill="#25AEA4" />
                                                <path d="M45.9075 48.407C45.8433 48.6288 45.7244 48.8313 45.562 48.9954C45.3409 49.175 45.0576 49.2595 44.7743 49.2308C44.6817 49.2187 44.5911 49.1944 44.5048 49.1581H44.484C43.793 48.8119 43.3404 47.6766 42.7807 46.0913C42.3177 44.7726 41.7441 42.9761 41.1533 40.8059L47.7975 12.3399C47.9039 11.8707 48.1022 11.4274 48.3814 11.0359C48.6602 10.6444 49.0147 10.3125 49.4231 10.0597C49.8319 9.8069 50.2865 9.6382 50.7609 9.56347C51.2353 9.48874 51.7197 9.50951 52.1862 9.62449C52.6526 9.73951 53.0914 9.94646 53.477 10.2333C53.8626 10.5201 54.187 10.881 54.4316 11.295C54.6766 11.7089 54.8366 12.1676 54.9022 12.6441C54.9682 13.1207 54.9385 13.6056 54.8148 14.0706L46.0216 48.0851L45.9075 48.407Z" fill="#25AEA4" />
                                            </svg>

                                        </div>
                                        <div className="text-left">
                                            <div className="text-lg font-bold">
                                                Wokpa podcast
                                            </div>
                                            <div className="text-sm mt-2">
                                                Distribute to Wokpa
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 15L20 25L30 15" stroke="#F2F4F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                </div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="border-t px-6 py-6">
                                <div>
                                    <div className="pr-6 text-lg text-[#F9FAFB]">
                                        Your podcast has been added to Wokpa
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex w-7/12 items-center gap-8">
                                            <div className="flex-1">
                                                <input placeholder="https://www.wokpa.com/emax-podcast" type="text" className="w-full py-3 px-4 rounded-lg bg-[#202939] text-[#F2F4F7] placeholder:text-[#F2F4F7] border-0" />
                                            </div>
                                            <div>
                                                <button className="bg-white inline-flex items-center gap-2 rounded-full py-2 px-3">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_3344_57533)">
                                                            <path d="M4.16699 12.5003C3.39042 12.5003 3.00214 12.5003 2.69585 12.3735C2.28747 12.2043 1.96302 11.8798 1.79386 11.4715C1.66699 11.1652 1.66699 10.7769 1.66699 10.0003V4.33366C1.66699 3.40024 1.66699 2.93353 1.84865 2.57701C2.00844 2.2634 2.2634 2.00844 2.57701 1.84865C2.93353 1.66699 3.40024 1.66699 4.33366 1.66699H10.0003C10.7769 1.66699 11.1652 1.66699 11.4715 1.79386C11.8798 1.96302 12.2043 2.28747 12.3735 2.69585C12.5003 3.00214 12.5003 3.39042 12.5003 4.16699M10.167 18.3337H15.667C16.6004 18.3337 17.0671 18.3337 17.4236 18.152C17.7372 17.9922 17.9922 17.7372 18.152 17.4236C18.3337 17.0671 18.3337 16.6004 18.3337 15.667V10.167C18.3337 9.23357 18.3337 8.76686 18.152 8.41034C17.9922 8.09674 17.7372 7.84177 17.4236 7.68198C17.0671 7.50033 16.6004 7.50033 15.667 7.50033H10.167C9.23357 7.50033 8.76686 7.50033 8.41034 7.68198C8.09674 7.84177 7.84177 8.09674 7.68198 8.41034C7.50033 8.76686 7.50033 9.23357 7.50033 10.167V15.667C7.50033 16.6004 7.50033 17.0671 7.68198 17.4236C7.84177 17.7372 8.09674 17.9922 8.41034 18.152C8.76686 18.3337 9.23357 18.3337 10.167 18.3337Z" stroke="#063150" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_3344_57533">
                                                                <rect width="20" height="20" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                    <span className="text-sm !text-[#063150] font-semibold">Copy</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-4 text-sm text-[#F9FAFB]">
                                            This is the URL of your podcast on Wokpa. Share it to get more listeners!
                                        </div>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </Disclosure>
                        <Disclosure as="div" className="bg-[#141414] rounded-xl">
                            <Disclosure.Button className="w-full">
                                <div className="flex justify-between items-center px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64px" height="64px">
                                                <radialGradient id="ipdIa4~cOclR8yt_ClW93a" cx="33.34" cy="572.064" r="43.888" gradientTransform="translate(0 -534)" gradientUnits="userSpaceOnUse">
                                                    <stop offset="0" stopColor="#f4e9c3" />
                                                    <stop offset=".219" stopColor="#f8eecd" />
                                                    <stop offset=".644" stopColor="#fdf4dc" />
                                                    <stop offset="1" stopColor="#fff6e1" />
                                                </radialGradient>
                                                <linearGradient id="ipdIa4~cOclR8yt_ClW93b" x1="32" x2="32" y1="530.096" y2="590.253" gradientTransform="translate(0 -534)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#42d778" /><stop offset=".428" stopColor="#3dca76" /><stop offset="1" stopColor="#34b171" /></linearGradient><path fill="url(#ipdIa4~cOclR8yt_ClW93b)" d="M57,32c0,12.837-9.663,23.404-22.115,24.837C33.942,56.942,32.971,57,32,57 c-1.644,0-3.25-0.163-4.808-0.471C15.683,54.298,7,44.163,7,32C7,18.192,18.192,7,32,7S57,18.192,57,32z" /><path fill="#fff" d="M41.683,44.394c-0.365,0-0.731-0.181-1.096-0.365c-3.471-2.009-7.674-3.105-12.24-3.105 c-2.559,0-5.116,0.364-7.491,0.912c-0.365,0-0.914,0.183-1.096,0.183c-0.914,0-1.461-0.732-1.461-1.462 c0-0.913,0.547-1.463,1.279-1.643c2.923-0.732,5.846-1.096,8.951-1.096c5.116,0,9.866,1.276,13.885,3.655 c0.548,0.364,0.914,0.73,0.914,1.642C43.145,43.847,42.414,44.394,41.683,44.394z M44.241,38.181c-0.547,0-0.912-0.18-1.279-0.364 c-3.835-2.375-9.135-3.839-15.163-3.839c-2.924,0-5.664,0.366-7.674,0.916c-0.549,0.18-0.731,0.18-1.096,0.18 c-1.096,0-1.827-0.912-1.827-1.826c0-1.096,0.549-1.645,1.461-2.009c2.74-0.73,5.481-1.279,9.317-1.279 c6.213,0,12.241,1.463,16.991,4.384c0.73,0.364,1.096,1.096,1.096,1.826C46.069,37.269,45.337,38.181,44.241,38.181z M47.165,30.876 c-0.548,0-0.731-0.182-1.279-0.364c-4.385-2.559-10.961-4.021-17.356-4.021c-3.289,0-6.577,0.366-9.5,1.096 c-0.366,0-0.731,0.182-1.279,0.182c-1.279,0.183-2.193-0.912-2.193-2.192c0-1.279,0.731-2.009,1.644-2.192 c3.471-1.096,7.125-1.462,11.327-1.462c6.943,0,14.25,1.462,19.731,4.567c0.73,0.366,1.278,1.096,1.278,2.193 C49.357,29.961,48.442,30.876,47.165,30.876z" /></svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="text-lg font-bold">
                                                Spotify podcast
                                            </div>
                                            <div className="text-sm mt-2">
                                                Distribute to Spotify
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 15L20 25L30 15" stroke="#F2F4F7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                    </div>
                                </div>
                            </Disclosure.Button>
                            <Disclosure.Panel className="border-t px-6 py-6">
                                <div>
                                    <div className="pr-6">
                                        The most popular app for consuming audio content, offering podcasters the opportunity to be listened to by millions of people in over 60 markets.
                                    </div>
                                    <div className="mt-4">
                                        <Button className="py-2">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </Disclosure>
                    </div>
                </div>
            </div>
        )
    }

export default DistributionPage
