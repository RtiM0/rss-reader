import { RefreshIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroller"
import List from "../components/List"
import { getFeed, refreshFeed } from "../utils"

export default function ItemsSection({ selectedFeed, selectedFeedItem, feedItems, clickFeedItem, setFeedItems }) {

    const [hasMoreItems, setHasMoreItems] = useState(true)

    useEffect(() => {
        setHasMoreItems(true)
    }, [selectedFeed])

    const onClickRefreshFeed = (id) => {
        refreshFeed(id)
            .then(res => {
                if (!res.error) {
                    setFeedItems(res.message);
                    setHasMoreItems(true);
                }
            });
    }

    const loadMoreItems = () => {
        if (feedItems.next) {
            getFeed(selectedFeed.id, feedItems.next)
                .then(res => {
                    if (!res.error) {
                        res.message.rows = [...feedItems.rows, ...res.message.rows];
                        setFeedItems(res.message);
                        if (!res.message.next) {
                            setHasMoreItems(false);
                        }
                    }
                })

        }
    }

    return <div className={`border-r dark:border-zinc-700 overflow-auto col-span-9 sm:col-span-3 relative h-screen sm:h-auto ${selectedFeedItem ? "hidden" : ""} ${selectedFeed ? "sm:block" : "flex"}`}>
        {selectedFeed ?
            <>
                <div className="w-full sticky top-0 backdrop-blur-sm bg-zinc-400 bg-opacity-20 p-2 justify-between flex items-center">
                    <span className="capitalize font-semibold">{selectedFeed.name} <span className="font-thin">{feedItems.count} items</span></span>
                    <button onClick={() => onClickRefreshFeed(selectedFeed.id)}><RefreshIcon className="w-5 h-5" /></button>
                </div>
                <InfiniteScroll
                    loadMore={() => loadMoreItems()}
                    hasMore={hasMoreItems}
                    useWindow={false}
                    loader={
                        <div key="loader" className="loader text-center">
                            Loading ...
                        </div>
                    }
                >
                    <List>
                        {feedItems.rows.map((item, index) =>
                            <button
                                key={index}
                                className={`flex text-left items-start space-x-6 p-6 w-full ${(selectedFeedItem && selectedFeedItem.id === item.id) ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}
                                onClick={() => clickFeedItem(item)}
                            >
                                {item.title}
                            </button>
                        )}
                    </List>
                </InfiniteScroll>
            </>
            :
            <div className="m-auto">
                Select a Feed!
            </div>
        }
    </div>
}