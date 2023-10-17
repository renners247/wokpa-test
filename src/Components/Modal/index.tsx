"use client";

import { Dialog, Transition } from '@headlessui/react'
import React from 'react';

export interface ModalProps extends React.PropsWithChildren {
    open: boolean;
    onClose: (val: boolean) => void;
    size: "sm" | "md" | "md2" | "lg" | "xs"
}

const Modal: React.FC<ModalProps> = ({ open, onClose, size, children }) => {
    return (
        <Transition appear show={open} as={React.Fragment}>
            <Dialog as="div" className="relative z-40" onClose={() => onClose(false)}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`${size == "lg" ? "md:w-[70vw]" : size == "md" ? "md:w-[55vw]" : size == "md2" ? "md:w-[45vw]"  :  size == "sm" ? "md:w-[32vw]" : "md:w-[25vw]" } w-[90vw] overflow-hidden rounded-xl bg-[#26272B] transition-all`}>
                                <div className=''>
                                    {
                                        children
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
}

export default Modal;