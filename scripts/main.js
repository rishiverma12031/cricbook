
import { fetchPlayers, searchPlayer, lookUpPlayer } from "./api.js";
import { transformFetchPlayers, transformSearchPlayer, transformLookUpPlayer } from "./transform.js";
import { loadPlayers, savePlayers, loadModals, saveModals } from "./storage.js";
import { renderPlayers, renderPlayer, renderSkeletonCards } from "./render.js";
import { showModal, hideModal, showSkeletonModal, hideSkeletonModal, populateModal } from "./modal.js";
import { debounce } from "./utils.js";
import { showSpinner, hideSpinner } from "./spinner.js";

const searchInput = document.querySelector(".search__input");
const clearSearchBtn = document.querySelector(".search__button--clear");
const searchResult = document.querySelector(".search__result");
const IPLPlayersList = document.querySelector(".IPL-players__list");
const modalCloseBtn = document.querySelector(".modal__close");

let players = loadPlayers();

if(!players) {
    
    renderSkeletonCards(IPLPlayersList, 6);

    players = transformFetchPlayers(await fetchPlayers());
    
    savePlayers(players);
}

renderPlayers(players, IPLPlayersList);


searchInput.addEventListener("input", debounce(async event => {

    showSpinner();
    
    try {

        const player = transformSearchPlayer(await searchPlayer(event.target.value));

        renderPlayer(player, searchResult);

    }

    finally {

        hideSpinner();

    }

}, 300));

clearSearchBtn.addEventListener("click", () => {
    
    searchInput.value = "";

    searchResult.innerHTML = "";

});


let modals = loadModals();
const modalHandler = async (event) => {

    if(!event.target.classList.contains("card")) return;

    showModal();

    showSkeletonModal();

    if(!modals.find(modal => modal.id === event.target.dataset.id)) {
    
        const playerDetails = transformLookUpPlayer(await lookUpPlayer(event.target.dataset.id));

        modals = [...modals, playerDetails];
        
        saveModals(modals);

    }

    hideSkeletonModal();

    const modal = modals.find(modal => modal.id === event.target.dataset.id);

    populateModal(modal);

};

IPLPlayersList.addEventListener("click", modalHandler);
searchResult.addEventListener("click", modalHandler);

modalCloseBtn.addEventListener("click", () => hideModal());
