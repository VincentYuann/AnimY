import { useSearchParams, Link, useLocation } from "react-router-dom";
import "./Pagination.css";

function Pagination({ pagination }) {
    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;

    const {
        last_visible_page: totalPages,
        current_page: currentPage
    } = pagination;

    // Creates a pagination array with 5 or less indexes
    const getPageNumbers = () => {
        if (totalPages <= 4) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 4);

        if (end === totalPages) {
            start = Math.max(1, totalPages - 4);
        }

        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };
    const pages = getPageNumbers();

    const getPageLink = (pageNumber) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", pageNumber);
        return `${pathname}?${newParams.toString()}`;
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="pagination-container">
            <h3 className="page-info">
                Page {currentPage} of {totalPages}
            </h3>

            <div className="pagination-buttons">
                {/* First Page Button */}
                {pages[0] > 1 &&
                    <Link
                        to={getPageLink(1)}
                        onClick={scrollToTop}
                        className="page-button"
                        aria-label="First page"
                    >
                        «
                    </Link>
                }

                {/* Prev Button */}
                {pages[0] > 1 &&
                    <Link
                        to={getPageLink(currentPage - 1)}
                        onClick={scrollToTop}
                        className="page-button"
                        aria-label="Previous page"
                    >
                        ‹
                    </Link>
                }

                {/* Page Numbers */}
                {totalPages > 1 && pages.map(page => (
                    <Link
                        key={page}
                        to={getPageLink(page)}
                        onClick={scrollToTop}
                        className={`page-button ${page === currentPage ? "active" : ""}`}
                        aria-current={page === currentPage ? "page" : undefined}
                    >
                        {page}
                    </Link>
                ))}

                {/* Next Button */}
                {(totalPages - currentPage > 2) &&
                    <Link
                        to={getPageLink(currentPage + 1)}
                        onClick={scrollToTop}
                        className="page-button"
                        aria-label="Next page"
                    >
                        ›
                    </Link>
                }

                {/* Last Page Button */}
                {(totalPages - currentPage > 2) &&
                    <Link
                        to={getPageLink(totalPages)}
                        onClick={scrollToTop}
                        className="page-button"
                        aria-label="Last page"
                    >
                        »
                    </Link>
                }
            </div>
        </div>
    );
}

export default Pagination;