
export const renderPlayers = (players, IPLPlayersList) => {

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

        card.append(image, name, nationality, position, team);
        IPLPlayersList.append(card);        
 
    });

}