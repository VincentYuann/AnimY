import TopAnimeGrid from "../components/homePage/TopAnimeGrid";
import RandomAnimeGrid from "../components/homePage/RandomAnimeGrid";
import QueryWrapper from "../components/QueryWrapper";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page">
            <section className="home-section">
                <h2>Top Anime</h2>
                <div className="top-anime-list">
                    <QueryWrapper loadingMessage="Loading top anime...">
                        <TopAnimeGrid />
                    </QueryWrapper>
                </div>
            </section>

            <section className="home-section">
                <h2>Discover Random</h2>
                <div className="random-anime-list">
                    <QueryWrapper loadingMessage="Loading random anime...">
                        <RandomAnimeGrid />
                    </QueryWrapper>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
