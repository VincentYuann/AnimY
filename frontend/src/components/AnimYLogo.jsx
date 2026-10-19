import React from 'react';
import './AnimYLogo.css';

/**
 * AnimY 100% Vector Bold Logo
 * 
 * Precision-crafted vector wordmark:
 * - Solid crisp white (#ffffff) for "Anim" with diamond 'i' dot
 * - Solid Electric Indigo (#6366f1) for the hero Katana-Y
 * - Zero gradients, zero drop-shadow glow halos
 */
export default function AnimYLogo({ 
    size = 32, 
    className = '' 
}) {
    const aspect = 160 / 38;
    return (
        <svg 
            className={`animy-wordmark animy-katana-bold ${className}`}
            height={size}
            width={size * aspect}
            viewBox="0 0 160 38" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            role="img" 
            aria-label="AnimY"
        >
            {/* Solid White Letter A */}
            <path 
                d="M 12 6 L 20 6 L 31 32 L 23 32 L 20.8 26 L 11.2 26 L 9 32 L 1 32 Z M 16 13 L 13.2 21 L 18.8 21 Z" 
                fill="#ffffff"
            />
            
            {/* Solid White Letter n */}
            <path 
                d="M 35 13 L 42.5 13 L 42.5 16.5 C 44.5 14.2 47.5 13 51.5 13 C 57.5 13 60.5 16.8 60.5 22.5 L 60.5 32 L 53 32 L 53 23.5 C 53 20 52 18.5 49.5 18.5 C 46.5 18.5 42.5 21 42.5 25 L 42.5 32 L 35 32 Z" 
                fill="#ffffff"
            />
            
            {/* Solid White Letter i with Solid Diamond Dot */}
            <path 
                d="M 66 13 L 73.5 13 L 73.5 32 L 66 32 Z" 
                fill="#ffffff"
            />
            <polygon 
                className="animy-i-dot"
                points="69.75,3.5 73.75,7.5 69.75,11.5 65.75,7.5" 
                fill="#6366f1"
            />

            {/* Solid White Letter m */}
            <path 
                d="M 78 13 L 85.5 13 L 85.5 16.5 C 87.2 14.2 89.8 13 93 13 C 96 13 98.5 14.5 99.8 16.8 C 101.8 14.2 104.8 13 108.5 13 C 114.5 13 117.5 16.8 117.5 22.5 L 117.5 32 L 110 32 L 110 23.5 C 110 20 109 18.5 106.8 18.5 C 104 18.5 101.5 21 101.5 25 L 101.5 32 L 94 32 L 94 23.5 C 94 20 93 18.5 90.8 18.5 C 88 18.5 85.5 21 85.5 25 L 85.5 32 L 78 32 Z" 
                fill="#ffffff"
            />

            {/* Bold Solid Electric Indigo Hero Y */}
            <path 
                className="animy-hero-y"
                d="M 124 6 L 132 6 L 139 16.5 L 147 4 L 155 4 L 144 18 L 144 32 L 136 27 L 136 18 Z" 
                fill="#6366f1"
            />
        </svg>
    );
}
