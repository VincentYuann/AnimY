import axios from 'axios';

const jikanAPI = axios.create({
    baseURL: 'https://api.tenrai.org/v1',
});

// Automatically remove empty/null/undefined query parameters before sending requests
jikanAPI.interceptors.request.use((config) => {
    if (config.params) {
        config.params = Object.fromEntries(
            Object.entries(config.params).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
        );
    }
    return config;
});

const jikanService = {
    searchAnimes: async ( filterObject = {} ) => {
        try {
            const res = await jikanAPI.get('/anime', {
                params: { 
                    order_by: 'popularity',
                    sort: 'asc',
                    ...filterObject 
                }
            });
            
            return {
                animes: res.data.data,
                pagination: res.data.pagination
            };
        } catch (error) {
            throw new Error(`API request failed: ${error.response?.status || error.message}`);
        }
    },

    getTopAnimes: async ( limit = 14 ) => {
        try {
            const res = await jikanAPI.get('/top/anime', {
                params: { limit }
            });
            
            return res.data.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response?.status || error.message}`);
        }
    },

    getRandomAnimes: async ( limit = 14 ) => {
        try {
            const RELEVANT_PAGE_LIMIT = 400; 
            const randomPage = Math.floor(Math.random() * RELEVANT_PAGE_LIMIT) + 1; 
            
            const res = await jikanAPI.get('/anime', {
                params: {
                    page: randomPage,
                    sfw: true, // Exclude NSFW content on the home page
                    order_by: 'popularity',
                    sort: 'asc'
                }
            });
            
            const allAnime = res.data.data;

            return allAnime.slice(0, limit);
            
        } catch (error) {
            throw new Error(`API request failed: ${error.response?.status || error.message}`);
        }
    },

    getAnimeGenres: async () => {
        try {
            const res = await jikanAPI.get(`/genres/anime`);
            return res.data.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response?.status || error.message}`);
        }
    },
    
    // --------------------------------New functions to fetch anime seasons ----------------------------------------
    getSeasonList: async () => {
        try {
            const res = await jikanAPI.get('/seasons')
            return res.data.data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response?.status || error.message}`);
        }
    },
    
    getCurrentSeason: async (page) => {
        try {
            const res = await jikanAPI.get(`/seasons/now`, {
                params: { 
                    page: page,
                    sfw: true
                }
            });
            
            return {
                animes: res.data.data,
                pagination: res.data.pagination
            };
        } catch (error) {
            throw new Error(`API request failed: ${error.response?.status || error.message}`);
        }
    },

    getUpcomingSeasons: async (page) => {
        try {
            const res = await jikanAPI.get(`/seasons/upcoming`, {
                params: { 
                    page: page,
                    sfw: true
                }
            });
            
            return {
                animes: res.data.data,
                pagination: res.data.pagination
            };
        } catch (error) {
            throw new Error(`API request failed: ${error.response?.status || error.message}`);
        }
    },

    getSeason: async (year, season, page) => {
        try {
            const res = await jikanAPI.get(`/seasons/${year}/${season}`, {
                params: { 
                    page: page,
                    sfw: true
                }
            });
            
            return {
                animes: res.data.data,
                pagination: res.data.pagination
            };
        } catch (error) {
            throw new Error(`API request failed: ${error.response?.status || error.message}`);
        }
    }
};

export default jikanService;
