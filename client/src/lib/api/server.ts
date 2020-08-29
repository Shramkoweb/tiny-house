interface Body<TVariables> {
  query: string;
  variables?: TVariables
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

    return res.json() as Promise<{ data: TResponseData }>;
  }
};

