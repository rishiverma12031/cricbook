
export const loadPlayers = () => {
    
    const cached = JSON.parse(localStorage.getItem("players"))

    if(!cached) return null;

    const isStale = Date.now() - cached.cachedAt > 24 * 60 * 60 * 1000;

    return isStale ? null : cached.data;

};

export const savePlayers = (players) => localStorage.setItem("players", JSON.stringify({data: players, cachedAt: Date.now()}));

export const loadModals = () => {
    
    const modals = JSON.parse(localStorage.getItem("modals"));

    return modals ? modals : [];

};

export const saveModals = (modals) => localStorage.setItem("modals", JSON.stringify(modals));

export const loadFav = () => localStorage.getItem("fav") ? JSON.parse(localStorage.getItem("fav")) : [];

export const saveFav = (fav) => localStorage.setItem("fav", JSON.stringify(fav));
