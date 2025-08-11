const BASE_URL = "http://localhost:3000/quotes";

const fetchQuotes = async (): Promise<IQuote[]> => {
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

  return body.data as IQuote[];
};

export { fetchQuotes };
