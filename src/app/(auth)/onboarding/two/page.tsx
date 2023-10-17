'use client';
import Button from "@/components/button";
import Input from "@/components/input";

export default function OnboardingTwo() {
    return (
        <div>
            <div className="">
                <div className="flex flex-row-reverse min-h-screen">
                    <div className="w-6/12 bg-dark contianer md:px-8 py-8">

                        <div className="mt-24 text-left">
                            <div className="w-8/12 mx-auto">
                                <div>
                                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_1675_38592)">
                                            <mask id="mask0_1675_38592" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="56" height="56">
                                                <path d="M55.9834 0H0V55.9834H55.9834V0Z" fill="white" />
                                            </mask>
                                            <g mask="url(#mask0_1675_38592)">
                                                <path d="M47.6152 0H8.3682C3.74657 0 0 3.74657 0 8.3682V47.6152C0 52.2368 3.74657 55.9834 8.3682 55.9834H47.6152C52.2368 55.9834 55.9834 52.2368 55.9834 47.6152V8.3682C55.9834 3.74657 52.2368 0 47.6152 0Z" fill="#083F62" />
                                                <path d="M22.1732 42.04C22.4497 42.051 22.8383 41.9556 23.3319 41.4454L22.6308 44.2993C22.3987 45.2454 21.858 46.0872 21.0945 46.692C20.3308 47.2968 19.3875 47.6302 18.4134 47.6394C17.4394 47.6488 16.4899 47.3337 15.7148 46.7436C14.9398 46.1536 14.3831 45.3223 14.1327 44.3809L7.96305 21.0725C7.84911 20.6586 7.81916 20.2261 7.87493 19.8005C7.93069 19.3749 8.07106 18.9647 8.28778 18.5941C8.50449 18.2237 8.79316 17.9001 9.13678 17.6429C9.4804 17.3856 9.87202 17.1996 10.2886 17.0961C10.7052 16.9925 11.1383 16.9733 11.5624 17.0396C11.9865 17.1059 12.393 17.2565 12.7581 17.4823C13.1231 17.7081 13.4393 18.0048 13.688 18.3546C13.9366 18.7046 14.1128 19.1007 14.206 19.5197L18.4716 37.8752H18.5629L19.0939 35.7915C19.3759 37.2682 20.4213 41.9764 22.1732 42.04Z" fill="#25AEA4" />
                                                <path d="M39.7904 44.1099L39.7378 44.3104C39.276 46.0803 37.791 47.445 35.9713 47.622C34.9435 47.7245 33.9133 47.4533 33.0691 46.8581C32.2251 46.2628 31.6236 45.3834 31.3752 44.3809L26.9975 26.8135H26.9104L23.7301 39.8111C23.6956 39.9594 23.6241 40.0967 23.5223 40.2101C23.4205 40.3235 23.2918 40.4092 23.148 40.4596C23.0149 40.5057 22.8731 40.5214 22.7332 40.5052C22.0073 40.4181 21.5607 39.4391 20.9481 37.7398C20.5679 36.6765 20.1033 35.2799 19.647 33.5916L23.0913 20.088C23.3138 19.2157 23.8213 18.4426 24.5334 17.8914C25.2453 17.3404 26.1208 17.0429 27.0213 17.0462C27.9216 17.0496 28.795 17.3535 29.5028 17.9098C30.2108 18.4662 30.7124 19.243 30.9286 20.117L35.3989 38.1394C35.4238 38.2652 35.4514 38.3924 35.4832 38.5196C35.4813 38.5264 35.4813 38.5336 35.4832 38.5404C35.5994 39.0713 35.7321 39.6244 35.8801 40.1872C36.0487 40.8246 36.2285 41.4316 36.411 42.0179C36.4154 42.0291 36.4192 42.0407 36.4221 42.0525C36.9434 43.4808 37.6665 44.7515 38.5653 44.7875C38.857 44.7889 39.2732 44.6755 39.7904 44.1099Z" fill="#25AEA4" />
                                                <path d="M40.226 42.3388C40.1681 42.535 40.0616 42.7133 39.9163 42.8573C39.8202 42.9352 39.7096 42.9931 39.5909 43.0281C39.4723 43.063 39.3479 43.074 39.2249 43.0606C39.1433 43.0519 39.0636 43.0305 38.9885 42.997C38.9816 42.997 38.9774 42.9901 38.9705 42.9901C38.3759 42.6914 37.968 41.6959 37.4786 40.309C37.0734 39.1544 36.5604 37.5947 36.053 35.6838L41.8742 10.7852C41.9734 10.3813 42.1512 10.0009 42.3973 9.66563C42.6434 9.33039 42.9533 9.04692 43.3089 8.83141C43.6647 8.61588 44.0595 8.47255 44.4705 8.40957C44.8816 8.34659 45.3011 8.3652 45.705 8.46435C46.1091 8.56349 46.4894 8.74123 46.8246 8.98739C47.1599 9.23357 47.4434 9.54336 47.6589 9.89909C47.8744 10.2548 48.0178 10.6495 48.0807 11.0606C48.1437 11.4717 48.1251 11.8912 48.0259 12.2952L40.3214 42.0512L40.226 42.3388Z" fill="#25AEA4" />
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1675_38592">
                                                <rect width="56" height="56" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </div>
                                <div className="mt-12">
                                    <div className="text-gray-100 mt-2 text-3xl font-raleway">Final Step</div>
                                    <div className="text-gray-100 mt-2">This will make us give you a better experience on Wokpa.</div>

                                </div>
                                <div className="mt-6">
                                    <div className="space-y-5">
                                        <div className="mt-6">
                                            <div className="space-y-5">
                                                <div>
                                                    <label htmlFor="password" className="text-sm">
                                                        Number of shows
                                                    </label>
                                                    <Input name="email" placeholder="Enter number of shows" />
                                                </div>
                                                <div>
                                                    <label htmlFor="password" className="text-sm">
                                                        Number of presenters
                                                    </label>
                                                    <Input name="email" placeholder="Enter number of presenters" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Button className="w-full">
                                            Continue
                                        </Button>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div style={{ background: "linear-gradient(45deg, #005FF8  0%, #384459  100%)" }}
                        className="w-6/12 flex justify-center items-center container  md:mx-auto md:px-12">
                        <div className="">
                            <div className="self text-gray-50 text-[64px] font-extrabold font-raleway leading-tight">Tell us about your business</div>
                            <div className="w-[558px] text-gray-100 text-[20px] font-normal leading-normal">
                                This will help us get you in touch with Wokpa</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
