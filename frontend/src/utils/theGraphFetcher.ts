export const theGraphFetcher = async (query: string) => {
    const response = await fetch("https://api.studio.thegraph.com/query/88257/debbs_sepolia/version/latest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data;
};
