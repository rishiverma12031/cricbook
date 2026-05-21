
export const fetchPlayers = async (id = 135796) => {

   try {

        const baseURL = "https://www.thesportsdb.com/api/v1/json/123/";

        const endPoint = "lookup_all_players.php?id=";

        const response = await fetch(`${baseURL}${endPoint}${id}`);

        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
        const data = await response.json();

        return data.player;
   
    }

    catch(error) {

        console.error("Unable to fetch data: ", error);

    } 

}

export const searchPlayer = async (player) => {

    try {

        const baseURL = "https://www.thesportsdb.com/api/v1/json/123/";

        const endPoint = "searchplayers.php?p=";

        const response = await fetch(`${baseURL}${endPoint}${encodeURIComponent(player)}`);

        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        return data.player[0];
    
    }

    catch(error) {

        console.error("Unable to fetch data: ", error);

    }

}

export const lookUpPlayer = async (id) => {

    try {

        const baseURL = "https://www.thesportsdb.com/api/v1/json/123/";

        const endPoint = "lookupplayer.php?id=";

        const response = await fetch(`${baseURL}${endPoint}${id}`);

        if(!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        return data.players[0];
    
    }

    catch(error) {

        console.error("Unable to fetch data: ", error);

    }

}
