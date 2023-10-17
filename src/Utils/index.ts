'use client';

import { loadingBarRef } from "@/app/layout";
import { useRef, useEffect } from "react";
import { toast } from "react-toastify";

type voidFn = () => void

let resetState: voidFn = () => { }

export const handleUnauth = (fn: voidFn) => {
    resetState = fn;
}

export function getAbsoluteUrl(path: string) {
    return process.env.PUBLIC_URL + path;
}

export function getIcon(name: string) {
    return process.env.PUBLIC_URL + `/media/icons/${name}`;
}

export function getImage(name: string) {
    return process.env.PUBLIC_URL + `/media/images/${name}`;
}

export function getLogo(name: string) {
    return process.env.PUBLIC_URL + `/media/logos/${name}`;
}

export function getSVG(name: string) {
    return process.env.PUBLIC_URL + `/media/svg/${name}`;
}


const FPS = 1;
const DELAY = 1000 / FPS;
let time = 0;
let frame = -1;
let tref = 0;

export const handleRequestAnimationFrame = (callback: (timestamp: number) => void) => {
    return function loop(timestamp: number) {
        if (!time) time = timestamp;
        let seg = Math.floor((timestamp - time) / DELAY);

        if (seg > frame) {
            frame = seg;
            callback(timestamp);
        }
        tref = requestAnimationFrame(loop);
    }
}

export const APICall = async (fn: (...args: any) => Promise<any>, args?: any, showSuccessToast?: boolean,) => {
    try {
        loadingBarRef.current?.continuousStart();
        const response = args && typeof args[Symbol.iterator] === 'function' && !(typeof args == "string") ? await fn(...args) : await fn(args)
        if (showSuccessToast)
            toast(response.data.message, { type: "success" });
        loadingBarRef.current?.complete();
        return response;
    } catch (error: any) {
        if (error.response) {
            toast(error.response.data.message, { type: "error" });

            if (error.response.status == 401) {
                resetState();

            }
        }
        loadingBarRef.current?.complete();
        throw error;
    }
}


export const formatToCurrency = (amount: number | string) => {
    return Intl.NumberFormat('en-GB', {
    }).format(Number(amount))
};

// export const APICall = async (fn: (args?: any) => Promise<any>, args?: any, showSuccessToast?: boolean) => {
//     try {
//         loadingBarRef.current?.continuousStart();
//         const response = await fn(args)
//         if (showSuccessToast)
//             toast(response.data.message, { type: "success" });
//         loadingBarRef.current?.complete();
//         return response;
//     } catch (error: any) {
//         if (error.response) {
//             toast(error.response.data.message, { type: "error" });
//         }
//         loadingBarRef.current?.complete();
//         throw error;
//     }
// }

export async function dataURLtoFile(dataurl: string, filename: string) {
    const res = await fetch(dataurl);
    const blob = await res.blob();
    return new File([blob], filename, { type: "image/png" })
}


function abbreviateNumber(value: number) {
    let newValue = value.toString();
    if (value >= 1000) {
        let suffixes = ["", "k", "m", "b", "t"];
        let suffixNum = Math.floor(("" + value).length / 3);
        let shortValue: string | number = 0;
        for (let precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
            let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
}

export const useDimensions = (ref: any) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        dimensions.current.width = ref.current.offsetWidth;
        dimensions.current.height = ref.current.offsetHeight;
    }, []);

    return dimensions.current;
};


export const API_URL = "https://wokpa.ddns.net/api"
