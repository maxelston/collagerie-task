import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page") || 1;
  const { data } = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          {
            characters(page: ${page}, filter: {name: "Morty", status: "Alive"}) {
              info {
                pages
              }
              results {
                name
                id
                image
                gender
                species
              }
            }
          }
      `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json());
  return NextResponse.json({
    response: data,
  });
};
