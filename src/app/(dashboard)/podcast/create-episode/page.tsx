"use client";

import { getPodcastCategories } from "@/app/api/general";
import { createPodcast, getPodcasts, uploadEpisode } from "@/app/api/publishers";
import Button from "@/components/button";
import Input from "@/components/input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { PodcastCategoryModel } from "@/models/category";
import { PodcastModel } from "@/models/podcast";
import podcast from "@/redux/podcast";
import { Switch } from "@headlessui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import * as Yup from "yup"
import { useDropzone, Accept } from 'react-dropzone'
import { useRouter } from "next/navigation";
import Link from "next/link";



const CreateEpisodePage = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const [selectedPodcast, setSelectedPodcast] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [podcasts, setPodcasts] = useState<PodcastModel[]>([]);
    const router = useRouter();


    const handleGetPodcast = async () => {
        try {
            const response = await getPodcasts();
            setPodcasts(response.data.data.data);
            console.log(response.data.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { handleGetPodcast() }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("This field is required"),
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length)
            setAudioFile(acceptedFiles[0])

    }, [])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, maxSize: 2000000000, multiple: false, accept: { 'audio/*': [] } })


    const handleCreateEpisode = async () => {
        try {

            setIsLoading(true);
            const data = {
                content: acceptedFiles[0],
            };

            const response = await uploadEpisode(selectedPodcast, data);
            toast(response.data.message, { type: "success" });
            router.push("/podcast/episodes")
            setIsLoading(false);

        } catch (error: any) {
            setIsLoading(false);
            if (error.response) {
                toast(error.response.data.message, { type: "error" });
            }
            console.log(error)
        }
    }


    return (
        <div id="dashboard">
            <div className="relative">
                <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium">
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium  text-[#66C6BF]">
                        Create a new episode
                    </div>

                </div>
            </div>
            <div className="mt-8">
                <div className="pr-5">
                    <div className={`font-bold text-3xl pb-2 font-raleway`}>
                        Upload a New Episode
                    </div>
                    <div>
                        <p className="text-sm">
                            By creating content on wokpa you adhere to our policies
                        </p>
                    </div>
                </div>
                <div className="mt-8">

                    <div>
                        <div className="space-y-8">
                            <div className="flex">
                                <div className="w-8/12">
                                    <div className={`font-bold text-lg pb-2 font-raleway`}>
                                        Step 1: Choose the podcast for this episode
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="password" className="text-sm font-medium">
                                            Podcast
                                        </label>
                                        <select value={selectedPodcast} onChange={(e) => setSelectedPodcast(e.target.value)} name="title" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                            <option value="">Select podcast</option>
                                            {
                                                podcasts.map((podcast) => {
                                                    return <option value={podcast.id}>{podcast.title}</option>
                                                })
                                            }
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <div className={`font-bold text-lg pb-2 font-raleway`}>
                                    Step 2: Choose the file you want to upload
                                </div>
                                <div className="w-8/12">
                                    <div   {...getRootProps({ className: 'dropzone border-2 rounded-lg bg-grayTrue border-[#98A2B3] p-10 text-center border-dashed' })}>
                                        <input {...getInputProps()} />
                                        {
                                            audioFile ? audioFile.name : "Drag and drop your audio file here or click to browse from your device. We support mp3, mp4, m4a, wav, 3gp, aac, amr, flac, ogg, ra, asf file. Maximum file size is 300 MB."
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className="mt-1 ">
                                <Button onClick={handleCreateEpisode} type="submit" className="py-2 text-sm font-medium text-center">
                                    {
                                        isLoading ?
                                            <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
                                                <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                                    <animateTransform
                                                        attributeName="transform"
                                                        attributeType="XML"
                                                        type="rotate"
                                                        dur="1s"
                                                        from="0 50 50"
                                                        to="360 50 50"
                                                        repeatCount="indefinite" />
                                                </path>
                                            </svg> : "Upload episode"
                                    }

                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default CreateEpisodePage
