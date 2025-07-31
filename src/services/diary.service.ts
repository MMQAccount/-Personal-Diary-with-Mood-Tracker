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
        return data;
    } catch (error) {
        console.error(`Error fetching user diaries: ${error}`);
        return [];
    }
};


export {
    fetchDiariesForUser
}
