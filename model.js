var apiURL = "https://games-world.herokuapp.com";

async function getGamesList() {
    const response = await fetch(`${apiURL}/games`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    const arrayOfGames = response.json();
    // console.log(' array of games model.json', arrayOfGames);

    return arrayOfGames;
}

async function deleteGame(gameID) {
    const response = await fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    })

    const deleteResponse  = response.text();

    return deleteResponse;
}

async function createGameRequest(gameObject) {
    const response = await fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    });

    const requestGame = response.json();

    return requestGame;
}

async function reloadData() {
    const response = await fetch(apiURL + "/regenerate-games", {
        method: "GET",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded",
            'Connection' : 'keep-alive'
        }
    })
    const dbLoader = response.text();

    console.log('RES:', dbLoader);
    
    return dbLoader;
}

async function editGame(id, gameObject1) {
    const response = await fetch(`${apiURL}/games/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        },
        body: gameObject1
    })

    const gameEditor = response.text();

    return gameEditor;

}