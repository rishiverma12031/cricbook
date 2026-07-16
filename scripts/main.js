
import { fetchPlayers, searchPlayer, lookUpPlayer } from "./api.js";
import { transformFetchPlayers, transformSearchPlayer, transformLookUpPlayer } from "./transform.js";
import { loadPlayers, savePlayers, loadModals, saveModals } from "./storage.js";
import { renderPlayers, renderPlayer, renderSkeletonCards } from "./render.js";
import { showModal, hideModal, showSkeletonModal, hideSkeletonModal, populateModal } from "./modal.js";
import { debounce } from "./utils.js";
import { showSpinner, hideSpinner } from "./spinner.js";
import { filterByPosition, filterByNationality } from "./filter.js";
import { sortPlayers} from "./sort.js";

const searchInput = document.querySelector(".search__input");
const clearSearchBtn = document.querySelector(".search__button--clear");
const searchResult = document.querySelector(".search__result");
const IPLPlayersList = document.querySelector(".IPL-players__list");
const modalCloseBtn = document.querySelector(".modal__close");
const filters = document.querySelector(".filters");
const position = document.querySelector(".position");
const nationality = document.querySelector(".nationality");
const sort = document.querySelector(".sort");

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


let filteredPlayers = players;

filters.addEventListener("change", () => {

    if(!(event.target.classList.contains("position") || event.target.classList.contains("nationality"))) return;

    const filteredPlayersByPostion = filterByPosition(players, position.value);

    const filteredPlayersByNationality = filterByNationality(filteredPlayersByPostion, nationality.value);

    filteredPlayers = [...filteredPlayersByNationality];

    renderPlayers(filteredPlayers, IPLPlayersList);

})

sort.addEventListener("click", () => {

    if(!event.target.classList.contains("button--primary")) return;

    const sortedPlayers = event.target.classList.contains("sort--ascending") ? sortPlayers(filteredPlayers, "asc") : sortPlayers(filteredPlayers, "desc");

    renderPlayers(sortedPlayers, IPLPlayersList);

})
