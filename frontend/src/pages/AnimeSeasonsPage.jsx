import QueryWrapper from '../components/QueryWrapper';
import SeasonPicker from '../components/animeSeasonsPage/SeasonPicker';
import AnimeSeasonContent from '../components/animeSeasonsPage/AnimeSeasonContent';

const SeasonPickerPlaceholder = () => (
    <div className="season-picker-container" aria-hidden="true" />
);

const AnimeSeasonsPage = () => {
    return (
        <main>
            <h2>Explore Seasons</h2>

            <QueryWrapper fallback={<SeasonPickerPlaceholder />}>
                <SeasonPicker />
            </QueryWrapper>

            <QueryWrapper skeletonCount={25} gridClassName="search-results-grid">
                <AnimeSeasonContent />
            </QueryWrapper>
        </main>
    );
};

export default AnimeSeasonsPage;