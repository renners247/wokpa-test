"use client";

import { AxiosStatic } from "axios";

export default function setupAxios(axios: AxiosStatic, store: any) {
    axios.defaults.headers.common["Accept"] = 'application/json';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.interceptors.request.use(
        (config: any) => {
            const {
                auth: { token },
            } = store.getState()

            if (true) {

                if (config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

            }
            if (config.headers)
                config.headers["Access-Control-Allow-Origin"] = "*";
            return config;
        },

        (err: any) => Promise.reject(err)
    )
}