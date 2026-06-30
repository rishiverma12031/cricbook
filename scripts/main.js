
import { fetchPlayers, searchPlayer, lookUpPlayer } from "./api.js";
import { transformFetchPlayers, transformLookUpPlayer } from "./transform.js";
import { loadPlayers, savePlayers, loadModals, saveModals } from "./storage.js";
import { renderPlayers } from "./render.js";
import { showModal, hideModal } from "./modal.js";
import { debounce } from "./utils.js";

const searchInput = document.querySelector(".search__input");
// const clearSearchBtn = document.querySelector(".search__button--clear");
// const searchResult = document.querySelector(".search__result");
const IPLPlayersList = document.querySelector(".IPL-players__list");
const modalCloseBtn = document.querySelector(".modal__close");

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

        modals = loadModals();

    }

    const modal = modals.find(modal => modal.id === event.target.dataset.id);

    console.log(modal);
    showModal(modal);

});

modalCloseBtn.addEventListener("click", () => hideModal());

searchInput.addEventListener("input", debounce(async event => {

    const searchResults = await searchPlayer(event.target.value);

    console.log(searchResults);

}, 300))