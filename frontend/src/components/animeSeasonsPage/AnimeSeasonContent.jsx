import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from 'react-router-dom';
import { getCurrentSeason, getUpcomingSeasons, getSeason } from '../../services/animeService';
import AnimeCard from '../AnimeCard';
import Pagination from '../Pagination';
import EmptyState from '../EmptyState';

function AnimeSeasonContent() {
    const { type } = useParams();
    const [searchParams] = useSearchParams();

    const seasonFilters = {
        year: searchParams.get('year') || '',
        season: searchParams.get('season') || '',
        page: searchParams.get('page') || ''
    };

    const { year, season, page } = seasonFilters;

    const { data: { animes, pagination } } = useSuspenseQuery({
        queryKey: ['season', type, seasonFilters],
        queryFn: () => {
            if (type === 'current' || type === '') return getCurrentSeason(page);
            if (type === 'upcoming') return getUpcomingSeasons(page);
            if (type === 'specific' && year && season) return getSeason(year, season, page);
        },
    });

    // Prevents anime duplications
    const uniqueAnimeList = Array.from(new Map(animes.map(item => [item.mal_id, item])).values());

    if (uniqueAnimeList.length === 0) {
        return (
            <EmptyState 
                icon="calendar"
                title="No anime in this season"
                description="No broadcast entries were found for the selected season. Try switching between Current, Upcoming, or picking another year."
                actionText="View Current Season"
                actionLink="/seasons/current"
            />
        );
    }

    return (
        <>
            <div className='search-results-grid'>
                {uniqueAnimeList.map(anime => (
                    <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
            </div>

            {pagination && pagination.last_visible_page > 1 && (
                <Pagination pagination={pagination} />
            )}
        </>
    );
}

export default AnimeSeasonContent;