const BASE_URL = "http://localhost:3000/diaries";

const fetchDiariesForUser = (userId: string): Promise<IDiary[]> => {
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
        
        console.error(`Error fetching user diaries: ${error}`);
        return [];
    });
}

export {
    fetchDiariesForUser
}
