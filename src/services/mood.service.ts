// interface IEditMood {
//     name?: string;
//     emoji?: string;
//     color?: string;
// }

const BASE_URL = "http://localhost:3000/moods";

// const updateMood = (moodId: string, payload: IEditMood): Promise<IMood> => {
//     return fetch(`${BASE_URL}/${moodId}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(payload)

//     }).then(async res => {
//         const mood = await res.json();
//         return mood;
//     }).catch(error => {

//         console.error(`Error updating mood: ${error}`);
//         return null;
//     });
// }

const fetchMoods = (): Promise<IMood[]> => {
    return fetch(`${BASE_URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",

    }).then(async res => {
        const { data }: { data: IMood[] } = await res.json();
        return data;
    }).catch(error => {

        console.error(`Error fetching moods: ${error}`);
        return [];
    });
}

export {
    fetchMoods 
}
