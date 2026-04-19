import { getRandomAnimes } from "../../services/animeService";
import { useSuspenseQuery } from "@tanstack/react-query";
import AnimeCard from "../AnimeCard";

function RandomAnimeSection() {
    const { data: randomAnimes } = useSuspenseQuery({
        queryKey: ["randomAnimes"],
        queryFn: () => getRandomAnimes(14),
    });

    const uniqueRandomAnimes = Array.from(new Map(randomAnimes.map(anime => [anime.mal_id, anime])).values());

    return (
        <>
            {uniqueRandomAnimes.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
        </>
    );
}

export default RandomAnimeSection;
