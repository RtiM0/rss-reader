export const pageSize = 10;

export const getFeeds = async () => {
    const response = await fetch("http://localhost:3001/feed/");
    return response.json();
}


export const getFeed = async (id, page) => {
    const response = await fetch(`http://localhost:3001/feed/${id}?page=${page}&size=${pageSize}`);
    return response.json();
}

export const createFeed = async (name, url) => {
    const response = await fetch("http://localhost:3001/feed/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url })
    });
    return response.json();
}

export const refreshFeed = async (id) => {
    const response = await fetch(`http://localhost:3001/feed/${id}/refresh`);
    return response.json();
}