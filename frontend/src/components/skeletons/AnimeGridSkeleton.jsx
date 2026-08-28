/* src/components/skeletons/AnimeGridSkeleton.jsx */
import AnimeCardSkeleton from "./AnimeCardSkeleton";

export default function AnimeGridSkeleton({ count = 10, gridClassName = "search-results-grid" }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={gridClassName} aria-label="Loading content...">
      {skeletons.map((id) => (
        <AnimeCardSkeleton key={id} />
      ))}
    </div>
  );
}
