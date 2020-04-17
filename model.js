var apiURL = "https://games-world.herokuapp.com";
//trebuie sa va arat ceva in postman
/*function getGamesList(callbackFunction){
    fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
       // console.log("request response ", response);
        
        return response.json();
    }).then(function(arrayOfGames){
        //console.log('raspuns la request :', arrayOfGames);
        
        callbackFunction(arrayOfGames);
    });
}*/




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




// function deleteGame(gameID, callbackFunction) {
//     fetch(apiURL + "/games/" + gameID, {
//         method: "DELETE"
//     }).then(function(r){
//         return r.text();
//     }).then(function(apiresponse){
//         callbackFunction(apiresponse);
//     });

// }

async function deleteGame(gameID) {
    const response = await fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    })

    const deleteResponse  = response.text();

    return deleteResponse;
}


/*function createGameRequest(gameObject, callbackCreateGame){
    fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    }).then(function(response){
        return response.json();
    }).then(function(createdGame){
       // console.log(createdGame);
        callbackCreateGame(createdGame);
    });
}*/

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


/*function reloadData() {
    fetch(apiURL + "/regenerate-games", {
        method: "GET",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        return response.text();
    })
}*/

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

/*function editGame(id, gameObject1){
    fetch(`${apiURL}/games/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type' : "application/x-www-form-urlencoded"
        },
        body: gameObject1
    }).then(function(response){
        return response.json();
    })
}*/

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