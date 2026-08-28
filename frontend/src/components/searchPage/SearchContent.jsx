import { searchAnimes } from '../../services/animeService';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import AnimeCard from '../AnimeCard';
import Pagination from '../Pagination';
import EmptyState from '../EmptyState';

function SearchResultsContent() {
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: { animes, pagination } } = useSuspenseQuery({
        queryKey: ['animes', String(searchParams)],
        queryFn: () => searchAnimes(searchParams)
    });

    // Prevents anime duplications
    const uniqueAnimeList = Array.from(new Map(animes.map(item => [item.mal_id, item])).values());

    if (uniqueAnimeList.length === 0) {
        const query = searchParams.get("q");
        return (
            <EmptyState 
                icon="search"
                title="No anime found"
                description={query ? `No results matched "${query}". Try adjusting your keywords or loosening active filters.` : "No anime match the selected combination of filters."}
                actionText="Clear All Filters"
                onAction={() => setSearchParams({})}
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

export default SearchResultsContent;