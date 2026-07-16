
export const filterByPosition = (players, position) => {

    if(position === "all") return players;

    return players.filter((player) => player.position === position);

} 

export const filterByNationality = (players, nationality) => {

    if(nationality === "all") return players;

    return players.filter((player) => player.nationality === nationality);

}

