/* src/components/skeletons/AnimeCardSkeleton.jsx */
import "./AnimeCardSkeleton.css";

export default function AnimeCardSkeleton() {
  return (
    <div className="anime-card-skeleton" aria-hidden="true">
      <div className="skeleton-poster skeleton-pulse" />
      <div className="skeleton-info">
        <div className="skeleton-title-group">
          <div className="skeleton-line title-primary skeleton-pulse" />
          <div className="skeleton-line title-secondary skeleton-pulse" />
        </div>
        <div className="skeleton-meta-grid">
          <div className="skeleton-badge skeleton-pulse" />
          <div className="skeleton-badge skeleton-pulse" />
          <div className="skeleton-badge skeleton-pulse" />
          <div className="skeleton-badge skeleton-pulse" />
        </div>
      </div>
    </div>
  );
}
