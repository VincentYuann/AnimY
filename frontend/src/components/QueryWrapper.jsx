import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import AnimeGridSkeleton from "./skeletons/AnimeGridSkeleton";

// Handles error boundary and realistic skeleton loading states
function QueryWrapper({ 
  children, 
  fallback, 
  skeletonCount = 10,
  gridClassName = "search-results-grid" 
}) {
  const { reset } = useQueryErrorResetBoundary();

  const defaultFallback = fallback || (
    <AnimeGridSkeleton count={skeletonCount} gridClassName={gridClassName} />
  );

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className="error-box" role="alert">
          <p>⚠️ Error: {error.message}</p>
          <button type="button" onClick={resetErrorBoundary} className="btn-retry">
            Try Again
          </button>
        </div>
      )}
    >
      <Suspense fallback={defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default QueryWrapper;
