import { ExternalLinkIcon } from "@heroicons/react/solid"

export default function ContentSection({ feedItem }) {
    return <div className={`sm:col-span-4 col-span-9 p-5 overflow-auto relative h-screen sm:h-auto sm:block ${feedItem ? "" : "m-auto"}`}>
        {feedItem ?
            <>
                <div className="font-bold text-center text-xl py-5">{feedItem.title}</div>
                <div className="flex justify-between">
                    <p><span className="font-semibold">Date:</span> {(new Date(feedItem.pubDate)).toLocaleString()}</p>
                    <p><span className="font-semibold">Author:</span> {feedItem.author}</p>
                </div>
                <div className="pt-5" dangerouslySetInnerHTML={{ __html: feedItem.content }} />
                <a href={feedItem.link} target="blank" className="text-center inset-x-0 absolute backdrop-blur p-5 sm:bottom-0 bottom-10">
                    <p className="bg-blue-300 text-blue-900 text-lg rounded p-2 font-semibold hover:bg-blue-400">
                        Open Link <ExternalLinkIcon className="inline w-5 h-5" />
                    </p>
                </a>
            </>
            :
            <>
                <p>Select an article to read!</p>
            </>}

    </div>
}