import { useFavorites } from "../context/FavoritesContext";
import AnimeCard from "../components/AnimeCard";
import EmptyState from "../components/EmptyState";
import "./FavoritesPage.css";

function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="favorites-page">
            <div className="favorites-header">
                <h2>My Favorites</h2>
                {favorites.length > 0 && (
                    <span className="favorites-count-badge">
                        {favorites.length} {favorites.length === 1 ? "Anime" : "Animes"}
                    </span>
                )}
            </div>

            {favorites.length === 0 ? (
                <EmptyState 
                    icon="heart"
                    title="Your collection is empty"
                    description="You haven't added any anime to your favorites yet. Explore trending series or seasonal releases to start your watchlist."
                    actionText="Explore Top Anime"
                    actionLink="/"
                />
            ) : (
                <div className="favorite-anime-list">
                    {favorites.map((anime) => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;
