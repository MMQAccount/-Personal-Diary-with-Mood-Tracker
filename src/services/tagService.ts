const API_BASE_URL = "http://localhost:3000/tags";


const fetchTagsForUser = async (userId: string): Promise<Store.IDayDiaryBE[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { data }: { data: Store.IDayDiaryBE[] } = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching user diaries: ${error}`);
    return [];
  }
};