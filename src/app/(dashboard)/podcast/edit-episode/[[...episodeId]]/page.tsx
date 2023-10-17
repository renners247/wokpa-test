"use client";

import { getPodcastsById, getPodcastEpisodes, getPodcastEpisode, updateEpisode, uploadEpisode, uploadEpisodeAudio, getArchivePodcastsById, getArchivedEpisodeById } from "@/app/api/publishers";
import Button from "@/components/button";
import Input from "@/components/input";
import Modal from "@/components/modal";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { EpisodeModel } from "@/models/episode";
import { PodcastModel } from "@/models/podcast";
import { Switch, Tab } from "@headlessui/react";
import { useState, useEffect, useRef, createRef, useCallback } from "react";
import { FileContent, useFilePicker } from "use-file-picker";
import AvatarEditor from 'react-avatar-editor';
import ReactSlider from "react-slider";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { APICall, handleRequestAnimationFrame } from "@/utils";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { AudioPlayer } from "@/utils/audio-player";
import { updatePlaybackData } from "@/redux/player";
import { useEffectOnce } from "react-use"
import Slider from "react-input-slider"
import { useRouter } from "next/navigation";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Tag } from "@/app/(dashboard)/components/Tag";
import Link from "next/link";
import { loadingBarRef } from "@/app/layout";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";


