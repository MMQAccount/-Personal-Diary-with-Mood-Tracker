export interface SignupData {
  name: string;
  email: string;
  password: string;
  imageURL?: string;
}

const BASE_URL = "http://localhost:3000";  

export async function signup(data: SignupData) {
  const response = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.error || "Signup failed");
  }

  return response.json();
}


export interface LoginData {
  email: string;
  password: string;
}

export async function login(data: LoginData) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
}
