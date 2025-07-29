const API_BASE_URL = "http://localhost:3000/users";

export const updateUser = async (userId: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update user");
  }

  return await response.json();
};


export const getUserById = async (userId: string, token?: string) => {
  const response = await fetch(`${API_BASE_URL}/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch user");
  }

  return response.json();
};


