"use client";
import { useFetch } from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
import { ICharacterResponse } from "@/types/types";

export default function Page({ params }: { params: { id: string } }) {
  const { data } = useFetch<ICharacterResponse>(
    `/api/character?id=${params.id}`,
  );

  const character = data?.response.character;
  const firstAppearance = data?.episodes.firstAppearance;
  const lastAppearance = data?.episodes.lastAppearance;
  const OVERLAY_BUFFER = 45;

  return (
    <>
      <header>
        <div className="bg-[url('https://images.pond5.com/simple-star-space-background-effect-023768280_prevstill.jpeg')]">
          <div className="md:max-w-screen-lg md:m-auto md:flex md:flex-col pt-8 px-8">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1600px-Rick_and_Morty.svg.png"
              alt="rick and morty logo"
              width={250}
              height={76}
              className="mx-auto md:mx-0"
            />
            <div className="flex justify-center md:block py-4">
              <Link className="text-white text-sm font-bold" href="/">
                {"< Back to character listing"}
              </Link>
            </div>
            <div
              className={`flex flex-col md:flex-row items-center md:top-[${OVERLAY_BUFFER}px] relative z-10`}
            >
              <div className="bg-gray-500 w-52 h-52 rounded-full relative">
                {data && (
                  <Image
                    src={character?.image ?? ""}
                    alt="profile"
                    objectFit="cover"
                    fill
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="md:pl-8 pt-4 md:pt-0 text-center md:text-left">
                {data ? (
                  <>
                    <div className="text-[#42b5cb] pb-4 font-bold text-4xl">
                      {character?.name}
                    </div>
                    <div className="text-white">
                      Status: {character?.status}
                    </div>
                    <div className="text-white">
                      Origin: {character?.origin.name}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-700 animate-pulse h-5 w-40 mb-4" />
                    <div className="bg-gray-700 animate-pulse h-5 w-40 mb-2" />
                    <div className="bg-gray-700 animate-pulse h-5 w-40" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute h-24 top-[-6rem] w-full bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </header>
      <main
        className={`md:mt-[${OVERLAY_BUFFER}px] px-8 py-8 md:max-w-screen-lg md:m-auto`}
      >
        <div className="text-white">
          <h3 className="text-xl font-bold text-[#42b5cb]">
            Location Details:
          </h3>
          {data ? (
            <>
              <div>Name: {character?.location.name}</div>
              <div>Type: {character?.location.type}</div>
              <div>Dimension: {character?.location.dimension}</div>
              <div>
                No. of Residents: {character?.location.residents.length}
              </div>
            </>
          ) : (
            [...Array(4)].map((e, i) => (
              <div
                key={i}
                className="bg-gray-700 h-4 my-2 md:w-1/4 animate-pulse"
              />
            ))
          )}
          <h3 className="text-xl font-bold pt-8 text-[#42b5cb]">
            Episodes: {`${data ? character?.episode.length : ""}`}
          </h3>
          {data ? (
            <>
              <div>First appearance: {firstAppearance?.name}</div>
              <div>First appearance air date: {firstAppearance?.air_date}</div>
              <div>
                First appearance character count:{" "}
                {firstAppearance?.characters.length}
              </div>
              <div>Last appearance: {lastAppearance?.name}</div>
              <div>Last appearance air date: {lastAppearance?.air_date}</div>
              <div>
                Last appearance character count:{" "}
                {lastAppearance?.characters.length}
              </div>
            </>
          ) : (
            [...Array(5)].map((e, i) => (
              <div
                key={i}
                className="bg-gray-700 h-4 my-2 md:w-1/4 animate-pulse"
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}
