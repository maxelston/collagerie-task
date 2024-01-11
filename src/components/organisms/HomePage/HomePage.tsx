"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useFetch } from "@/hooks/useFetch";
import { Card } from "@/components/molecules/Card";
import { ICharacterCore, ICharactersResponse } from "@/types/types";

export const HomePage = () => {
  const [characters, setCharacters] = useState<ICharacterCore[]>([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);

  const { data, loading } = useFetch<ICharactersResponse>(
    `/api/characters?page=${page}`,
  );

  useEffect(() => {
    if (data) {
      setCharacters([...characters, ...data.response.characters.results]);
      setPageTotal(data.response.characters.info.pages);
    }
  }, [data]);

  return (
    <>
      <header className="relative py-16">
        <Image
          src="https://images.pond5.com/simple-star-space-background-effect-023768280_prevstill.jpeg"
          alt="stars in the sky"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        <div className="absolute h-1/2 w-full bottom-0 object-contain bg-gradient-to-t from-black to-transparent"></div>
        <div className="relative mx-4 md:mx-0 pt-36">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1600px-Rick_and_Morty.svg.png"
            alt="rick and morty logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </header>
      <main>
        <div className="md:max-w-screen-lg md:m-auto min-h-screen">
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-x-4 gap-y-12">
              {!data
                ? [...Array(18)].map((e, i) => (
                    <Card character={null} key={i} />
                  ))
                : characters.map((character, i) => (
                    <Card character={character} key={i} />
                  ))}
            </div>
          </div>
        </div>
        <LoadMore
          pageTotal={pageTotal}
          page={page}
          setPage={setPage}
          loading={loading}
        />
      </main>
    </>
  );
};

const LoadMore = ({
  pageTotal,
  page,
  setPage,
  loading,
}: {
  pageTotal: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible && page < pageTotal) {
      setPage(page + 1);
    }
  }, [isVisible]);

  if (page === pageTotal && !loading) return null;

  return (
    <div ref={ref} className="flex">
      <div className="text-[#42b5cb] uppercase m-auto p-4">
        {loading ? "Loading..." : "Load more"}
      </div>
    </div>
  );
};
