
export const sortPlayers = (players , order) => {

    if(order === "asc") return players.toSorted((a, b) => a.name.localeCompare(b.name));

    if(order === "desc") return players.toSorted((a, b) => b.name.localeCompare(a.name));

}