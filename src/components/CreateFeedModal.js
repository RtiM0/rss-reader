import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { createFeed } from '../utils'

export default function CreateFeedModal({ children, refresh }) {
    let [isOpen, setIsOpen] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, url } = e.target.elements;
        createFeed(name.value, url.value)
            .then(res => {
                if (!res.error) {
                    refresh();
                    setIsOpen(false);
                } else {
                    alert(res.message);
                }
            });
    }

    return (
        <>
            <button
                className="text-center inset-x-0 absolute p-5 bottom-0 w-full"
                onClick={() => setIsOpen(true)}
            >
                <p className="bg-blue-300 text-blue-900 text-lg rounded p-2 font-semibold hover:bg-blue-400">
                    {children}
                </p>
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative bg-white dark:bg-zinc-900 dark:bg-opacity-90 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                    <div className="bg-white dark:bg-zinc-900 dark:bg-opacity-90 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium dark:text-gray-50 text-gray-900">
                                                    Add RSS Feed
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className='text-gray-500 dark:text-gray-50 mt-2'>
                                                        RSS Reader will attempt to detect the RSS Feed location of the website, you might need to add it manually if the feed location cant be detected.
                                                    </p>
                                                    <form
                                                        id='create-feed-form'
                                                        onSubmit={onSubmit}
                                                    >
                                                        <div className='pb-5'>
                                                            <label htmlFor="name" className="block text-sm font-medium dark:text-gray-400 text-gray-700">
                                                                Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                id="name"
                                                                placeholder="Nytimes"
                                                                className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-zinc-700 dark:text-white"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor="url" className="block text-sm font-medium dark:text-gray-400 text-gray-700">
                                                                URL
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="url"
                                                                id="url"
                                                                placeholder="https://nytimes.com/"
                                                                className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-zinc-700 dark:text-white"
                                                            />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            form="create-feed-form"
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        >
                                            Add Feed
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
