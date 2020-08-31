interface Body<TVariables> {
  query: string;
  variables?: TVariables
}

interface Error {
  message: string;
}

export const server = {
  fetch: async <TResponseData = any, TRequestVariables = any>(
    body: Body<TRequestVariables>
  ) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error(`[server.fetch] : failed fetch data`);
    }

    return res.json() as Promise<{ data: TResponseData, errors: Error[] }>;
  }
};

