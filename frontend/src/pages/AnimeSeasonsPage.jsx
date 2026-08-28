import QueryWrapper from '../components/QueryWrapper';
import SeasonPicker from '../components/animeSeasonsPage/SeasonPicker';
import AnimeSeasonContent from '../components/animeSeasonsPage/AnimeSeasonContent'

const AnimeSeasonsPage = () => {
    return (
        <main>
            <h2>Explore Seasons</h2>

            <QueryWrapper loadingMessage="Loading season options...">
                <SeasonPicker />
            </QueryWrapper>

            <QueryWrapper loadingMessage="Loading season content...">
                <AnimeSeasonContent />
            </QueryWrapper>
        </main>
    );
};

export default AnimeSeasonsPage;