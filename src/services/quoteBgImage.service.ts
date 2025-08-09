const BASE_URL = "http://localhost:3000/quote-bg-image";

const fetchQuoteBgImages = async (): Promise<IQuoteBgImage[]> => {
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
  } else {
    console.log(res);
  }
  return body.data as IQuoteBgImage[];
};

export { fetchQuoteBgImages };
