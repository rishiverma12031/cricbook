
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
        name: player.strPlayer,
        nationality: player.strNationality,
        dateOfBirth: player.dateBorn,
        placeOfBirth: player.strBirthLocation,
        gender: player.strGender,
        ethnicity: player.strEthnicity,
        height: player.strHeight,
        sport: player.strSport,
        team: player.strTeam2,
        IPLTeam: player.strTeam,
        position: player.strPosition,
        side: player.strSide,
        status: player.strStatus,
        image: player.strThumb,
        description: player.strDescriptionEN
    };

}

//write transform functions for rest 1 api call functions
