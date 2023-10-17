'use client';
// import 'rsuite/dist/rsuite.min.css';
import 'react-tooltip/dist/react-tooltip.css'
import './globals.css'
import 'swiper/css';
import 'swiper/css/pagination';

import { PropsWithChildren, useEffect, useState, Suspense } from "react";
import { Inter, Raleway, Poppins } from 'next/font/google'
import axios from "axios";
import store from '@/setup/redux/store';
import * as _redux from "@/setup"
import { Provider } from 'react-redux';
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const loadingBarRef = React.createRef<LoadingBarRef | null>();

// import { PersistGate } from 'redux-persist/integration/react';

_redux.setupAxios(axios, store)

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const raleway = Raleway({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-raleway',
})

const poppins = Poppins({
    weight: ['400', '500', '600', '700', '800', '900'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
})

function RootLayout({ children, ...rest }: PropsWithChildren) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {


    })
    // const { store, props } = wrapper.useWrappedStore(rest);

    return (

        <html lang="en" className={`${inter.variable} ${raleway.variable} ${poppins.variable}`} >
            <body className="" >
                <main className="relative text-base">
                    <LoadingBar color='#36FFE8' ref={loadingBarRef as React.RefObject<LoadingBarRef>} height={5} />
                    {children}
                </main>
            </body>
        </html >
    )
}

export default RootLayout;