const ReplaceAudioTab = ({ episode }: { episode: EpisodeModel }) => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const [selectedPodcast, setSelectedPodcast] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [audioFile, setAudioFile] = useState<File | null>(null)


    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length)
            setAudioFile(acceptedFiles[0])

    }, [])

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1, maxSize: 2000000000, multiple: false, accept: { 'audio/*': [] } })


    const handleReplaceAudio = async () => {
        try {

            setIsLoading(true);
            const data = {
                content: acceptedFiles[0],
            };

            const response = await APICall(uploadEpisodeAudio, [episode.podcast_id, episode.id, data], true);
            setIsLoading(false);

        } catch (error: any) {
            setIsLoading(false);

            console.log(error)
        }
    }

    return (
        <div className="mt-8">
            <div className="pr-5">
                <div className={`font-bold text-xl pb-2 font-raleway`}>
                    Replace audio file
                </div>
                <div>
                    <p className="text-sm">
                        You have the option to substitute this episode with a fresh audio file from your computer. Your progress will be retained, and you won't need to modify any of the initially entered information. Tap the button below to upload a different file. Prior to replacing the audio, we suggest downloading the original version as a backup to preserve it.
                    </p>
                </div>
                <div className="mt-6 space-y-6">
                    <a href={episode?.content_url} download target="_blank">
                        <Button>Download episode</Button>
                    </a>
                    <div>
                        <Button className="!from-white !to-white !text-[#063150] font-semibold">Replace episode</Button>
                    </div>
                </div>
            </div>
            <div className="mt-8">

                <div>
                    <div className="space-y-8">

                        <div>

                            <div className="w-8/12">
                                <div className='dropzone border-2 rounded-lg bg-grayTrue border-[#98A2B3] p-10 text-center border-dashed'>
                                    <div   {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        {
                                            audioFile ? audioFile.name : "Drag and drop your audio file here or click to browse from your device. We support mp3, mp4, m4a, wav, 3gp, aac, amr, flac, ogg, ra, asf file. Maximum file size is 300 MB."
                                        }
                                    </div>
                                    <div className="mt-4">
                                        <Button onClick={handleReplaceAudio} className="!from-white !to-white !text-[#063150] font-semibold">
                                            {
                                                isLoading ?
                                                    <svg className="w-5 h-5" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                                    </svg> : "Upload audio"
                                            }
                                        </Button>
                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

const EpisodePlayer = ({ episode }: { episode: EpisodeModel }) => {
    const { user } = useAppSelector(state => state.auth);

    const { playbackData } = useAppSelector((state) => state.audioPlayer);
    const [rate, setRate] = useState(1);
    const [showRates, setShowRates] = useState(false);

    const dispatch = useAppDispatch();

    const handlePlay = () => {
        if (AudioPlayer.playing) {
            AudioPlayer.pause()
        }
        else if (AudioPlayer.paused) {
            AudioPlayer.play()
        }
        if (!AudioPlayer.loaded) {
            AudioPlayer.loadAudioAndPlay(episode.content_url);
        }

    }

    useEffectOnce(() => {
        AudioPlayer.updateFn = (playbackData) => {
            dispatch(updatePlaybackData({ playbackData }));
        }
        requestAnimationFrame(handleRequestAnimationFrame(AudioPlayer.update));
    });

    useEffectOnce(() => {
        AudioPlayer.onEndFn = async () => {
            AudioPlayer.stop();
        }
    });

    useEffect(() => {
        return () => {
            console.log("stop")
            if (AudioPlayer.loaded) {
                AudioPlayer.stop()
            }
        }
    }, [])

    return (
        <div className="rounded-lg border py-4 px-6 flex items-center gap-4">
            <button onClick={handlePlay}>
                {
                    playbackData.playing ? <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.666 20.0001V12.0001M19.3327 20.0001V12.0001M29.3327 16.0001C29.3327 23.3639 23.3631 29.3334 15.9993 29.3334C8.63555 29.3334 2.66602 23.3639 2.66602 16.0001C2.66602 8.63628 8.63555 2.66675 15.9993 2.66675C23.3631 2.66675 29.3327 8.63628 29.3327 16.0001Z" stroke="#E5F5F4" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                    </svg> : <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.0002 36.6663C29.2049 36.6663 36.6668 29.2044 36.6668 19.9997C36.6668 10.7949 29.2049 3.33301 20.0002 3.33301C10.7954 3.33301 3.3335 10.7949 3.3335 19.9997C3.3335 29.2044 10.7954 36.6663 20.0002 36.6663Z" stroke="#F2F4F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.8335 14.9419C15.8335 14.1464 15.8335 13.7487 15.9997 13.5266C16.1446 13.3331 16.3664 13.2121 16.6075 13.1948C16.8841 13.1751 17.2187 13.3902 17.8878 13.8203L25.7555 18.8781C26.3361 19.2514 26.6265 19.438 26.7267 19.6753C26.8144 19.8827 26.8144 20.1167 26.7267 20.324C26.6265 20.5613 26.3361 20.748 25.7555 21.1212L17.8878 26.179C17.2187 26.6092 16.8841 26.8243 16.6075 26.8045C16.3664 26.7873 16.1446 26.6662 15.9997 26.4727C15.8335 26.2507 15.8335 25.8529 15.8335 25.0575V14.9419Z" stroke="#F2F4F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                }

            </button>
            <div className="space-y-4 flex-1">

                <div className="font-bold">
                    {episode?.title?.substring(0, 30)}... <span className="ml-4 text-xs font-normal">{playbackData.playtime}/{playbackData.duration}</span>
                </div>

                <Slider
                    axis="x"
                    x={AudioPlayer.loaded ? playbackData.playtimeCap : 0}
                    styles={{
                        track: {
                            width: "100%",
                            height: "8px",
                            backgroundColor: "#344054"
                        },
                        active: {
                            backgroundColor: "#F9FAFB",
                        },
                        thumb: {
                            width: 16,
                            height: 16,
                            backgroundColor: "#46BAB2",
                        },
                    }}
                    onChange={({ x }) => { AudioPlayer.loaded && AudioPlayer.seek(x / 100) }}
                />
            </div>
        </div>
    )
}

const EditEpisodePage = ({ params }: { params: { episodeId: string[] } }) => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();

    // const imgRef = useRef<HTMLImageElement>(HTMLImageElement.prototype);
    const editorRef = createRef<AvatarEditor>()

    const [podcast, setPodcast] = useState<PodcastModel | null>(null);
    const [episode, setEpidoe] = useState<EpisodeModel | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [publishLater, setPublishLater] = useState(false);

    const [scale, setScale] = useState(1);
    const [editedImage, setEditedImage] = useState<File | null>(null);
    const [editedImageURL, setEditedImageURL] = useState<string>("");
    const router = useRouter();
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("This field is required"),
        season: Yup.string(),
        number: Yup.string(),
        type: Yup.string(),
        description: Yup.string().required("This field is required"),
        transcript_type: Yup.string(),
        transcript_url: Yup.string(),
        visibility: Yup.string().required("This field is required"),
        status: Yup.string().required("This field is required"),
        publish_later_at: Yup.date(),
        explicit: Yup.boolean().required("This field is required"),

    });

    const finishEdit = async () => {
        const dataUrl = editorRef.current?.getImage().toDataURL();
        console.log(dataUrl)
        fetch(dataUrl as string)
            .then(res => res.blob())
            .then(blob => {
                setEditedImageURL(window.URL.createObjectURL(blob))
            });

        setShowEditModal(false);
    }

    const [imagePicker, { filesContent, plainFiles, clear, }] = useFilePicker({
        readAs: 'DataURL',
        accept: ['image/*'],
        multiple: false,
        limitFilesConfig: { max: 1 },
        maxFileSize: 1,
        onFilesSuccessfulySelected: (selected) => {
            setEditedImage(null);
            setEditedImageURL("")
            // clear();
        }
    });


    const removeTag = (tag: string) => {
        const nextTags = tags.filter(item => item !== tag);
        setTags(nextTags);
    };

    const addTag = () => {
        const nextTags = inputValue ? [...tags, inputValue] : tags;
        setTags(nextTags);
        setInputValue('');
    };

    useEffect(() => {
        (async () => {
            try {

                loadingBarRef.current?.continuousStart();
                const episodesResponse = params.episodeId[2] ? await getArchivedEpisodeById(params.episodeId[0], params.episodeId[1]) : await getPodcastEpisode(params.episodeId[0], params.episodeId[1]);
                setEpidoe(episodesResponse.data.data);
                loadingBarRef.current?.complete();

            } catch (error) {
                loadingBarRef.current?.complete();

            }
        })()
    }, []);


    const handleUploadEpisode = async (values: any, setSubmitting: (val: boolean) => void) => {
        try {
            setSubmitting(true);

            let data = {
                ...values,
                tags
            };


            if (plainFiles.length) {
                data = { ...data, picture: plainFiles[0] as any }
            }

            const response = await APICall(updateEpisode, [episode?.podcast_id, episode?.id, data], true);
            router.push(`/podcast/podcast-view/${params.episodeId[0]}/table`)

            setSubmitting(false);

        } catch (error: any) {
            console.log(error)
            setSubmitting(false);

        }
    }

    return (
        <div id="dashboard">
            <Modal size="sm" open={showEditModal} onClose={(val) => setShowEditModal(val)}>
                <div className="border-b text-center text-2xl font-raleway font-bold py-5">
                    Edit Image
                </div>
                <div className="py-10 text-center">

                    <div className="flex justify-center">
                        <AvatarEditor
                            ref={editorRef}
                            image={episode?.picture_url as string}
                            width={350}
                            height={350}
                            scale={scale}
                            rotate={0}
                        />
                    </div>
                    <div className="my-4 px-4 h-4 max-w-sm mx-auto flex gap-2 items-center">
                        <div className="text-sm font-semibold">
                            Zoom
                        </div>
                        <ReactSlider
                            value={scale}
                            min={1}
                            max={10}
                            step={0.5}
                            className="max-w-sm w-full mx-auto slider"
                            onChange={(v) => setScale(v)}
                            thumbClassName="bg-[#46BAB2] w-4 h-4 rounded-full cursor-pointer  outline-none -top-2"
                            trackClassName="h-2  bg-[#344054] rounded-lg slider-track -top-1 slider-track" />
                    </div>
                    <div className="">
                        <Button onClick={finishEdit} className="!text-sm !py-[0.63rem] text-center">
                            Done
                        </Button>
                    </div>
                </div>
            </Modal>
            <Tab.Group>
                <Tab.List className="flex border-b gap-2 border-[#98A2B3]">
                    <Tab className="outline-none">
                        {({ selected }) => (
                            <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                Episode Info
                            </div>
                        )}
                    </Tab>

                    <Tab className="outline-none">
                        {({ selected }) => (
                            <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                Ads
                            </div>
                        )}
                    </Tab>
                    <Tab className="outline-none">
                        {({ selected }) => (
                            <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                Sharing
                            </div>
                        )}
                    </Tab>
                    <Tab className="outline-none">
                        {({ selected }) => (
                            <div className={`${selected ? "border-b-2 border-[#0D8478] text-[#0D8478]" : "text-[#98A2B3]"} font-semibold px-4 text-sm pb-2`}>
                                Replace audio
                            </div>
                        )}
                    </Tab>

                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="mt-8 pb-8">
                            <div className="pr-5">
                                <div className={`font-bold text-xl pb-2`}>
                                    Episode Information
                                </div>
                                <div>
                                    <p className="text-sm">
                                        Here you can customize the podcasts basic information as well as more advanced details such as the RSS Tags
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="w-8/12 mb-8">
                                    {episode && <EpisodePlayer episode={episode} />}
                                </div>
                                {episode && <Formik
                                    initialValues={{
                                        title: episode?.title ? episode?.title : "",
                                        season: episode?.season ? episode?.season : "",
                                        number: episode?.number ? episode?.number : "",
                                        type: episode?.type ? episode?.type : "",
                                        description: episode?.description ? episode?.description : "",
                                        transcript_type: episode?.transcript_type ? episode?.transcript_type : "",
                                        transcript_url: episode?.transcript_url ? episode?.transcript_url : "",
                                        explicit: episode?.explicit ? true : false,
                                        visibility: episode?.visibility ? episode?.visibility : "",
                                        shares: [],
                                        publish_later_at: "",
                                        status: episode?.status ? episode?.status : "",
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        handleUploadEpisode(values, setSubmitting)
                                    }}
                                >
                                    {({ isSubmitting, values, errors, handleChange, handleBlur, setFieldValue }) => (
                                        <Form>
                                            <div>
                                                <div className="space-y-8">
                                                    <div className="flex">
                                                        <div className="w-8/12">
                                                            <label htmlFor="episode-title" className="text-sm font-medium">
                                                                Episode Title
                                                            </label>
                                                            <Field type="text" name="title" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="title" component={"div"} className="text-red-600 text-sm text-left" />

                                                            <div className="text-xs text-[#D0D5DD] mt-1">
                                                                Learn how to write a catchy episode title.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-8/12">
                                                            <label htmlFor="password" className="text-sm font-medium">
                                                                Permalink
                                                            </label>
                                                            <div className="flex items-center gap-4">

                                                                <Input className="!bg-[#202939] !text-[#F2F4F7] !border-none" value={episode?.content_url} name="email" placeholder="www.wokpa.com/emax-podcast" />
                                                                <div className="w-[92px] h-9 px-3.5 py-2 bg-[#E1E8EC] rounded-3xl border border-[#D0D5DD] justify-center items-center gap-2 inline-flex">
                                                                    <div>
                                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <g clipPath="url(#clip0_2775_50142)">
                                                                                <path d="M4.16699 12.5001C3.39042 12.5001 3.00214 12.5001 2.69585 12.3732C2.28747 12.2041 1.96302 11.8796 1.79386 11.4712C1.66699 11.1649 1.66699 10.7767 1.66699 10.0001V4.33341C1.66699 3.39999 1.66699 2.93328 1.84865 2.57676C2.00844 2.26316 2.2634 2.00819 2.57701 1.8484C2.93353 1.66675 3.40024 1.66675 4.33366 1.66675H10.0003C10.7769 1.66675 11.1652 1.66675 11.4715 1.79362C11.8798 1.96277 12.2043 2.28723 12.3735 2.69561C12.5003 3.00189 12.5003 3.39018 12.5003 4.16675M10.167 18.3334H15.667C16.6004 18.3334 17.0671 18.3334 17.4236 18.1518C17.7372 17.992 17.9922 17.737 18.152 17.4234C18.3337 17.0669 18.3337 16.6002 18.3337 15.6667V10.1667C18.3337 9.23333 18.3337 8.76662 18.152 8.4101C17.9922 8.09649 17.7372 7.84153 17.4236 7.68174C17.0671 7.50008 16.6004 7.50008 15.667 7.50008H10.167C9.23357 7.50008 8.76686 7.50008 8.41034 7.68174C8.09674 7.84153 7.84177 8.09649 7.68198 8.4101C7.50033 8.76662 7.50033 9.23333 7.50033 10.1667V15.6667C7.50033 16.6002 7.50033 17.0669 7.68198 17.4234C7.84177 17.737 8.09674 17.992 8.41034 18.1518C8.76686 18.3334 9.23357 18.3334 10.167 18.3334Z" stroke="#063150" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </g>
                                                                            <defs>
                                                                                <clipPath id="clip0_2775_50142">
                                                                                    <rect width="20" height="20" fill="white" />
                                                                                </clipPath>
                                                                            </defs>
                                                                        </svg>
                                                                    </div>
                                                                    <div className="text-[#063150] text-[14px] font-semibold font-inter cursor-pointer">
                                                                        <CopyToClipboard text={episode?.content_url}
                                                                            onCopy={() => toast("Link copied!", { type: "success" })}>
                                                                            <button type="button">
                                                                                Copy
                                                                            </button>
                                                                        </CopyToClipboard>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="flex gap-5">
                                                        <div className="flex-1">
                                                            <label htmlFor="season" className="text-sm font-medium">
                                                                Season number
                                                            </label>
                                                            <Field type="number" name="season" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="season" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="number" className="text-sm font-medium">
                                                                Episode number
                                                            </label>
                                                            <Field type="number" name="number" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="number" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="episode-type" className="text-sm font-medium">
                                                                Episode type
                                                            </label>
                                                            <Field as="select" type="text" name="type" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                                                <option value="">Select episode type</option>
                                                                <option value="FULL">FULL</option>
                                                                <option value="TRAILER">TRAILER</option>
                                                                <option value="BONUE">BONUS</option>
                                                            </Field>
                                                            <ErrorMessage name="type" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="py-8">
                                                    <hr className="border-slate-600" />
                                                </div>
                                                <div className="space-y-8 mt-6">
                                                    <div className="font-medium">
                                                        Additional Settings
                                                    </div>

                                                    <div>
                                                        <div className="font-medium text-sm mb-4">
                                                            Visibility
                                                        </div>

                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-1">
                                                                <Field value={"PUBLIC"} type="radio" name="visibility" />
                                                                <span className="text-sm">Public (can be listened to by anyone)</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Field value={"PRIVATE"} type="radio" name="visibility" />
                                                                <span className="text-sm">Private (can't be listened to by anyone)</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Field value={"LIMITED"} type="radio" name="visibility" />
                                                                <span className="text-sm">Limited Access (allows creating Paid subscription)</span>
                                                            </div>
                                                            <ErrorMessage name="visibility" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                        <div className="w-[348px] py-4">
                                                            <div className="text-center">
                                                                <div className="font-medium text-sm">
                                                                    Picture
                                                                </div>

                                                                {

                                                                    <div className="text-center">
                                                                        {
                                                                            !editedImageURL ? <>
                                                                                {episode?.picture_url && !filesContent.length ?
                                                                                    <div>
                                                                                        <img className="max-w-[150px] rounded-lg inline" src={episode?.picture_url}></img>
                                                                                    </div> :
                                                                                    <>
                                                                                        {
                                                                                            filesContent.length ?
                                                                                                <>
                                                                                                    {filesContent.map((file, index) => (
                                                                                                        <div key={index}>
                                                                                                            <img className="max-w-[150px] rounded-lg inline" alt={file.name} src={file.content}></img>
                                                                                                            <br />
                                                                                                        </div>
                                                                                                    ))}

                                                                                                </>
                                                                                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 inline">
                                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                                                                </svg>
                                                                                        }
                                                                                    </>
                                                                                }
                                                                            </> :
                                                                                <div>
                                                                                    <img className="max-w-[150px] rounded-lg inline" src={editedImageURL} />
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                }

                                                                <div className="text-xs text-[#EAECF0] px-6 mt-4">
                                                                    We recommend uploading an artwork of at least 1400x1400 pixels and maximum 5MB. We support jpg, png, gif and tiff formats.
                                                                </div>
                                                                <div className="mt-4 space-x-4">
                                                                    {
                                                                        episode?.picture_url && <button type="button" onClick={() => setShowEditModal(true)} className="bg-[#F9F5FF] rounded-full py-2 px-12 text-sm font-semibold text-[#042946]">
                                                                            Edit
                                                                        </button>
                                                                    }

                                                                    <button type="button" onClick={() => imagePicker()} className="bg-[#25AEA4] rounded-full py-2 px-4 text-sm font-semibold text-white">
                                                                        Upload image
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-5">
                                                        <div className="md:w-6/12">
                                                            <label htmlFor="password" className="text-sm font-medium">
                                                                Description
                                                            </label>

                                                            <Field as="textarea" rows={8} type="text" name="description" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <div className="text-xs text-[#D0D5DD] mt-1">
                                                                Listeners want to know what your podcast is about before they tune in. Hook them in with a persuasive description that quickly sums up what the main concept and structure of your podcast is.
                                                            </div>
                                                            <ErrorMessage name="description" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                    </div>

                                                    <div className="flex">
                                                        <div className="w-8/12">
                                                            <label htmlFor="password" className="text-sm font-medium">
                                                                Tags
                                                            </label>

                                                            <div className="p-3 rounded-lg border border-gray-500 bg-white">
                                                                <div className="flex items-center gap-1 flex-wrap w-full">
                                                                    {
                                                                        tags.map((item, index) => (
                                                                            <Tag
                                                                                key={index}
                                                                                onClose={() => removeTag(item)}>
                                                                                {item}
                                                                            </Tag>
                                                                        ))
                                                                    }
                                                                    <input type="text"
                                                                        value={inputValue}
                                                                        onChange={(e) => {
                                                                            if (e.target.value && e.target.value.includes(',')) {
                                                                                addTag()
                                                                                setInputValue("");
                                                                                return;
                                                                            }
                                                                            setInputValue(e.target.value);
                                                                        }}
                                                                        onBlur={addTag}
                                                                        className="!focus:outline-none f!ocus:border-none bg-transparent p-0 text-[#101828] placeholder:text-[#101828] outline-0 border-0 md:w-[400px]"
                                                                        placeholder="Add a tag by adding a comma at the end of each word" />
                                                                </div>
                                                            </div>

                                                            <div className="text-xs text-[#D0D5DD] mt-1">
                                                                Max 20 tags (30 chars per tag limit)
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-5">
                                                        <div className="md:w-6/12">
                                                            <label htmlFor="password" className="text-sm font-medium">
                                                                Transcript type
                                                            </label>
                                                            <Field as="select" type="text" name="transcript_type" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                                                <option value="">Select transcript type</option>
                                                                <option value="TEXT">TEXT</option>
                                                                <option value="HTML">HTML</option>
                                                                <option value="SRT">SRT</option>
                                                                <option value="VTT">VTT</option>

                                                            </Field>
                                                            <ErrorMessage name="transcript_type" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                        <div className="md:w-6/12">
                                                            <label htmlFor="email" className="text-sm font-medium">
                                                                Transcript URL
                                                            </label>
                                                            <Field type="text" name="transcript_url" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                            <ErrorMessage name="transcript_url" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-5">
                                                        <div className="md:w-6/12">
                                                            <label htmlFor="password" className="text-lg font-medium">
                                                                Automatic shares
                                                            </label>
                                                            <div className="text-sm font-medium mt-4">
                                                                Enable this option if your recording contains explicit content. This <br /> information is also exported to your RSS / iTunes feeds.
                                                            </div>
                                                            <div className="flex gap-10">
                                                                <div className="flex gap-4 items-center">
                                                                    <Field type="checkbox" name="shares" value="whatsapp" id="whatsapp" />
                                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g>
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0" />
                                                                            <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_5831_19683)" />
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white" />
                                                                            <path d="M12.5 9.50038C12.1672 8.8318 11.6565 8.89099 11.1407 8.89099C10.2188 8.89099 8.78125 9.99527 8.78125 12.0504C8.78125 13.7348 9.52345 15.5785 12.0244 18.3366C14.438 20.9984 17.6094 22.3753 20.2422 22.3284C22.875 22.2816 23.4167 20.0159 23.4167 19.2508C23.4167 18.9117 23.2062 18.7425 23.0613 18.6965C22.1641 18.2659 20.5093 17.4636 20.1328 17.3129C19.7563 17.1622 19.5597 17.366 19.4375 17.477C19.0961 17.8023 18.4193 18.7613 18.1875 18.977C17.9558 19.1926 17.6103 19.0835 17.4665 19.0019C16.9374 18.7896 15.5029 18.1516 14.3595 17.0431C12.9453 15.6723 12.8623 15.2006 12.5959 14.7808C12.3828 14.4449 12.5392 14.2389 12.6172 14.1488C12.9219 13.7973 13.3426 13.2545 13.5313 12.9848C13.7199 12.715 13.5702 12.3055 13.4803 12.0504C13.0938 10.9535 12.7663 10.0352 12.5 9.50038Z" fill="white" />
                                                                        </g>
                                                                        <defs>
                                                                            <linearGradient id="paint0_linear_5831_19683" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
                                                                                <stop stop-color="#5BD066" />
                                                                                <stop offset="1" stop-color="#27B43E" />
                                                                            </linearGradient>
                                                                        </defs>
                                                                    </svg>


                                                                </div>
                                                                <div className="flex gap-4 items-center">
                                                                    <Field type="checkbox" name="shares" value="telegram" id="telegram" />
                                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g >
                                                                            <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_5831_19691)" />
                                                                            <path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white" />
                                                                        </g>
                                                                        <defs>
                                                                            <linearGradient id="paint0_linear_5831_19691" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
                                                                                <stop stop-color="#37BBFE" />
                                                                                <stop offset="1" stop-color="#007DBB" />
                                                                            </linearGradient>
                                                                        </defs>
                                                                    </svg>

                                                                </div>
                                                                <div className="flex gap-4 items-center">
                                                                    <Field type="checkbox" name="shares" value="facebook" id="facebook" />
                                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_5831_19697)">
                                                                            <path d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 23.9859 5.85094 30.6053 13.5 31.8056V20.625H9.4375V16H13.5V12.475C13.5 8.465 15.8888 6.25 19.5434 6.25C21.2934 6.25 23.125 6.5625 23.125 6.5625V10.5H21.1075C19.12 10.5 18.5 11.7334 18.5 13V16H22.9375L22.2281 20.625H18.5V31.8056C26.1491 30.6053 32 23.9859 32 16Z" fill="#1877F2" />
                                                                            <path d="M22.2281 20.625L22.9375 16H18.5V13C18.5 11.7347 19.12 10.5 21.1075 10.5H23.125V6.5625C23.125 6.5625 21.2941 6.25 19.5434 6.25C15.8888 6.25 13.5 8.465 13.5 12.475V16H9.4375V20.625H13.5V31.8056C15.1566 32.0648 16.8434 32.0648 18.5 31.8056V20.625H22.2281Z" fill="white" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_5831_19697">
                                                                                <rect width="32" height="32" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <ErrorMessage name="transcript_type" component={"div"} className="text-red-600 text-sm text-left" />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-5">
                                                        <div className="md:w-6/12">
                                                            <label htmlFor="password" className="text-lg font-medium">
                                                                Explicit content
                                                            </label>
                                                            <div className="flex  gap-2 mt-4">
                                                                <Switch
                                                                    checked={Boolean(values.explicit)}
                                                                    onChange={(val) => { setFieldValue("explicit", val) }}
                                                                    className={`${values.explicit ? 'bg-[#21A79C]' : 'bg-[#F2F4F7]'} relative inline-flex h-[18.5px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                                >
                                                                    <span className="sr-only">Use setting</span>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className={`${values.explicit ? 'translate-x-[0.82rem]' : 'translate-x-0'} pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white border-slate-600 border shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                                    />
                                                                </Switch>
                                                                <div className="text-sm font-medium">
                                                                    Enable this option if your recording contains explicit content. This <br /> information is also exported to your RSS / iTunes feeds.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-5">
                                                        <div className="md:w-6/12">
                                                            <label htmlFor="password" className="text-lg font-medium">
                                                                Publish later
                                                            </label>
                                                            <div className="flex  gap-2 mt-4">
                                                                <Switch
                                                                    checked={publishLater}
                                                                    onChange={setPublishLater}
                                                                    className={`${publishLater ? 'bg-[#21A79C]' : 'bg-[#F2F4F7]'} relative inline-flex h-[18.5px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                                >
                                                                    <span className="sr-only">Use setting</span>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className={`${publishLater ? 'translate-x-[0.82rem]' : 'translate-x-0'} pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white border-slate-600 border shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                                    />
                                                                </Switch>
                                                                <div className="text-sm font-medium">
                                                                    Enable this option if you want this episode automatically published on a specific date and time.
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {publishLater && <div className="flex gap-5">
                                                        <div className="md:w-6/12">
                                                            <div className="text-lg font-medium">
                                                                Date
                                                            </div>
                                                            <Datetime
                                                                className="w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500"
                                                                value={values.publish_later_at}
                                                                onChange={(m) => { setFieldValue("publish_later_at", m) }}
                                                            />

                                                        </div>
                                                    </div>}
                                                </div>

                                                <div className="text-right space-x-4">
                                                    <Link href="/podcast/create-podcast">
                                                        <Button type="button" className="!text-sm  !from-transparent !to-transparent !text-white border font-semibold">
                                                            Update episode
                                                        </Button>
                                                    </Link>
                                                    <Button type="submit" className="!text-sm !from-white !to-white !text-[#063150] font-semibold">
                                                        {
                                                            isSubmitting ?
                                                                <svg className="w-5 h-5" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                                                </svg> : "Save as draft"
                                                        }

                                                    </Button>
                                                    {
                                                        episode.status.toLowerCase() == "unpublished" ? <Button type="submit" className="!text-sm">
                                                            {
                                                                isSubmitting ?
                                                                    <svg className="w-5 h-5" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                                                    </svg> : "Publish now"
                                                            }

                                                        </Button> : <></>
                                                    }

                                                </div>
                                            </div>
                                        </Form>)}
                                </Formik>}
                            </div>
                        </div>

                    </Tab.Panel>
                    <Tab.Panel>Content 2</Tab.Panel>
                    <Tab.Panel>Content 2</Tab.Panel>
                    <Tab.Panel>
                        {
                            episode &&
                            <ReplaceAudioTab episode={episode} />
                        }
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

        </div >
    )
}

export default EditEpisodePage
