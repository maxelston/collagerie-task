import { NextResponse, NextRequest } from "next/server";
import { IEpisode } from "@/types/types";

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");
  const { data } = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          {
            character(id: ${id}) {
              name
              image
              status
              origin {
                name
              }
              location {
                name
                dimension
                type
                residents {
                  id
                }
              }
              episode {
                name
                air_date
                characters {
                  name
                }
              }
            }
          }
      `,
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json());

  const episodes = data.character.episode;

  const firstAppearance = episodes.reduce(
    (prev: IEpisode, current: IEpisode) => {
      if (!prev || current.air_date < prev.air_date) {
        return current;
      }
      return prev;
    },
    null,
  );

  const lastAppearance = episodes.reduce(
    (prev: IEpisode, current: IEpisode) => {
      if (!prev || current.air_date > prev.air_date) {
        return current;
      }
      return prev;
    },
    null,
  );

  return NextResponse.json({
    response: data,
    episodes: {
      firstAppearance,
      lastAppearance,
    },
  });
};
