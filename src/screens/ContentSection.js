import { ExternalLinkIcon } from "@heroicons/react/solid"

export default function ContentSection({ feedItem }) {
    return <div className={`sm:col-span-4 col-span-9 overflow-auto h-screen sm:h-auto sm:block ${feedItem ? "" : "m-auto"}`}>
        {feedItem ?
            <>
                <div className="p-5">
                    <div className="font-bold text-center text-xl py-5">{feedItem.title}</div>
                    <div className="flex justify-between">
                        <p><span className="font-semibold">Date:</span> {(new Date(feedItem.pubDate)).toLocaleString()}</p>
                        <p><span className="font-semibold">Author:</span> {feedItem.author}</p>
                    </div>
                    <div className="py-5" dangerouslySetInnerHTML={{ __html: feedItem.content }} />
                </div>
                <div className="flex sticky sm:bottom-0 bottom-10 backdrop-blur-sm p-5">
                    <a href={feedItem.link} target="blank" className="text-center w-full bg-blue-300 text-blue-900 text-lg rounded p-2 font-semibold hover:bg-blue-400">
                        Open Link <ExternalLinkIcon className="inline w-5 h-5" />
                    </a>
                </div>
            </>
            :
            <>
                <p>Select an article to read!</p>
            </>}

    </div>
}