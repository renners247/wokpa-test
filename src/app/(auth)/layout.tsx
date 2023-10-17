'use client';

import { PropsWithChildren } from "react";
import ReduxProvider from "../redux-provider";
import { ToastContainer } from "react-toastify"
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-toastify/dist/ReactToastify.css';

function AuthLayout({ children }: PropsWithChildren) {
    // const { store, props } = wrapper.useWrappedStore(rest);

    return (
        <div>
            <GoogleOAuthProvider clientId="708704158924-9hugf857ps4b6eqg3n4k97dumsatq76v.apps.googleusercontent.com">
                <ToastContainer position='top-right' hideProgressBar />
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </GoogleOAuthProvider>
        </div>
    )
}
export default AuthLayout;