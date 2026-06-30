
import { fetchPlayers, searchPlayer, lookUpPlayer } from "./api.js";
import { transformFetchPlayers, transformSearchPlayer, transformLookUpPlayer } from "./transform.js";
import { loadPlayers, savePlayers, loadModals, saveModals } from "./storage.js";
import { renderPlayers, renderPlayer } from "./render.js";
import { showModal, hideModal } from "./modal.js";
import { debounce } from "./utils.js";

const searchInput = document.querySelector(".search__input");
// const clearSearchBtn = document.querySelector(".search__button--clear");
const searchResult = document.querySelector(".search__result");
const IPLPlayersList = document.querySelector(".IPL-players__list");
const modalCloseBtn = document.querySelector(".modal__close");

let players = loadPlayers();

if(!players) {
    players = transformFetchPlayers(await fetchPlayers());
    savePlayers(players);
}

renderPlayers(players, IPLPlayersList);


searchInput.addEventListener("input", debounce(async event => {

    const player = transformSearchPlayer(await searchPlayer(event.target.value));

    renderPlayer(player, searchResult);

}, 300));


let modals = loadModals();
const modalHandler = async (event) => {

    if(!event.target.classList.contains("card")) return;

    if(!modals.find(modal => modal.id === event.target.dataset.id)) {
    
        const playerDetails = transformLookUpPlayer(await lookUpPlayer(event.target.dataset.id));

        modals = [...modals, playerDetails];
        
        saveModals(modals);

    }

    const modal = modals.find(modal => modal.id === event.target.dataset.id);

    showModal(modal);

};

IPLPlayersList.addEventListener("click", modalHandler);
searchResult.addEventListener("click", modalHandler);

modalCloseBtn.addEventListener("click", () => hideModal());
