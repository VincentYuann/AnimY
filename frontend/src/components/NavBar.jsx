import { NavLink, Link, useNavigate, createSearchParams } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { navBarSearchQueryContext } from "../App";
import { useAuth } from "../context/AuthContext";
import "./NavBar.css";

export default function NavBar() {
    const { setNavBarSearchQuery } = useContext(navBarSearchQueryContext);
    const { user } = useAuth();
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    // Global '/' keyboard shortcut to focus search, and 'Escape' to blur
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "/" && document.activeElement !== searchInputRef.current) {
                if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
                    return;
                }
                e.preventDefault();
                searchInputRef.current?.focus();
            } else if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
                searchInputRef.current?.blur();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = text.trim();
        const searchQuery = String(createSearchParams({ q: trimmed }));
        navigate(trimmed ? `/search?${searchQuery}` : `/search`);
        setNavBarSearchQuery(trimmed);
        setText("");
        searchInputRef.current?.blur();
    };

    return (
        <header>
            <nav className="navbar" aria-label="Main Navigation">
                <Link to="/" className="brand" aria-label="AnimY Home">
                    <img 
                        src="/kitsune-logo.png" 
                        alt="AnimY Mascot" 
                        className="brand-logo" 
                        width="44" 
                        height="44" 
                    />
                    <span className="brand-text">
                        Anim<span className="brand-accent">Y</span>
                    </span>
                    <span className="brand-star" aria-hidden="true">★</span>
                </Link>

                <form onSubmit={handleSubmit} className="search-form" role="search">
                    <div className="search-input-wrapper">
                        <svg 
                            className="search-icon" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search anime..."
                            className="search-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            aria-label="Search anime titles"
                        />
                        <kbd className="search-shortcut" title="Press / to search" aria-hidden="true">/</kbd>
                    </div>
                    <button type="submit" className="search-submit-btn" aria-label="Search">
                        Search
                    </button>
                </form>

                <div className="navbar-links">
                    <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                        Home
                    </NavLink>
                    <NavLink to="/seasons/current" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                        Seasons
                    </NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                        Favorites
                    </NavLink>
                    <NavLink 
                        to="/profile" 
                        className={({ isActive }) => `nav-link nav-profile ${isActive ? "active" : ""}`}
                        aria-label="User profile"
                    >
                        <img
                            src={user ? `${user?.user_metadata?.avatar_url}?t=${new Date().getTime()}` || "/profile-placeholder.jpg" : "/profile-placeholder.jpg"}
                            referrerPolicy="no-referrer"
                            alt="Profile Avatar"
                            className="nav-avatar"
                            onError={(e) => { e.currentTarget.src = "/profile-placeholder.jpg"; }}
                        />
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}
