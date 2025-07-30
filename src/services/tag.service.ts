const BASE_URL = "http://localhost:3000/tags";

const fetchTagsForUser = (userId: string): Promise<ITag[]> => {
    return fetch(`${BASE_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then(async res => {
        const diaries = await res.json();
        return diaries;
    }).catch(error => {
        console.log(error);
        
        console.error(`Error fetching user tags: ${error}`);
        return [];
    });
}

export {
    fetchTagsForUser
}
