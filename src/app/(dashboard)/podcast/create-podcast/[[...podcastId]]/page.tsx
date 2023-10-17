"use client";

import { getPodcastCategories } from "@/app/api/general";
import { createPodcast, getPodcastsById, updatePodcast } from "@/app/api/publishers";
import Button from "@/components/button";
import Input from "@/components/input";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { PodcastCategoryModel } from "@/models/category";
import { PodcastModel } from "@/models/podcast";
import { Switch } from "@headlessui/react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Tag } from "@/app/(dashboard)/components/Tag";

const CreatePodcastPage = ({ params }: { params: { podcastId: string[] } }) => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [categories, setCategories] = useState<PodcastCategoryModel[]>([]);
    const [podcast, setPodcast] = useState<PodcastModel | null>(null);
    const [enableTips, setEnableTips] = useState(false);
    const [isExplicit, setIsExplicit] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("This field is required"),
        language: Yup.string().required("This field is required"),
        podcast_category: Yup.string().required("This field is required"),
        description: Yup.string().required("This field is required"),
        email: Yup.string().email("Invalid email").required("This field is required"),
    });

    const [imagePicker, { filesContent, plainFiles, clear, }] = useFilePicker({
        readAs: 'DataURL',
        accept: ['image/*', "pdf"],
        multiple: false,
        limitFilesConfig: { max: 1 },
        maxFileSize: 1,
    });

    const [coverImagePicker, { filesContent: coverImageContent, plainFiles: coverImageFiles, clear: clearCoverImage, }] = useFilePicker({
        readAs: 'DataURL',
        accept: ['image/*', "pdf"],
        multiple: false,
        limitFilesConfig: { max: 1 },
        maxFileSize: 1,
    });

    const handleCreatePodcast = async (values: any, setSubmitting: (val: boolean) => void) => {
        try {
            setSubmitting(true);

            const data = {
                ...values,
                category_name: categories.find(val => val.id == values.podcast_category)?.name,
                category_type: categories.find(val => val.id == values.podcast_category)?.type,
                picture: plainFiles[0] as any,
                cover_picture: coverImageFiles[0] as any,
                tags,
                tips_and_donations_activated: enableTips,
                explicit: isExplicit
            };

            const response = isEdit ? await updatePodcast(params.podcastId[0], data) : await createPodcast(data);
            toast(response.data.message, { type: "success" });
            router.push("/dashboard")
            setSubmitting(false);

        } catch (error: any) {
            setSubmitting(false);
            if (error.response) {
                toast(error.response.data.message, { type: "error" });
            }
            console.log(error)
        }
    }

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
                let response = await getPodcastCategories();
                setCategories(response.data.data);

                if (params.podcastId.length) {
                    setIsEdit(true);
                    response = await getPodcastsById(params.podcastId[0]);
                    setPodcast(response.data.data)
                }


            } catch (error) {
            }
        })()
    }, [])

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
                    <div className="text-sm font-medium text-[#66C6BF]">

                        {isEdit ? "Update Podcast" : "Create a new podcast"}
                    </div>

                </div>
            </div>
            <div className="mt-8">
                <div className="pr-5">
                    <div className={`font-bold text-3xl pb-2 font-raleway`}>
                        {isEdit ? "Update Podcast" : "Create Podcast"}
                    </div>
                    <div className="mt-2">
                        <span className="inline-flex items-center gap-4 rounded-xl py-2 px-6 bg-blue-100">
                            <div>
                                <svg width="22" height="36" viewBox="0 0 22 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0835 13.4163H11.9168V15.2497H10.0835V13.4163ZM10.0835 17.083H11.9168V22.583H10.0835V17.083ZM11.0002 8.83301C5.94016 8.83301 1.8335 12.9397 1.8335 17.9997C1.8335 23.0597 5.94016 27.1663 11.0002 27.1663C16.0602 27.1663 20.1668 23.0597 20.1668 17.9997C20.1668 12.9397 16.0602 8.83301 11.0002 8.83301ZM11.0002 25.333C6.95766 25.333 3.66683 22.0422 3.66683 17.9997C3.66683 13.9572 6.95766 10.6663 11.0002 10.6663C15.0427 10.6663 18.3335 13.9572 18.3335 17.9997C18.3335 22.0422 15.0427 25.333 11.0002 25.333Z" fill="#2196F3" />
                                </svg>
                            </div>
                            <div className="text-sm text-indigo-900">
                                By creating content on Wokpa, you adhere to our <a href="" className="font-semibold underline"> Community rules</a>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="mt-8">
                    {podcast ?
                        <Formik
                            initialValues={{
                                title: podcast?.title,
                                language: podcast?.language,
                                podcast_category: podcast?.category_name,
                                description: podcast?.description,
                                
                                email: podcast?.email,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                handleCreatePodcast(values, setSubmitting)
                            }}
                        >
                            {({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
                                <Form>
                                    <div>
                                        <div className="space-y-8">
                                            <div className="flex">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Podcast Title*
                                                    </label>
                                                    <Field type="text" name="title" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                    <ErrorMessage name="title" component={"div"} className="text-red-600 text-sm text-left" />

                                                    <div className="text-xs text-[#D0D5DD] mt-1">
                                                        Learn how to write a professional podcast title.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Language
                                                    </label>
                                                    <Field as="select" type="text" name="language" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                                        <option value="">Select preferred language</option>
                                                        <option value="English">English</option>
                                                        <option value="Yoruba">Yoruba</option>
                                                        <option value="Igbo">Igbo</option>
                                                        <option value="Hausa">Hausa</option>


                                                    </Field>
                                                    <ErrorMessage name="language" component={"div"} className="text-red-600 text-sm text-left" />

                                                </div>
                                                <div className="md:w-6/12">
                                                    <label htmlFor="email" className="text-sm font-medium">
                                                        Category
                                                    </label>
                                                    <Field as="select" type="text" name="podcast_category" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                                        <option value="">Select a category</option>
                                                        {
                                                            categories.map((category) => {
                                                                return (
                                                                    <option value={category.id}>{category.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="podcast_category" component={"div"} className="text-red-600 text-sm text-left" />

                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="flex-1">
                                                    <div className="font-medium">
                                                        Picture
                                                    </div>
                                                    <div className="w-[348px] py-4">
                                                        <div className="text-center">
                                                            {
                                                                filesContent.length ?
                                                                    <>
                                                                        {filesContent.map((file, index) => (
                                                                            <div key={index}>
                                                                                <img className="max-w-sm" alt={file.name} src={file.content}></img>
                                                                                <br />
                                                                            </div>
                                                                        ))}

                                                                    </>
                                                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 inline">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                                    </svg>
                                                            }

                                                            <div className="text-xs text-[#EAECF0] px-6">
                                                                We recommend uploading an artwork of at least 1400x1400 pixels and maximum 5MB. We support jpg, png, gif and tiff formats.
                                                            </div>
                                                            <div className="mt-4">
                                                                <button type="button" onClick={() => imagePicker()} className="bg-[#F9F5FF] rounded-full py-2 px-4 text-sm font-semibold text-[#042946]">
                                                                    Upload image
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">
                                                        Cover Image
                                                    </div>
                                                    <div className="w-[348px] py-4">
                                                        <div className="text-center">
                                                            {
                                                                coverImageContent.length ?
                                                                    <>
                                                                        {coverImageContent.map((file, index) => (
                                                                            <div key={index}>
                                                                                <img className="max-w-sm" alt={file.name} src={file.content}></img>
                                                                                <br />
                                                                            </div>
                                                                        ))}

                                                                    </>
                                                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 inline">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                                    </svg>
                                                            }

                                                            <div className="text-xs text-[#EAECF0] px-6">
                                                                Adding a cover image is a great way to enhance your podcast page. Become a Pro user to upload one now.
                                                            </div>
                                                            <div className="mt-4">
                                                                <button type="button" onClick={() => coverImagePicker()} className="bg-[#F9F5FF] rounded-full py-2 px-4 text-sm font-semibold text-[#042946]">
                                                                    Upload image
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Description
                                                    </label>
                                                    <Field as="textarea" rows={8} name="description" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500 `} />
                                                    <ErrorMessage name="description" component={"div"} className="text-red-600 text-sm text-left" />

                                                    <div className="text-xs text-[#D0D5DD] mt-1">
                                                        Listeners want to know what your podcast is about before they tune in. Hook them in with a persuasive description that quickly sums up what the main concept and structure of your podcast is.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Tips
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            checked={enableTips}
                                                            onChange={(val) => { setEnableTips(val) }}
                                                            className={`${enableTips ? 'bg-[#21A79C]' : 'bg-slate-600'} relative inline-flex h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                        >
                                                            <span className="sr-only">Use setting</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={`${enableTips ? 'translate-x-[0.82rem]' : 'translate-x-0'} pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                            />
                                                        </Switch>
                                                        <div className="text-sm font-medium">
                                                            Activate tips and donations
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                         

                                            <div className="flex">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="email" className="text-sm font-medium">
                                                        Email
                                                    </label>
                                                    <Field type="text" name="email" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                    <ErrorMessage name="email" component={"div"} className="text-red-600 text-sm text-left" />
                                                    <div className="text-xs text-[#D0D5DD] mt-1">
                                                        By adding your email address here, it will be displayed on your podcast page and RSS feed. This email address allows you to confirm the ownership into platforms like Spotify and Google Podcasts.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="md:w-8/12">
                                                    <label htmlFor="tags" className="text-sm font-medium">
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
                                                                className="focus:outline-0 focus:border-0 text-sm p-0 text-gray-500 outline-0 border-0 w-64"
                                                                placeholder="Add a tag with comma" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Explicit
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            checked={isExplicit}
                                                            onChange={(val) => { setIsExplicit(val) }}
                                                            className={`${isExplicit ? 'bg-[#21A79C]' : 'bg-slate-600'} relative inline-flex h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                        >
                                                            <span className="sr-only">Use setting</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={`${isExplicit ? 'translate-x-[0.82rem]' : 'translate-x-0'} pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                            />
                                                        </Switch>
                                                        <div className="text-sm font-medium">
                                                            If Episodes has explicit content
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-1 text-right">
                                                <Button type="submit" className="py-2 text-sm font-medium">
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
                                                            </svg> : "Create new podcast"
                                                    }

                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>)}
                        </Formik>
                        :
                        <Formik
                            initialValues={{
                                title: "",
                                language: "",
                                podcast_category: "",
                                description: "",
                                email: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                handleCreatePodcast(values, setSubmitting)
                            }}
                        >
                            {({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
                                <Form>
                                    <div>
                                        <div className="space-y-8">
                                            <div className="flex">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Podcast Title*
                                                    </label>
                                                    <Field type="text" name="title" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                    <ErrorMessage name="title" component={"div"} className="text-red-600 text-sm text-left" />

                                                    <div className="text-xs text-[#D0D5DD] mt-1">
                                                        Learn how to write a professional podcast title.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Language
                                                    </label>
                                                    <Field as="select" type="text" name="language" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                                        <option value="">Select preferred language</option>
                                                        <option value="English">English</option>
                                                        <option value="Yoruba">Yoruba</option>
                                                        <option value="Igbo">Igbo</option>
                                                        <option value="Hausa">Hausa</option>


                                                    </Field>
                                                    <ErrorMessage name="language" component={"div"} className="text-red-600 text-sm text-left" />

                                                </div>
                                                <div className="md:w-6/12">
                                                    <label htmlFor="email" className="text-sm font-medium">
                                                        Category
                                                    </label>
                                                    <Field as="select" type="text" name="podcast_category" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                                        <option value="">Select a category</option>
                                                        {
                                                            categories.map((category) => {
                                                                return (
                                                                    <option value={category.id}>{category.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </Field>
                                                    <ErrorMessage name="podcast_category" component={"div"} className="text-red-600 text-sm text-left" />

                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="flex-1">
                                                    <div className="font-medium">
                                                        Picture
                                                    </div>
                                                    <div className="w-[348px] py-4">
                                                        <div className="text-center">
                                                            {
                                                                filesContent.length ?
                                                                    <>
                                                                        {filesContent.map((file, index) => (
                                                                            <div key={index}>
                                                                                <img className="max-w-sm" alt={file.name} src={file.content}></img>
                                                                                <br />
                                                                            </div>
                                                                        ))}

                                                                    </>
                                                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 inline">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                                    </svg>
                                                            }

                                                            <div className="text-xs text-[#EAECF0] px-6">
                                                                We recommend uploading an artwork of at least 1400x1400 pixels and maximum 5MB. We support jpg, png, gif and tiff formats.
                                                            </div>
                                                            <div className="mt-4">
                                                                <button type="button" onClick={() => imagePicker()} className="bg-[#F9F5FF] rounded-full py-2 px-4 text-sm font-semibold text-[#042946]">
                                                                    Upload image
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">
                                                        Cover Image
                                                    </div>
                                                    <div className="w-[348px] py-4">
                                                        <div className="text-center">
                                                            {
                                                                coverImageContent.length ?
                                                                    <>
                                                                        {coverImageContent.map((file, index) => (
                                                                            <div key={index}>
                                                                                <img className="max-w-sm" alt={file.name} src={file.content}></img>
                                                                                <br />
                                                                            </div>
                                                                        ))}

                                                                    </>
                                                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 inline">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                                    </svg>
                                                            }

                                                            <div className="text-xs text-[#EAECF0] px-6">
                                                                Adding a cover image is a great way to enhance your podcast page. Become a Pro user to upload one now.
                                                            </div>
                                                            <div className="mt-4">
                                                                <button type="button" onClick={() => coverImagePicker()} className="bg-[#F9F5FF] rounded-full py-2 px-4 text-sm font-semibold text-[#042946]">
                                                                    Upload image
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Description
                                                    </label>
                                                    <Field as="textarea" rows={8} name="description" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500 `} />
                                                    <ErrorMessage name="description" component={"div"} className="text-red-600 text-sm text-left" />

                                                    <div className="text-xs text-[#D0D5DD] mt-1">
                                                        Listeners want to know what your podcast is about before they tune in. Hook them in with a persuasive description that quickly sums up what the main concept and structure of your podcast is.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Tips
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            checked={enableTips}
                                                            onChange={(val) => { setEnableTips(val) }}
                                                            className={`${enableTips ? 'bg-[#21A79C]' : 'bg-slate-600'} relative inline-flex h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                        >
                                                            <span className="sr-only">Use setting</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={`${enableTips ? 'translate-x-[0.82rem]' : 'translate-x-0'} pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                            />
                                                        </Switch>
                                                        <div className="text-sm font-medium">
                                                            Activate tips and donations
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="email" className="text-sm font-medium">
                                                        Email
                                                    </label>
                                                    <Field type="text" name="email" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                                                    <ErrorMessage name="email" component={"div"} className="text-red-600 text-sm text-left" />
                                                    <div className="text-xs text-[#D0D5DD] mt-1">
                                                        By adding your email address here, it will be displayed on your podcast page and RSS feed. This email address allows you to confirm the ownership into platforms like Spotify and Google Podcasts.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="tags" className="text-sm font-medium">
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
                                                                className="focus:outline-0 focus:border-0 text-sm p-0 text-gray-500 outline-0 border-0 w-64"
                                                                placeholder="Add a tag with comma" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-5">
                                                <div className="md:w-6/12">
                                                    <label htmlFor="password" className="text-sm font-medium">
                                                        Explicit
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            checked={isExplicit}
                                                            onChange={(val) => { setIsExplicit(val) }}
                                                            className={`${isExplicit ? 'bg-[#21A79C]' : 'bg-slate-600'} relative inline-flex h-[18px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                                                        >
                                                            <span className="sr-only">Use setting</span>
                                                            <span
                                                                aria-hidden="true"
                                                                className={`${isExplicit ? 'translate-x-[0.82rem]' : 'translate-x-0'} pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                            />
                                                        </Switch>
                                                        <div className="text-sm font-medium">
                                                            If Episodes has explicit content
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-1 text-right">
                                                <Button type="submit" className="py-2 text-sm font-medium">
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
                                                            </svg> : "Create new podcast"
                                                    }

                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>)}
                        </Formik>}
                </div>
            </div>
        </div >
    )
}

export default CreatePodcastPage
