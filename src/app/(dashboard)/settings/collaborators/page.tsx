"use client";

import { getProfile } from "@/app/api/auth";
import { createCollaborators, deleteCollaborators, getCollaborators, updateCollaborators } from "@/app/api/publishers";
import Button from "@/components/button";
import Modal from "@/components/modal";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { CollaboratorModel } from "@/models/collaborators";
import { updateUser } from "@/redux/auth";
import { APICall } from "@/utils";
import { useState, useEffect } from "react";


const CollaboratorsTable: React.FC<{ collaborators: CollaboratorModel[], onCreateCollaborator: () => void, update: () => void }> = ({ collaborators, onCreateCollaborator }) => {
    const [viewMode, setViewMode] = useState<"list" | "card">("list");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [selectedCollaborator, setSelectedCollaborator] = useState<CollaboratorModel | null>(null);

    const [collaboratorField, setCollaboratorField] = useState<{ name: string, email: string, role: string }>({ name: "", email: "", role: "HOST" })


    const handleEditCollaborator = async () => {
        try {
            setLoading(true);
            const resposne = await APICall(updateCollaborators, [selectedCollaborator?.id, {
                first_name: collaboratorField.name.split(" ")[0],
                last_name: collaboratorField.name.split(" ")[1],
                email: collaboratorField.email,
                role: collaboratorField.role
            }], true);
            getCollaborators();
            setShowEditModal(false);
            setLoading(false);

        } catch (error) {
            setLoading(false);

        }
    }

    const handleDeleteCollaborator = async () => {
        try {
            setLoading(true);
            const resposne = await APICall(deleteCollaborators, selectedCollaborator?.id, true)
            getCollaborators();
            setShowDeleteModal(false);
            setLoading(false);

        } catch (error) {
            setLoading(false);

        }
    }

    return (
        <div className="mt-4">
            <Modal size="md" open={showEditModal} onClose={(val) => setShowEditModal(val)}>
                <div className="border-b text-center text-2xl font-raleway font-bold py-5">
                    Edit collaborator
                </div>
                <div className="py-10 text-center">
                    <div className="px-6">
                        <div className="flex gap-3 items-center">
                            <div className="flex-1 text-left">
                                <label htmlFor="name" className="text-sm">
                                    Name
                                </label>
                                <input onChange={(e) => setCollaboratorField({ ...collaboratorField, name: e.target.value })} value={collaboratorField.name} name="name" placeholder="Enter full name" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                            </div>

                            <div className="flex-1 text-left">
                                <label htmlFor="email" className="text-sm">
                                    Email
                                </label>
                                <input onChange={(e) => setCollaboratorField({ ...collaboratorField, email: e.target.value })} value={collaboratorField.email} name="email" placeholder="Enter your email" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                            </div>

                            <div className="flex-1 text-left">
                                <label htmlFor="role" className="text-sm">
                                    Assign Role
                                </label>
                                <select onChange={(e) => setCollaboratorField({ ...collaboratorField, role: e.target.value })} value={collaboratorField.role} name="email" placeholder="olivia@gmail.com" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                    <option value={"host"}>HOST</option>
                                    <option value={"producer"}>PRODUCER</option>
                                    <option value={"editor"}>EDITOR</option>
                                    <option value={"advertiser"}>ADVERTISER</option>
                                    <option value={"owner"}>OWNER</option>
                                </select>
                            </div>


                        </div>
                    </div>
                    <div className="mt-8 space-y-4 w-4/12 mx-auto">

                    </div>
                    <div className="mt-8 space-y-4 w-5/12 mx-auto">
                        <div>
                            <Button onClick={handleEditCollaborator} className="w-full !text-sm !py-[0.63rem] text-center">
                                {loading ? <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                </svg> :
                                    "Update"}
                            </Button>
                        </div>
                        <div>
                            <Button onClick={() => setShowEditModal(false)} className="w-full !from-white !to-white !text-[#063150] !py-[0.63rem] text-center">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal size="sm" open={showDeleteModal} onClose={(val) => setShowDeleteModal(val)}>
                <div className="text-center text-2xl font-raleway font-bold py-5">
                    Delete this collaborator
                </div>
                <div className="py-4 text-center">
                    <div className="">
                        <Button onClick={handleDeleteCollaborator} className="!text-sm !py-[0.63rem] text-center">
                            {loading ? <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                            </svg> :
                                "Continue"}
                        </Button>
                    </div>
                </div>
            </Modal>
            <div className="mt-8">
                <div>
                    <div className="overflow-x-auto mt-8 md:h-auto h-96 rounded-lg">
                        <table className="border-collapse table-auto w-full whitespace-nowrap">
                            <thead className="bg-[#101828] rounded-t-lg text-base  text-white text-left border-none">
                                <tr>
                                    <th className="py-4 pl-10 font-medium text-xs">Name</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Role</th>
                                    <th className="py-4 pl-6 font-medium text-xs">Email address</th>
                                    <th className="py-4 pl-6 font-medium text-xs"></th>
                                </tr>
                            </thead>
                            {
                                !collaborators.length ? <div className="text-center py-12">
                                    <svg className='inline' width="201" height="200" viewBox="0 0 201 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" width="200" height="200" rx="100" fill="url(#paint0_linear_3977_49889)" />
                                        <path d="M126.094 130C137.811 122.075 145.5 108.89 145.5 93.9248C145.5 69.6665 125.352 50 100.5 50C75.6479 50 55.5 69.6665 55.5 93.9248C55.5 108.89 63.1885 122.075 74.9056 130M82.2983 110C78.0937 105.75 75.5 100.043 75.5 93.7527C75.5 80.6355 86.694 70 100.5 70C114.306 70 125.5 80.6355 125.5 93.7527C125.5 100.048 122.906 105.75 118.702 110M100.5 150C94.9772 150 90.5 145.523 90.5 140V130C90.5 124.477 94.9772 120 100.5 120C106.023 120 110.5 124.477 110.5 130V140C110.5 145.523 106.023 150 100.5 150ZM105.5 95C105.5 97.7614 103.261 100 100.5 100C97.7386 100 95.5 97.7614 95.5 95C95.5 92.2386 97.7386 90 100.5 90C103.261 90 105.5 92.2386 105.5 95Z" stroke="#BEE7E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <defs>
                                            <linearGradient id="paint0_linear_3977_49889" x1="0.5" y1="0" x2="200.5" y2="-2.08482e-08" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#475467" />
                                                <stop offset="1" stop-color="#667085" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="text-lg font-medium mt-4">
                                        Create a collaborator
                                    </div>
                                    <div className="mt-4">
                                        <Button onClick={() => onCreateCollaborator()} className='text-sm'>Create new podcast</Button>
                                    </div>
                                </div> :
                                    <tbody className="bg-[#141414]">
                                        {
                                            collaborators.map((collaborator) => {
                                                return <tr>
                                                    <td className="py-4 border-b pl-10 text-xs font-medium border-t border-[#667085]">
                                                        <div className="">
                                                            <input className="rounded-md border-[#D0D5DD] bg-white" type="checkbox" name="" id="" />
                                                            <div className="inline-flex items-center gap-2 ml-2">
                                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                                                    <div className="font-semibold text-[#475467]">{collaborator.first_name[0] + collaborator.last_name[0]}</div>
                                                                </div>
                                                                <span className="ml-2">{collaborator.first_name + " " + collaborator.last_name}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 border-b pl-6 text-xs border-t border-[#667085] ">
                                                        <div className="">
                                                            {collaborator.role}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                        <div>{collaborator.email}</div>
                                                    </td>

                                                    <td className="py-4 border-b pl-6 text-xs font-medium border-t border-[#667085] ">
                                                        <div className="flex items-center gap-6">
                                                            <button onClick={() => {
                                                                setSelectedCollaborator(collaborator);
                                                                setShowDeleteModal(true);
                                                            }}>
                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M13.3333 4.99935V4.33268C13.3333 3.39926 13.3333 2.93255 13.1517 2.57603C12.9919 2.26243 12.7369 2.00746 12.4233 1.84767C12.0668 1.66602 11.6001 1.66602 10.6667 1.66602H9.33333C8.39991 1.66602 7.9332 1.66602 7.57668 1.84767C7.26308 2.00746 7.00811 2.26243 6.84832 2.57603C6.66667 2.93255 6.66667 3.39926 6.66667 4.33268V4.99935M8.33333 9.58268V13.7493M11.6667 9.58268V13.7493M2.5 4.99935H17.5M15.8333 4.99935V14.3327C15.8333 15.7328 15.8333 16.4329 15.5608 16.9677C15.3212 17.4381 14.9387 17.8205 14.4683 18.0602C13.9335 18.3327 13.2335 18.3327 11.8333 18.3327H8.16667C6.76654 18.3327 6.06647 18.3327 5.53169 18.0602C5.06129 17.8205 4.67883 17.4381 4.43915 16.9677C4.16667 16.4329 4.16667 15.7328 4.16667 14.3327V4.99935" stroke="#F2F4F7" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </button>
                                                            <button onClick={() => {
                                                                setSelectedCollaborator(collaborator);
                                                                setCollaboratorField({ name: collaborator.last_name + " " + collaborator.last_name, email: collaborator.email, role: collaborator.role });
                                                                setShowEditModal(true);
                                                            }}>

                                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M2.39686 15.0973C2.43515 14.7527 2.45429 14.5804 2.50642 14.4194C2.55268 14.2765 2.61802 14.1405 2.70069 14.0152C2.79388 13.8739 2.91645 13.7513 3.1616 13.5061L14.1669 2.5009C15.0873 1.58043 16.5797 1.58043 17.5002 2.5009C18.4207 3.42138 18.4207 4.91376 17.5002 5.83424L6.49493 16.8395C6.24978 17.0846 6.12721 17.2072 5.9859 17.3004C5.86054 17.383 5.72457 17.4484 5.5817 17.4946C5.42067 17.5468 5.24838 17.5659 4.9038 17.6042L2.0835 17.9176L2.39686 15.0973Z" stroke="#F2F4F7" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                            }

                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}

const CollaboratorsPage = () => {
    const user = useAppSelector(state => state.auth.user);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [collaborators, setCollaborators] = useState<CollaboratorModel[]>([]);
    const [collaboratorsField, setCollaboratorsField] = useState<{ name: string, email: string, role: string }[]>([{ name: "", email: "", role: "HOST" }])

    const [showModal, setShowModal] = useState(false);

    const handleSendInvite = async () => {
        try {
            const resposne = await APICall(createCollaborators, collaboratorsField[0], true);

        } catch (error) {

        }
    }
    const handleGetCollborators = async () => {
        try {
            const response = await getCollaborators();
            setCollaborators(response.data.data.data);
        } catch (error) {

        }
    }
    useEffect(() => {
        handleGetCollborators()
    }, [])

    return (
        <div id="dashboard">
            <Modal size="md" open={showModal} onClose={(val) => setShowModal(val)}>
                <div className="border-b text-center text-2xl font-raleway font-bold py-5">
                    Add & Invite new collaborators
                </div>
                <div className="py-10 text-center">
                    <div className="px-6">
                        <div className="flex gap-3 items-center">
                            <div className="flex-1 text-left">
                                <label htmlFor="name" className="text-sm">
                                    Name
                                </label>
                                <input onChange={(e) => setCollaboratorsField([{ ...collaboratorsField[0], name: e.target.value }])} value={collaboratorsField[0].name} name="name" placeholder="Enter full name" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                            </div>

                            <div className="flex-1 text-left">
                                <label htmlFor="email" className="text-sm">
                                    Email
                                </label>
                                <input onChange={(e) => setCollaboratorsField([{ ...collaboratorsField[0], email: e.target.value }])} value={collaboratorsField[0].email} name="email" placeholder="Enter your email" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`} />
                            </div>

                            <div className="flex-1 text-left">
                                <label htmlFor="role" className="text-sm">
                                    Assign Role
                                </label>
                                <select onChange={(e) => setCollaboratorsField([{ ...collaboratorsField[0], role: e.target.value }])} value={collaboratorsField[0].role} name="email" placeholder="olivia@gmail.com" className={`w-full px-3.5 py-2.5 bg-white rounded-lg shadow border border-gray-300 text-gray-500`}>
                                    <option value={"host"}>HOST</option>
                                    <option value={"producer"}>PRODUCER</option>
                                    <option value={"editor"}>EDITOR</option>
                                    <option value={"advertiser"}>ADVERTISER</option>
                                    <option value={"owner"}>OWNER</option>


                                </select>
                            </div>
                            <div>
                                <button>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.16675 15.8327L15.8334 4.16602M4.16675 4.16602L15.8334 15.8327L4.16675 4.16602Z" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="mt-8 space-y-4 w-4/12 mx-auto">

                    </div>
                    <div className="mt-8 space-y-4 w-5/12 mx-auto">
                        <div>
                            <Button onClick={handleSendInvite} className="w-full !text-sm !py-[0.63rem] text-center">
                                {loading ? <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                </svg> :
                                    "Send invite"}
                            </Button>
                        </div>
                        <div>
                            <Button onClick={handleSendInvite} className="w-full !from-white !to-white !text-[#063150] font-semibold !py-[0.63rem] text-center">
                                {loading ? <svg className="w-5 h-5 inline" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                </svg> :
                                    "Cancel"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="relative">
                <div className="flex gap-3 items-center">
                    <div className="text-sm font-medium">
                        {user?.first_name} Podcast
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium">
                        Settings
                    </div>
                    <div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L10 8L6 4" stroke="#D0D5DD" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium text-[#66C6BF]">
                        Collaborators settings
                    </div>
                </div>
                <div className="pr-5 mt-5">
                    <div className={`font-semibold text-xl pb-2`}>
                        Collaborators: {user?.first_name} Podcast
                    </div>
                    <div>
                        <p className="text-sm">
                            Collaborators listed here are granted full editorial control over the podcast.
                        </p>
                    </div>
                </div>

            </div>

            <div className="mt-8">
                <div className="flex justify-between">
                    <div>
                        <div className="font-semibold text-lg">
                            Collaborators
                        </div>
                        <div>
                            <p className="text-xs text-[#F2F4F7]">Detailed list of collaborators on this podcast</p>
                        </div>
                    </div>
                    <Button onClick={() => setShowModal(true)} className="text-sm">
                        Add new collaborators
                    </Button>
                </div>
                <CollaboratorsTable collaborators={collaborators} onCreateCollaborator={() => setShowModal(true)} update={handleGetCollborators} />

            </div>
        </div>
    )
}

export default CollaboratorsPage