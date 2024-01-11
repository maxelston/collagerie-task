import Image from "next/image";
import { ICharacterCore } from "@/types/types";

export const Card = ({ character }: { character: ICharacterCore | null }) => (
  <a
    className="md:duration-300 md:hover:scale-105 flex flex-col bg-black md:transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] group"
    href={character ? `character/${character.id}` : "#"}
  >
    <div
      className={`w-full relative pt-[100%] bg-gray-400 ${
        !character && "animate-pulse"
      }`}
    >
      {character && (
        <Image
          src={character.image}
          alt="profile"
          style={{ objectFit: "cover" }}
          fill
          sizes="(max-width: 768px) 50vw, (min-width: 768px) 10vw"
        />
      )}
    </div>
    <div className="">
      {character ? (
        <>
          <h3 className="text-sm font-bold text-[#42b5cb] truncate ... dark:text-white pt-4">
            {character.name}
          </h3>
          <p className="text-gray-400 text-sm dark:text-gray-400">
            Gender: {character.gender}
          </p>
          <p className="text-gray-400 text-sm dark:text-gray-400">
            Species: {character.species}
          </p>
        </>
      ) : (
        <div className="h-[114px] py-4">
          <div className="bg-gray-700 animate-pulse h-full" />
        </div>
      )}
      {character && (
        <>
          <div className="mt-2 border border-solid border-white text-white text-sm text-center py-1 group-hover:bg-white group-hover:text-black">
            View Profile
          </div>
        </>
      )}
    </div>
  </a>
);
