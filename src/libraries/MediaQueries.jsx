import { useEffect, useState } from "react";

export const sizes = {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
};


export const useMediaQuery = (screen, isMinWidth=false) => {

    const query = `(${isMinWidth ? 'min-width' : 'max-width'}: ${sizes[screen]})`;
    const media = window.matchMedia(query).matches;

    return media
    
};