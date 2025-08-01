const BASE_URL = "http://localhost:3000/tags";

const fetchTagsForUser = (userId: string): Promise<ITag[]> => {
    return fetch(`${BASE_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then(async res => {
        const { data }: { data: ITag[] } = await res.json();
        return data;
    }).catch(error => {
        console.error(`Error fetching user tags: ${error}`);
        return [];
    });
}

const fetchTagById = (tagId: string): Promise<ITag> => {
    return fetch(`${BASE_URL}/${tagId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then(async res => {
        const { data }: { data: ITag } = await res.json();
        return data;
    }).catch(error => {
        console.error(`Error fetching user tags: ${error}`);
        throw new Error(error.massage || "Failed to fetch tag");
    });
}

export {
    fetchTagsForUser,
    fetchTagById
}
