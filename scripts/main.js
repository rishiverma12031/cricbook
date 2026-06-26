
import { fetchPlayers, searchPlayer, lookUpPlayer } from "./api.js";
import { transformFetchPlayers, transformLookUpPlayer } from "./transform.js";
import { loadPlayers, savePlayers, loadModals, saveModals } from "./storage.js";
import { renderPlayers } from "./render.js";

// const searchInput = document.querySelector(".search__input");
// const clearSearchBtn = document.querySelector(".search__button--clear");
// const searchResult = document.querySelector(".search__result");
const IPLPlayersList = document.querySelector(".IPL-players__list");


let players = loadPlayers();

if(!players) {
    players = transformFetchPlayers(await fetchPlayers());
    savePlayers(players);
}

renderPlayers(players, IPLPlayersList);

let modals = loadModals();

IPLPlayersList.addEventListener("click", async event => {

    if(!event.target.classList.contains("card")) return;

    if(!modals.find(modal => modal.id === event.target.dataset.id)) {
    
        const playerDetails = transformLookUpPlayer(await lookUpPlayer(event.target.dataset.id));

        saveModals([...modals, playerDetails]);

    }


    //call modal render function

    const modal = modals.find(modal => modal.id === event.target.dataset.id);
    
    console.log(modal);

});
