
export const transformFetchPlayers = (players) => {

    return players.map((player) => {

        return {
            playerID: player.idPlayer,
            image: player.strThumb,
            name: player.strPlayer,
            team: player.strTeam,
            position: player.strPosition,
            nationality: player.strNationality
        }

    });

}

export const transformLookUpPlayer = (player) => {

    return {
        id: player.idPlayer,
        dateOfBirth: player.dateBorn,
        placeOfBirth: player.strBirthLocation,
        description: player.strDescriptionEN,
        ethnicity: player.strEthnicity,
        gender: player.strGender,
        height: player.strHeight,
        nationality: player.strNationality,
        name: player.strPlayer,
        position: player.strPosition,
        side: player.strSide,
        sport: player.strSport,
        status: player.strStatus,
        IPLTeam: player.strTeam,
        team: player.strTeam2,
        image: player.strThumb
    };

}

//write transform functions for rest 1 api call functions
