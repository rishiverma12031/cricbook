
export const renderPlayers = (players, container) => {

    container.innerHTML = "";

    players.forEach(player => {

        const card = document.createElement("article");
        card.classList.add("card");
        card.dataset.id = player.playerID;

        const name = document.createElement("p");
        name.textContent = player.name;
        name.classList.add("card__name");

        const nationality = document.createElement("p");
        nationality.textContent = player.nationality;
        nationality.classList.add("card__nationality");
        
        const image = document.createElement("img");
        image.src = player.image;
        image.alt = player.name;
        image.classList.add("card__image");
               
        const position = document.createElement("p");
        position.textContent = player.position;
        position.classList.add("card__position");
        
        const team = document.createElement("p");
        team.textContent = player.team;
        team.classList.add("card__team");

        const addFavBtn = document.createElement("button");
        addFavBtn.textContent = "Add to favorites";
        addFavBtn.classList.add("button--card", "card__add-fav", "button--primary");
        
        const info = document.createElement("div");
        info.classList.add("card__info");

        info.append(name, nationality, position, team, addFavBtn);
        card.append(image, info);
        container.append(card);        
 
    });

};

export const renderPlayer = (player, searchResult) => {

    searchResult.innerHTML = "";

    const card = document.createElement("article");
    card.classList.add("card");
    card.dataset.id = player.playerID;

    const name = document.createElement("p");
    name.textContent = player.name;
    name.classList.add("card__name");

    const nationality = document.createElement("p");
    nationality.textContent = player.nationality;
    nationality.classList.add("card__nationality");
        
    const image = document.createElement("img");
    image.src = player.image;
    image.alt = player.name;
    image.classList.add("card__image");
               
    const position = document.createElement("p");
    position.textContent = player.position;
    position.classList.add("card__position");
        
    const team = document.createElement("p");
    team.textContent = player.team;
    team.classList.add("card__team");

    const addFavBtn = document.createElement("button");
    addFavBtn.textContent = "Add to favorites";
    addFavBtn.classList.add("button--card", "card__add-fav", "button--primary");

    const info = document.createElement("div");
    info.classList.add("card__info");

    info.append(name, nationality, position, team, addFavBtn);
    card.append(image, info);
    searchResult.append(card);

};

export const renderFav = (players, container) => {

    container.innerHTML = "";

    if(!players.length) {

        const message = document.createElement("p");
        message.textContent = "No favourites added yet. When you add some players as favourites, they will appear here.";
        message.classList.add("no-fav-message");
        container.append(message);

        return;

    };

    players.forEach(player => {

        const card = document.createElement("article");
        card.classList.add("card");
        card.dataset.id = player.playerID;

        const name = document.createElement("p");
        name.textContent = player.name;
        name.classList.add("card__name");

        const nationality = document.createElement("p");
        nationality.textContent = player.nationality;
        nationality.classList.add("card__nationality");
        
        const image = document.createElement("img");
        image.src = player.image;
        image.alt = player.name;
        image.classList.add("card__image");
               
        const position = document.createElement("p");
        position.textContent = player.position;
        position.classList.add("card__position");
        
        const team = document.createElement("p");
        team.textContent = player.team;
        team.classList.add("card__team");

        const removeFavBtn = document.createElement("button");
        removeFavBtn.textContent = "Remove from favorites";
        removeFavBtn.classList.add("button--card", "card__remove-fav", "button--primary");

        const info = document.createElement("div");
        info.classList.add("card__info");

        info.append(name, nationality, position, team, removeFavBtn);
        card.append(image, info);
        container.append(card);
 
    });

};


export const renderSkeletonCards = (container, count = 6) => {

    container.innerHTML = "";

    for(let i = 0; i < count; i++) {

        container.insertAdjacentHTML("beforeend", 
            `
            <article class="card card--skeleton">
                <div class="card__image--skeleton"></div>
                <div class="card__name--skeleton"></div>
                <div class="card__nationality--skeleton"></div>
                <div class="card__position--skeleton"></div>
                <div class="card__team--skeleton"></div>
            </article>
            `
        );

    };

};

export const renderError = (container, message) => {
    
    container.innerHTML = "";

    const error = document.createElement("p");
    error.textContent = message;
    
    container.append(error);

};