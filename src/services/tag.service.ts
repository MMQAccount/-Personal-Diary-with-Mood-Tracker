const BASE_URL = "http://localhost:3000/tags";

const fetchTagsForUser = async (userId: string): Promise<ITag[]> => {
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

    return body.data as ITag[];
};

const fetchTagById = async (tagId: string): Promise<ITag> => {
    const res = await fetch(`${BASE_URL}/${tagId}`, {
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

    return body.data as ITag;
};

const updateTag = async (tagId: string, updatedData: Partial<ITag>, token?: string): Promise<ITag> => {
  const res = await fetch(`${BASE_URL}/${tagId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(`${res.status}: ${body.message}\n${body.error}`);
  }

  return body.data as ITag;
};


export {
    fetchTagsForUser,
    fetchTagById,
    updateTag
}
