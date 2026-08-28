import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useFavorites } from "../context/FavoritesContext";
import "./AnimeCard.css";

function AnimeCard({ anime }) {
    const { user } = useAuth();
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.some((fav) => fav.mal_id === anime.mal_id);

    const [heartUI, setHeartUI] = useState(isFavorite);

    useEffect(() => {
        setHeartUI(isFavorite);
    }, [isFavorite]);

    function handleFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return toast("Login to save animes.", { icon: "🔒" });

        if (isFavorite) {
            setHeartUI(false);
            removeFavorite(anime.mal_id);
        } else {
            setHeartUI(true);
            addFavorite(anime.mal_id);
        }
    }

    // Safely handle missing data
    const title = anime.title_english || anime.title || anime.titles?.[0]?.title || "Untitled";
    const year = anime.aired?.prop?.from?.year || "TBA";
    const score = anime.score ? anime.score.toFixed(1) : "N/A";
    const type = anime.type || "TV";
    const eps = anime.episodes ? `${anime.episodes} ep` : "? ep";

    return (
        <div className="anime-card">
            <div className="anime-poster">
                <a href={anime.url} target="_blank" rel="noopener noreferrer" tabIndex={0} aria-label={`View ${title} on MyAnimeList`}>
                    <img
                        src={anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url}
                        alt={title}
                        loading="lazy"
                    />
                </a>
                <div className="anime-overlay">
                    <button 
                        className={`favorite ${heartUI ? "is-favorite" : ""}`} 
                        onClick={handleFavoriteClick}
                        aria-label={heartUI ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
                        aria-pressed={heartUI}
                        type="button"
                    >
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill={heartUI ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="anime-info">
                <h3 title={title}>{title}</h3>

                <div className="anime-meta">
                    <span className="badge-score" title={`Score: ${score}`}>
                        <svg className="meta-icon" width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        {score}
                    </span>
                    <span className="badge-type">{type}</span>
                    <span className="badge-year" title={`Year: ${year}`}>
                        <svg className="meta-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {year}
                    </span>
                    <span className="badge-eps" title={`Episodes: ${eps}`}>
                        <svg className="meta-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                            <polyline points="17 2 12 7 7 2" />
                        </svg>
                        {eps}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AnimeCard;