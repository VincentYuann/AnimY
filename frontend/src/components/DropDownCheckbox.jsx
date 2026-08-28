import { useState, useRef, useEffect } from "react";
import "./DropDownCheckbox.css";

function DropDownCheckbox({ filterParamKey, options, value, onChange: setFilterObject, multiselect = false, disabled = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownDivRef = useRef(null);

    // Close on click outside or Escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (dropDownDivRef.current && !dropDownDivRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    // Convert value into an array and convert to strings
    const selectedArray = [].concat(value)
        .filter(v => v !== null && v !== undefined && v !== "")
        .map(String);

    const getButtonLabel = () => {
        if (selectedArray.length === 0 || !value) {
            return filterParamKey.charAt(0).toUpperCase() + filterParamKey.slice(1);
        }

        const match = options.find(option => String(option.value) === selectedArray[0]);
        const firstMatchingLabel = match ? match.label : filterParamKey;

        return multiselect && selectedArray.length > 1
            ? `${firstMatchingLabel} (+${selectedArray.length - 1})`
            : firstMatchingLabel;
    };

    const isSelected = selectedArray.length > 0;

    const handleFilterObjectUpdate = (e) => {
        const { name, value: clickedValue, checked } = e.target;
        const stringValue = String(clickedValue);

        if (multiselect) {
            if (checked) {
                setFilterObject(prev => ({ ...prev, [name]: [...selectedArray, stringValue] }));
            } else {
                const newArray = selectedArray.filter(val => String(val) !== stringValue);
                setFilterObject(prev => ({ ...prev, [name]: newArray }));
            }
        } else {
            if (checked) {
                setFilterObject(prev => ({ ...prev, [name]: stringValue }));
            } else {
                setFilterObject(prev => ({ ...prev, [name]: "" }));
            }
        }
    };

    return (
        <div className={`filter-dropdown ${isOpen ? "is-open" : ""} ${isSelected ? "has-selection" : ""}`} ref={dropDownDivRef}>
            <button
                type="button"
                className="filter-dropdown-button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={`Filter by ${filterParamKey}`}
            >
                <span className="dropdown-label">{getButtonLabel()}</span>
                <svg 
                    className={`dropdown-chevron ${isOpen ? "open" : ""}`} 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {isOpen && (
                <div className="filter-dropdown-menu" role="listbox" aria-multiselectable={multiselect}>
                    {options.map((option) => {
                        const checked = selectedArray.includes(String(option.value));
                        return (
                            <label key={option.value} className={`dropdown-menu-item ${checked ? "item-checked" : ""}`}>
                                <input
                                    name={filterParamKey}
                                    value={option.value}
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => {
                                        handleFilterObjectUpdate(e);
                                        if (!multiselect) setIsOpen(false);
                                    }}
                                />
                                <span className="item-label">{option.label}</span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default DropDownCheckbox;