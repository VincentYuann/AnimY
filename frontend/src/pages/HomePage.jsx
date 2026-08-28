import TopAnimeGrid from "../components/homePage/TopAnimeGrid";
import RandomAnimeGrid from "../components/homePage/RandomAnimeGrid";
import QueryWrapper from "../components/QueryWrapper";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page">
            <section className="home-section">
                <h2>Top Anime</h2>
                <QueryWrapper skeletonCount={10} gridClassName="top-anime-list">
                    <div className="top-anime-list">
                        <TopAnimeGrid />
                    </div>
                </QueryWrapper>
            </section>

            <section className="home-section">
                <h2>Discover Random</h2>
                <QueryWrapper skeletonCount={10} gridClassName="random-anime-list">
                    <div className="random-anime-list">
                        <RandomAnimeGrid />
                    </div>
                </QueryWrapper>
            </section>
        </div>
    );
}

export default HomePage;
