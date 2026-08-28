import { Link } from "react-router-dom";
import "./EmptyState.css";

export default function EmptyState({ 
    icon = "search", 
    title = "No results found", 
    description = "We couldn't find what you're looking for.", 
    actionText, 
    actionLink, 
    onAction 
}) {
    return (
        <div className="empty-state" role="status">
            <div className={`empty-state-icon-wrapper ${icon === "heart" ? "heart-icon" : ""}`}>
                {icon === "heart" ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                ) : icon === "calendar" ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                )}
            </div>

            <h3 className="empty-state-title">{title}</h3>
            <p className="empty-state-description">{description}</p>

            {actionText && actionLink && (
                <Link to={actionLink} className="empty-state-btn">
                    {actionText}
                </Link>
            )}

            {actionText && !actionLink && onAction && (
                <button type="button" onClick={onAction} className="empty-state-btn">
                    {actionText}
                </button>
            )}
        </div>
    );
}
