
"use client";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Navbar, { HomeNavbar } from "@/partials/navbar";
import { FooterDark } from "@/partials/footer";
import Sidebar from "@/partials/sidebar";
import { PropsWithChildren, useEffect, useState } from "react";
import ReduxProvider from '../redux-provider';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useEffectOnce } from 'react-use';
import { handleUnauth } from '@/utils';
import { resetAnalytics } from '@/redux/analytics';
import { resetAuth } from '@/redux/auth';
import { resetPodcast } from '@/redux/podcast';

const AuthValidator = () => {
    const navigate = useRouter();
    const auth = useAppSelector(state => state.auth);
const dispatch = useAppDispatch();
    const pathName = usePathname();

    const resetState = () => {
        dispatch(resetAuth());
        dispatch(resetAnalytics())
        dispatch(resetPodcast())
    }

    useEffectOnce(() => {
        handleUnauth(resetState)
    })

    useEffect(() => {
        if (!auth.token || !auth.user) {
            navigate.push("/");
            return;
        }

        if (!auth.user.current_subscription) {
            // navigate.push("/onboarding/one");

        }
    }, [pathName, auth])
    return <>
    </>
}

export default function RootLayout({ children }: PropsWithChildren) {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <ReduxProvider>
            <AuthValidator />
            <div className='bg-dark tracking-normal'>
                <ToastContainer position='top-right' theme='dark' hideProgressBar />
                <div className='content'>
                    {showSidebar &&
                        <Sidebar />
                    }
                    <div className={`sm:ml-[20rem] h-screen overflow-y-auto`}>
                        <Navbar />
                        <div className="p-4 md:p-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </ReduxProvider>
    )
}