getGamesList(function(arrayOfGames){
    for(var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
        
    }  
});

function createDomElement(gameObj){
    var container1 = document.querySelector('.container');

    const gameELement = document.createElement("div");
    gameELement.setAttribute('id', gameObj._id)
    gameELement.classList.add('gameList');
    gameELement.innerHTML = `<h1 class = "title">${gameObj.title}</h1> 
                        <p><strong>${gameObj._id}</strong></p>
                        <img class="imageUrl" src="${gameObj.imageUrl}" />
                        <p class="description">${gameObj.description}</p> 
                        <button class="delete-btn">Delete Game</button>
                        <button class="editBtn" >Edit Game</button>`;   
                        
    container1.appendChild(gameELement);
    

    document.getElementById(`${gameObj._id}`).addEventListener("click", function(){
        //console.log(event.target);
        if(event.target.classList.contains('delete-btn')) {
                deleteGame(gameELement.getAttribute("id"), function(apiResponse){
                    console.log('apiResponse ',apiResponse);
                    removeDeletedElementFromDOM(event.target.parentElement);
                    console.log("raspuns: " ,removeDeletedElementFromDOM(event.target.parentElement));
                })
        } else if(event.target.classList.contains('editBtn')) {
                createUpdateForm(event.target.parentElement) 
        }   
    });
}

function createUpdateForm(gameContainer) {
    console.log(gameContainer);
    if(!document.getElementById('updateForm')) {
        const gameTitle = gameContainer.querySelector('h1');
        const gameDescription = gameContainer.querySelector('.description');
        const gameImageURL = gameContainer.querySelector('.imageUrl'); 
      
        var formElement = document.createElement('form');
        formElement.setAttribute('id', 'updateForm')     
        formElement.innerHTML =  ` 
                            <label for="secondGameTitle">Title *</label>
                            <input type="text" value="${gameTitle.innerText}" name="gameTitle" id="secondGameTitle" />
                    
                            <label for="secondGameDescription">Description</label>
                            <textarea name="gameDescription" id="secondGameDescription">${gameDescription.textContent}</textarea>
                    
                            <label for="secondGameImageUrl">Image URL *</label>
                            <input type="text" value="${gameImageURL.src}" name="gameImageUrl" id="secondGameImageUrl_}" />
                    
                            <button class="updateBtn">Save Changes</button>
                            <button class="cancelBtn">Cancel</button>
                        
                            `;
        gameContainer.appendChild(formElement); 
        
        gameContainer.querySelector('.cancelBtn').addEventListener('click', function(){
            removeDeletedElementFromDOM(formElement);
        });

        gameContainer.querySelector('.updateBtn').addEventListener('click', function(){
            const updatedGameTitle = document.getElementById('secondGameTitle');
            const updatedGameDescription = document.getElementById('secondGameDescription');
            const updatedGameImageUrl = document.getElementById('secondGameImageUrl');

            var urlencoded = new URLSearchParams();
            urlencoded.append("title", updatedGameTitle.value);
            urlencoded.append("description", updatedGameDescription.value);
            urlencoded.append("imageUrl", updatedGameImageUrl.value);

            if(updatedGameTitle.value !== "" && updatedGameDescription.value !== "" && updatedGameDescription.value !== "") {
                
                gameContainer.querySelector('h1').innerText = updatedGameTitle.value;
                gameContainer.querySelector('.description').innerText = updatedGameDescription.value;
                gameContainer.querySelector('.imageUrl').src = updatedGameImageUrl.value;
                removeDeletedElementFromDOM(formElement);
            }  
            
            if(updatedGameTitle.value !== gameTitle.value && updatedGameDescription.value !== gameDescription.value && updatedGameImageUrl.value !== gameImageURL.value){
                editGame(gameContainer.id, urlencoded, function(editGameResponse){
                    console.log('Raspuns callback PUT ',editGameResponse);                   
                })
            }
        });
    }
}

function removeDeletedElementFromDOM(domElement){
    domElement.remove();
}

function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}


document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        createGameRequest(urlencoded, createDomElement);
    }
})

/*const reloadDataBase = document.createElement('button');

reloadDataBase.addEventListener('click', function() 
reloadData(function() {
    
    reloadDataBase.setAttribute('class','reloadDB');
    reloadDataBase.innerHTML = "Reload DataBase";
    reloadDataBase.style.width = "200px";
    reloadDataBase.style.padding = "10px";
    reloadDataBase.style.cursor = "pointer";
    reloadDataBase.style.backgroundColor = "aquamarine";
    reloadDataBase.style.color = "black";
    reloadDataBase.style.fontWeight = "bold";
    reloadDataBase.style.border = "none";
    reloadDataBase.style.borderRadius = "5px";

    const formForRegen = document.querySelector(".creationForm");
    formForRegen.appendChild(reloadDataBase);

})*/
    
// reloadDataBase.addEventListener("click", function() {

//     const alertBox = confirm("Do you really want to reload DataBase ?")
//     if (alertBox === true ){
        
        
//     }else {
//         return false;
//     }
// } )



/*.updateForm {
    display: flex;
    flex-direction: column;
}

.updateForm>label,
.updateForm>input,
.updateForm>textarea {
    float: left;
    margin: 5px 10px;
    font-family: Arial, Helvetica, sans-serif;
}

'.updateBtn {
    width: 100px;
    height: 20px;
    background-color: transparent;
    border: 1px solid green;
    color: green;
}

.updateBtn:hover {
    width: 100px;
    height: 20px;
    background-color: green;
    border: 1px solid green;
    color: white;
}

.cancelBtn {
    width: 100px;
    height: 20px;
    background-color: transparent;
    border: 1px solid red;
    color: red;
}

.cancelBtn:hover {
    width: 100px;
    height: 20px;
    background-color: red;
    border: 1px solid red;
    color: white;
} */