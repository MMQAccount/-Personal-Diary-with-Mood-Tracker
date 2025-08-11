const BASE_URL = "http://localhost:3000/quote-bg-color";

const fetchQuoteBgColors = async (): Promise<IQuoteBgColor[]> => {
  const res = await fetch(`${BASE_URL}`, {
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

  return body.data as IQuoteBgColor[];
};
export { fetchQuoteBgColors };
