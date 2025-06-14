export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    LOGIN: '/auth/login',
    USERS: '/users',
    RESET_PASSWORD: '/users/reset-password',
    TOWNS: '/ai/towns',
    GENERATE_TOWN: '/ai/generate/town',
    GENERATE_NPCS: '/ai/generate/npcs',
    NPCS: '/ai/npcs',
    SHEETS: '/sheets',
    GAMES: '/games',
    BUGS: '/bugs',
    IMPROVES: '/improves',
  },
};
