import { fetchTagById } from "./tag.service";

const BASE_URL = "http://localhost:3000/diaries";

const fetchDiariesForUser = async (userId: string): Promise<IDiary[]> => {
    const res = await fetch(`${BASE_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const body = await res.json();

    if (!res.ok) {
        throw new Error(`${res.status}: ${body.message}\n${body.error}`);
    }

    const diaries: IDiary[] = body.data;
    return await fetchTagsNamesForDiary(diaries);
};

const fetchTagsNamesForDiary = async (diaries: IDiary[]): Promise<IDiary[]> => {
    for (const diary of diaries) {
        const tags = diary.tags;
        if (tags && Array.isArray(tags)) {
            for (let i = 0; i < tags.length; i++) {
                try {

                    const tagId = tags[i];
                    const fetchedTag = await fetchTagById(tagId as string);
                    if (fetchedTag) {
                        tags[i] = fetchedTag;
                    }
                } catch (error: any) {
                    throw new Error(`Error fetching tags: ${error.massage}`)
                }
            }
        }
    }

    return diaries;
};

export {
    fetchDiariesForUser,
    fetchTagsNamesForDiary
}
