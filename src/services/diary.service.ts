import { fetchTagById } from "./tag.service";

const BASE_URL = "http://localhost:3000/diaries";

const fetchDiariesForUser = async (userId: string): Promise<IDiary[]> => {
    try {
        const res = await fetch(`${BASE_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        // if (!res.ok) {
        //     throw new Error(`HTTP error! status: ${res.status}`);
        // }

        const { data }: { data: IDiary[] } = await res.json();

        return await fetchTagsNamesForDiary(data);

    } catch (error) {
        console.error(`Error fetching user diaries: ${error}`);
        return [];
    }
};

const fetchTagsNamesForDiary = async (diaries: IDiary[]): Promise<IDiary[]> => {
    try {
        for (const diary of diaries) {
            const tags = diary.tags;
            if (tags && Array.isArray(tags)) {
                for (let i = 0; i < tags.length; i++) {
                    const tagId = tags[i];
                    const fetchedTag = await fetchTagById(tagId as string);
                    if (fetchedTag) {
                        // Replace string ID with full tag object
                        tags[i] = fetchedTag;
                    }
                }
            }
        }

        return diaries;
    } catch (error) {
        console.error(`Error fetching user diaries: ${error}`);
        return [];
    }
};

export {
    fetchDiariesForUser,
    fetchTagsNamesForDiary
}
