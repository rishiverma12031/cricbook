
export const loadPlayers = () => JSON.parse(localStorage.getItem("players"));

export const savePlayers = (players) => localStorage.setItem("players", JSON.stringify(players));

export const loadModals = () => {
    
    const modals = JSON.parse(localStorage.getItem("modals"));

    return modals ? modals : [];

};

export const saveModals = (modals) => localStorage.setItem("modals", JSON.stringify(modals));