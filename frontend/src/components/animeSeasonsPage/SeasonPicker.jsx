import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { getSeasonList } from "../../services/animeService";
import DropDownCheckbox from "../../components/DropDownCheckbox";
import "./SeasonPicker.css";

const INITIAL_FILTER_STATE = {
    year: "",
    season: "",
};

function SeasonPicker() {
    const [searchParams] = useSearchParams();
    const [seasonFilters, setSeasonFilters] = useState({ ...INITIAL_FILTER_STATE, ...Object.fromEntries(searchParams.entries()) });
    const navigate = useNavigate();

    const { data: seasonList } = useSuspenseQuery({
        queryKey: ['seasons', 'list'],
        queryFn: getSeasonList,
        staleTime: Infinity,
    });

    const yearOptions = seasonList.map(item => ({
        value: item.year,
        label: item.year
    }));

    const selectedYear = seasonList.find(item => item.year == seasonFilters.year);

    const seasonOptions = selectedYear ? selectedYear
        .seasons.map(season => ({
            value: season,
            label: season.charAt(0).toUpperCase() + season.slice(1)
        }))
        : [];

    const handleQuickSeasonAccess = (type) => {
        setSeasonFilters(INITIAL_FILTER_STATE);
        navigate(`/seasons/${type}`);
    };

    const handleSeasonSubmit = (e) => {
        e.preventDefault();

        const newParams = new URLSearchParams();
        Object.entries(seasonFilters).forEach(([key, value]) => {
            if (value && value.length !== 0) {
                newParams.set(key, value);
            }
        });

        navigate(`/seasons/specific?${newParams.toString()}`);
    };

    const handleSeasonReset = (e) => {
        e.preventDefault();
        setSeasonFilters(INITIAL_FILTER_STATE);
    };

    const isSpecificSearchValid = Boolean(seasonFilters.year && seasonFilters.season);

    return (
        <div className="season-picker-container">
            <form
                onSubmit={handleSeasonSubmit}
                onReset={handleSeasonReset}
                className="season-picker-form"
            >
                {/* Quick Access Group */}
                <div className="quick-access">
                    <button
                        name="current"
                        className={`season-quick-btn ${searchParams.get('type') === 'current' ? 'active' : ''}`}
                        type="button"
                        onClick={() => handleQuickSeasonAccess('current')}
                    >
                        Current Season
                    </button>
                    <button
                        name="upcoming"
                        className={`season-quick-btn ${searchParams.get('type') === 'upcoming' ? 'active' : ''}`}
                        type="button"
                        onClick={() => handleQuickSeasonAccess('upcoming')}
                    >
                        Upcoming
                    </button>
                </div>

                <span className="season-separator" aria-hidden="true"></span>

                {/* Specific Search Group */}
                <div className="specific-search">
                    <DropDownCheckbox
                        filterParamKey="year"
                        options={yearOptions}
                        value={seasonFilters.year}
                        onChange={setSeasonFilters}
                    />

                    <span className="filter-dash" aria-hidden="true">—</span>

                    <DropDownCheckbox
                        filterParamKey={seasonFilters.year ? "season" : "Season"}
                        options={seasonOptions}
                        value={seasonFilters.season}
                        onChange={setSeasonFilters}
                        disabled={!seasonFilters.year}
                    />

                    <div className="season-actions">
                        <button 
                            type="submit" 
                            className="apply-filters-button" 
                            disabled={!isSpecificSearchValid}
                        >
                            Find
                        </button>
                        <button type="reset" className="clear-filters-button">
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SeasonPicker;
