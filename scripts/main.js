
import { fetchPlayers, searchPlayer, lookUpPlayer } from "./api.js";
import { transformFetchPlayers, transformSearchPlayer, transformLookUpPlayer } from "./transform.js";
import { loadPlayers, savePlayers, loadModals, saveModals, loadFav, saveFav } from "./storage.js";
import { renderPlayers, renderPlayer, renderSkeletonCards, renderFav, renderError } from "./render.js";
import { showModal, hideModal, showSkeletonModal, hideSkeletonModal, populateModal } from "./modal.js";
import { debounce } from "./utils.js";
import { showSpinner, hideSpinner } from "./spinner.js";
import { filterByPosition, filterByNationality } from "./filter.js";
import { sortPlayers} from "./sort.js";

const searchInput = document.querySelector(".search__input");
const clearSearchBtn = document.querySelector(".search__button--clear");
const searchResult = document.querySelector(".search__result");
const IPLPlayersList = document.querySelector(".IPL-players__list");
const favList = document.querySelector(".fav__list");
const modalCloseBtn = document.querySelector(".modal__close");
const filters = document.querySelector(".filters");
const position = document.querySelector(".position");
const nationality = document.querySelector(".nationality");
const sort = document.querySelector(".sort");

let players = loadPlayers();

if(!players) {
    

    try {    
    
        renderSkeletonCards(IPLPlayersList, 6);

        players = transformFetchPlayers(await fetchPlayers());
    
        savePlayers(players);

        renderPlayers(players, IPLPlayersList);
    
    }

    catch {

        renderError(IPLPlayersList, "Couldn't load players. Please try again.");

    }
                    

}

let fav = loadFav();

if(!fav) renderSkeletonCards(favList, 6);

renderFav(fav, favList);

searchInput.addEventListener("input", debounce(async event => {

    showSpinner();
    
    try {

        const player = transformSearchPlayer(await searchPlayer(event.target.value));

        renderPlayer(player, searchResult);

        if(players.find(element => element.playerID === player.playerID)) return;

        players = [...players, player];

        savePlayers(players);

    }

    catch {

        renderError(searchResult, "Couldn't find player. Please try again.");

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
const clickHandler = async (event) => {

    if(event.target.classList.contains("card__add-fav")) {

        if(fav.find(player => player.playerID === event.target.closest(".card").dataset.id)) return;

        fav = [...fav, players.find(player => player.playerID === event.target.closest(".card").dataset.id)];

        saveFav(fav);

        renderFav(fav, favList);

        return;
        
    }

    if(event.target.classList.contains("card__remove-fav")) {

        fav = fav.filter(player => player.playerID !== event.target.closest(".card").dataset.id);

        saveFav(fav);    

        renderFav(fav, favList);

        return;
        
    }

    if(!event.target.closest(".card")) return;

    showModal();

    showSkeletonModal();

    if(!modals.find(modal => modal.id === event.target.closest(".card").dataset.id)) {
    
        const playerDetails = transformLookUpPlayer(await lookUpPlayer(event.target.closest(".card").dataset.id));

        if(!playerDetails) {
    
            hideSkeletonModal();

            populateModal("Couldn't load player details. Please try again.");

            return;

        }

        else {

        modals = [...modals, playerDetails];
        
        saveModals(modals);

        }

    }

    hideSkeletonModal();

    const modal = modals.find(modal => modal.id === event.target.closest(".card").dataset.id);

    populateModal(modal);

};

IPLPlayersList.addEventListener("click", clickHandler);
searchResult.addEventListener("click", clickHandler);
favList.addEventListener("click", clickHandler);

modalCloseBtn.addEventListener("click", () => hideModal());


let filteredPlayers = players;

filters.addEventListener("change", (event) => {

    if(!(event.target.classList.contains("position") || event.target.classList.contains("nationality"))) return;

    const filteredPlayersByPostion = filterByPosition(players, position.value);

    const filteredPlayersByNationality = filterByNationality(filteredPlayersByPostion, nationality.value);

    filteredPlayers = [...filteredPlayersByNationality];

    renderPlayers(filteredPlayers, IPLPlayersList);

})

sort.addEventListener("click", (event) => {

    if(!event.target.classList.contains("button--primary")) return;

    const sortedPlayers = event.target.classList.contains("sort--ascending") ? sortPlayers(filteredPlayers, "asc") : sortPlayers(filteredPlayers, "desc");

    renderPlayers(sortedPlayers, IPLPlayersList);

})
