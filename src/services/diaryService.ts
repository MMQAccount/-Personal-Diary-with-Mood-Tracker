const API_BASE_URL = "http://localhost:3000/diaries";


const fetchDiariesForUser = async (userId: string): Promise<Store.IDayDiaryBE[]> => {
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

export {
  fetchDiariesForUser
}
export const createDiary = async (
  user: string,
  data: Store.IDayDiaryBECreateUpdate,
  token?: string
): Promise<{ data: Store.IDayDiary }> => {
  const response = await fetch(`${API_BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      ...data,
      user,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create diary");
  }

  return response.json();
};



export const updateDiaryContent = async (
  id: string,
  user: string,
  data: Store.IDayDiaryBECreateUpdate,
  token?: string
) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      ...data,
      user,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch diaries");
  }

  return response.json();
};

