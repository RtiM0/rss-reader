import { RssIcon, PlusIcon } from "@heroicons/react/solid"
import CreateFeedModal from "../components/CreateFeedModal"
import List from "../components/List"

export default function FeedsSection({ feed, selectedFeed, onFeedClick, updatePage }) {
    return <div className={`border-r dark:border-zinc-700 text-xl col-span-9 sm:col-span-2 font-semibold overflow-auto relative h-screen sm:h-auto sm:block ${selectedFeed ? "hidden" : ""}`}>
        <List>
            {feed.map((feed, index) =>
                <button
                    key={index}
                    className={`flex items-center space-x-6 p-6 capitalize w-full ${(selectedFeed && selectedFeed.id === feed.id) ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}
                    onClick={() => onFeedClick(feed)}
                >
                    {feed.faviconUrl ?
                        <img src={feed.faviconUrl} alt="Favicon" className="w-12 h-12 mx-2 rounded bg-white" />
                        :
                        <RssIcon className="w-7 h-7 mx-2" />
                    }
                    {feed.name}
                </button>
            )}
        </List>
        <CreateFeedModal refresh={updatePage}>
            <PlusIcon className="inline w-5 h-5" /> Add Feed
        </CreateFeedModal>
    </div>
}