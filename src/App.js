import { useState, useEffect } from "react";
import { getFeed, getFeeds } from "./utils";
import Header from "./components/Header";
import FeedsSection from "./screens/FeedsSection";
import ItemsSection from "./screens/ItemsSection";
import ContentSection from "./screens/ContentSection";
import Body from "./components/Body";

function App() {

	const [feed, setFeed] = useState([]);
	const [feedItems, setFeedItems] = useState({ rows: [], count: 0, next: null });
	const [selectedFeed, setSelectedFeed] = useState();
	const [selectedFeedItem, setSelectedFeedItem] = useState();
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		getFeeds()
			.then(res => {
				if (!res.error) setFeed(res.message)
			});
	}, [update])

	const clickFeed = (feed) => {
		setSelectedFeed(feed);
		getFeed(feed.id, 1)
			.then(res => {
				if (!res.error) setFeedItems(res.message);
			});
	}

	const updatePage = () => {
		setUpdate(!update);
	}

	return (
		<div className="font-inter sm:px-20 sm:pt-20 sm:pb-28 pb-10 bg-gray-200 dark:bg-zinc-700 h-screen dark:text-white">
			<Header />
			<Body>
				<FeedsSection
					feed={feed}
					selectedFeed={selectedFeed}
					onFeedClick={clickFeed}
					updatePage={updatePage}
				/>
				<ItemsSection
					selectedFeed={selectedFeed}
					selectedFeedItem={selectedFeedItem}
					feedItems={feedItems}
					clickFeedItem={(item) => { setSelectedFeedItem(item) }}
					setFeedItems={setFeedItems}
				/>
				<ContentSection
					feedItem={selectedFeedItem}
				/>
			</Body>
		</div>
	);
}

export default App;
