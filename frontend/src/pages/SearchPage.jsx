import QueryWrapper from '../components/QueryWrapper';
import SearchResultsContent from '../components/searchPage/SearchContent';
import FilterBar from '../components/searchPage/FilterBar';

function SearchPage() {
    return (
        <div className="search-page">
            <h2>Search Anime</h2>

            <FilterBar />

            <div className="search-results">
                <QueryWrapper skeletonCount={25} gridClassName="search-results-grid">
                    <SearchResultsContent />
                </QueryWrapper>
            </div>
        </div>
    );
}

export default SearchPage;